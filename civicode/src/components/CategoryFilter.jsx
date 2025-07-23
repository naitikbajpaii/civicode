function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-xl border text-sm ${
          selected === null
            ? "bg-cyan-600 text-white hover:border-cyan-600"
            : "bg-white/10 text-cyan-100 border-cyan-700/20 hover:border-cyan-700/80 hover:drop-shadow-lg"
        }`}
      >
        All
      </button>
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-xl text-sm border ${
            selected === cat
              ? "bg-cyan-600 text-white hover:border-cyan-600"
              : "bg-white/10 text-cyan-100 border-cyan-700/20 hover:border-cyan-700/80 hover:drop-shadow-lg"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
