function SearchBar({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleClick = () => {
    onSearch(value);
  };

  return (
    <div className="flex items-center justify-around px-2 py-2 bg-white/20 backdrop-blur-lg shadow-xl rounded-full max-w-2xl w-full mx-auto">
        <input
            type="text"
            placeholder="Search IS Code, title, or ask a question..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow mr-2 bg-white/10 text-white text-sm placeholder-white px-4 py-3 rounded-full shadow-md backdrop-blur-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:shadow-xl"
        />
      <button
        onClick={handleClick}
        className="px-3 py-3 bg-cyan-600/80 border-2 text-white rounded-full shadow-md hover:bg-cyan-900 hover:border-cyan-900 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
