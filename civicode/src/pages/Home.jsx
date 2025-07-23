import { useState, useEffect } from "react";
import iscodes from "../data/iscodes.json";
import { searchISCode } from "../hooks/useGeminiSearch";
import SearchBar from "../components/SearchBar";
import CodeCard from "../components/CodeCard";
import CodeModal from "../components/CodeModal";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  const [aiMessage, setAiMessage] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [featuredCodes, setFeaturedCodes] = useState([]);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...iscodes].sort(() => 0.5 - Math.random());
    setFeaturedCodes(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setLocalResults([]);
      return;
    }

    const search = query.toLowerCase();
    const matches = iscodes.filter((code) => {
      return (
        code.code.toLowerCase().includes(search) ||
        code.title.toLowerCase().includes(search) ||
        code.summary.toLowerCase().includes(search) ||
        code.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    });

    setLocalResults(matches);
  }, [query]);

  const handleSearch = async (input) => {
    setQuery(input);
    setAiResults([]);
    setAiMessage("");
    const element = document.getElementById("nosearch");
    if (element) {
      element.style.display = "none";
    }

    if (input.length < 4) return;

    setLoadingAI(true);
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
      setAiMessage("Sorry, I couldn’t find anything relevant.");
    }
    setLoadingAI(false);
  };

  const handleClear = () => {
    setQuery("");
    setLocalResults([]);
    setAiResults([]);
    setAiMessage("");
  };

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarkedCodes");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (codeId) => {
    setBookmarks((prev) => {
      const updated = prev.includes(codeId)
        ? prev.filter((id) => id !== codeId)
        : [...prev, codeId];
      localStorage.setItem("bookmarkedCodes", JSON.stringify(updated));
      return updated;
    });
  };

  const resultCodes = localResults.length > 0 ? localResults : aiResults;
  const hasResults = query.length > 0 || aiMessage || aiResults.length > 0;

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-xl px-6 lg:px-24">
        <section className="mt-40 flex flex-col justify-center items-center text-center px-4 bg-transparent">
          <h1 className="text-5xl sm:text-7xl font-bold text-white-800 mb-4">CiviCode</h1>
          <p className="text-lg text-gray-200 max-w-xl mb-8">
            Your smart IS Code Explorer powered by AI. Search, bookmark, and understand IS Codes quickly.
          </p>
          <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
          {hasResults && (
            <div className="mt-4">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-cyan-800 text-gray-100 rounded-full hover:bg-gray-400 text-sm hover:text-gray-100 hover:border-cyan-800 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        <section className="py-12 min-h-[60vh] w-full">
          {hasResults ? (
            <>
              {loadingAI && (
                <p className="text-center text-gray-500">Searching...</p>
              )}
              {aiMessage && (
                <div className="mt-4 py-5 px-5 text-white bg-cyan-800 border border-cyan-800 p-3 rounded-3xl max-w-4xl mx-auto">
                  <div
                    className="text-white/90 text-sm leading-relaxed space-y-2"
                    dangerouslySetInnerHTML={{ __html: marked.parse(aiMessage) }}
                  />
                </div>
              )}
              <div className="mt-6 min-h-[30vh] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resultCodes.length > 0 ? (
                  resultCodes.map((code, idx) => (
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
                  <div id="nosearch" className="col-span-full flex justify-center items-center h-40 text-gray-400 text-center">
                    <p className="text-md">No relevant IS Codes found.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl font-semibold text-white-200 mb-4 text-center">Featured IS Codes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {featuredCodes.map((code, idx) => (
                  <CodeCard
                    key={idx}
                    code={code}
                    isBookmarked={bookmarks.includes(code.code)}
                    onToggleBookmark={toggleBookmark}
                    onClick={() => setSelected(code)}
                    onRelatedClick={(relatedCode) => setSelected(relatedCode)}
                    allCodes={iscodes}
                  />
                ))}
              </div>
              <div className="text-center mb-12">
                <button
                  onClick={() => navigate("/codes")}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 text-white hover:border-cyan-500"
                >
                  View All IS Codes
                </button>
              </div>
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="min-h-[60vh] bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-white/30"
              >
                <h2 className="text-2xl font-bold text-cyan-100/80 mb-4">About this Tool</h2>
                <p className="text-gray-100 text-md leading-relaxed">
                  CiviCode is a smart IS Code Explorer for civil engineers, helping you quickly discover, bookmark, and search Indian Standards using natural language.
                </p>
              </motion.section>
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="min-h-[60vh] bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/30"
              >
                <h2 className="text-2xl font-bold text-cyan-100/80 mb-4">What is an IS Code?</h2>
                <p className="text-gray-100 text-md leading-relaxed">
                  IS Codes are official documents published by BIS, providing technical standards for engineering, safety, and construction practices in India.
                </p>
              </motion.section>
              <footer className="mt-20 text-center text-gray-500 text-sm">
                © 2025 CiviCode | Built with ReactJS by Naitik
              </footer>
            </motion.div>
          )}
        </section>

        <CodeModal code={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}

export default Home;
