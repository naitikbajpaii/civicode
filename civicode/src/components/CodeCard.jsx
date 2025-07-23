function CodeCard({
  code,
  onClick,
  onRelatedClick,
  isBookmarked,
  onToggleBookmark,
  allCodes,
}) {
  const findRelatedCodes = () => {
    return allCodes
      .filter(
        (other) =>
          other.code !== code.code &&
          (other.category === code.category ||
            other.tags.some((tag) => code.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  const related = allCodes ? findRelatedCodes() : [];

  return (
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 text-white">
      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark(code.code);
        }}
        className="absolute top-3 right-3 text-white hover:text-white text-xl py-1 px-2.5 rounded-full bg-transparent border-cyan-600/40 border-2 hover:border-cyan-300"
        title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
      >
        {isBookmarked ? "★" : "☆"}
      </button>

      {/* Code Info */}
      <div onClick={onClick} className="cursor-pointer">
        <h2 className="text-lg font-semibold">{code.code}</h2>
        <p className="text-sm text-white/80 mt-1">{code.title}</p>
        <div className="mt-3">
          <span className="text-xs bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full">
            {code.category}
          </span>
        </div>
      </div>

      {/* Related Codes */}
      {related.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-white/60 mb-1">Related Codes:</p>
          <div className="flex flex-wrap gap-2">
            {related.map((rel) => (
              <button
                key={rel.code}
                onClick={(e) => {
                  e.stopPropagation();
                  onRelatedClick?.(rel);
                }}
                className="text-xs bg-white/20 hover:bg-white/30 hover:border-cyan-600 text-white px-3 py-1 rounded-full transition border border-white/30 backdrop-blur-sm"
              >
                {rel.code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeCard;
