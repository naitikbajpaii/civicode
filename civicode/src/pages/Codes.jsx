import { useState, useEffect } from "react";
import iscodes from "../data/iscodes.json";
import CodeCard from "../components/CodeCard";
import CodeModal from "../components/CodeModal";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import TagFilter from "../components/TagFilter";
import { searchISCode } from "../hooks/useGeminiSearch";
import { marked } from "marked";

function Codes() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [aiResults, setAiResults] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarkedCodes");
    return saved ? JSON.parse(saved) : [];
  });

  const categories = [...new Set(iscodes.map((c) => c.category))];
  const allTags = Array.from(new Set(iscodes.flatMap((code) => code.tags)));

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleBookmark = (codeId) => {
    setBookmarks((prev) => {
      const updated = prev.includes(codeId)
        ? prev.filter((id) => id !== codeId)
        : [...prev, codeId];
      localStorage.setItem("bookmarkedCodes", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = async (input) => {
    setQuery(input);
    setLoadingAI(true);
    setAiMessage("");
    try {
      const ai = await searchISCode(input, iscodes);
      const matched = ai.results
        .map((match) => {
          const full = iscodes.find((c) => c.code === match.code);
          return full ? { ...full, ...match } : null;
        })
        .filter(Boolean);
      setAiResults(matched);
      setAiMessage(ai.responseText || "");
    } catch (err) {
      console.error("AI Search error:", err);
      setAiResults([]);
      setAiMessage("Sorry, I couldn’t find anything relevant.");
    }
    setLoadingAI(false);
  };

  let filteredCodes = aiResults.length > 0
    ? aiResults
    : iscodes.filter((code) => {
        const search = query.toLowerCase();
        const matchesSearch =
          code.code.toLowerCase().includes(search) ||
          code.title.toLowerCase().includes(search) ||
          code.summary.toLowerCase().includes(search) ||
          code.tags.some((tag) => tag.toLowerCase().includes(search));
        const matchesCategory = category ? code.category === category : true;
        const matchesTags =
          selectedTags.length === 0
            ? true
            : code.tags.some((tag) => selectedTags.includes(tag));
        return matchesSearch && matchesCategory && matchesTags;
      });

  if (showBookmarksOnly) {
    filteredCodes = filteredCodes.filter((code) =>
      bookmarks.includes(code.code)
    );
  }

  return (
    <div className="mt-40 mx-auto flex flex-col justify-center items-center px-6 lg:px-24">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow mb-4">IS Codes Library</h1>
        <p className="text-lg text-cyan-100 max-w-2xl mx-auto">Browse, explore and discover relevant Indian Standard codes in civil engineering.</p>
      </div>

      {/* Search */}
      <div className="mt-6 mb-6 w-full max-w-screen-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        {isSearchFocused && <SuggestionChips onClick={handleSearch} />}
      </div>

      {/* Clear Button */}
      {(query || aiMessage) && (
        <div className="text-right mb-4">
          <button
            onClick={() => {
              setQuery("");
              setAiMessage("");
              setAiResults([]);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-4 py-2 bg-cyan-800 text-gray-100 rounded-full hover:bg-gray-400 text-sm hover:text-gray-100 hover:border-cyan-800 transition"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center ">
        <div className="bg-transparent px-3 py-3">
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>
        {/* Bookmarks Toggle */}
      <div className="text-right">
        <button
          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
          className="px-3 py-2 rounded-full text-xs bg-cyan-700 text-white shadow hover:bg-cyan-800 hover:border-cyan-600"
        >
          {showBookmarksOnly ? "Show All Codes" : "Show Bookmarked Codes"}
        </button>
      </div>
        <div className="bg-cyan-100/20 hidden backdrop-blur p-3 rounded-xl shadow border border-cyan-300 flex-1">
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
        </div>
      </div>

      

      {/* AI Response */}
      {aiMessage && (
        <div className="mt-4 text-blue-900 bg-blue-50 border border-blue-200 p-3 rounded mb-4">
          <div
            className="text-white/90 text-sm leading-relaxed space-y-2"
            dangerouslySetInnerHTML={{ __html: marked.parse(aiMessage) }}
          />
        </div>
      )}

      {/* Code Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {loadingAI ? (
          <p className="text-gray-500 col-span-full text-center">Searching...</p>
        ) : filteredCodes.length > 0 ? (
          filteredCodes.map((code, idx) => (
            <CodeCard
              key={idx}
              code={code}
              isBookmarked={bookmarks.includes(code.code)}
              onToggleBookmark={toggleBookmark}
              onClick={() => setSelected(code)}
              onRelatedClick={(relatedCode) => setSelected(relatedCode)}
              allCodes={iscodes}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No relevant IS Code found.</p>
        )}
      </div>

      {/* Code Modal + Chat */}
      <CodeModal code={selected} onClose={() => setSelected(null)} />

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        © 2025 CiviCode | Built with ReactJS by Naitik
      </footer>
    </div>
  );
}

export default Codes;
