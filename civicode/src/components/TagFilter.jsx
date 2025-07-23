function TagFilter({ tags, selectedTags, onToggleTag }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, i) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={i}
            onClick={() => onToggleTag(tag)}
            className={`px-3 py-1 text-xs rounded-full border ${
              isSelected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            }`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}

export default TagFilter;
