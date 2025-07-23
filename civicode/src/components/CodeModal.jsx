import React, { useState, useEffect } from "react";
import { generateSummary } from "../hooks/useGemini";
import { marked } from "marked";

function CodeModal({ code, onClose }) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAiSummary("");
    setLoading(false);
  }, [code]);

  if (!code) return null;

  const handleAISummary = async () => {
    setLoading(true);
    const prompt = `Summarize the purpose and practical relevance of this Indian Standard code in simple terms:\n\nTitle: ${code.title}\n\nSummary: ${code.summary}`;
    const result = await generateSummary(prompt);
    setAiSummary(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-[70vw] max-h-[90vh] bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 overflow-y-auto relative text-white">
        {/*Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/80 hover:text-white text-2xl px-3 py-1 rounded-full bg-black/20 hover:shadow-md hover:border-cyan-700 transition"
          title="Close"
        >
          ×
        </button>

        {/* 🧾 Code Info */}
        <h2 className="text-2xl font-bold text-cyan-300 mb-2">{code.code}</h2>
        <p className="text-lg text-cyan-100 mb-4">{code.title}</p>
        <p className="text-sm text-white/90 mb-6 whitespace-pre-wrap">{code.summary}</p>

        {/* 🏷️ Tags and Category */}
        <div className="mb-6">
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-lg mr-2">
            {code.category}
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {code.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <a
            href={code.link}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-2 rounded-lg inline-block mt-5 text-cyan-200 hover:bg-white/20 text-sm hover:text-cyan-300 transition"
          >
            📄 View Full Code
          </a>
        </div>

        {/* 🔍 AI Summary */}
        <button
          onClick={handleAISummary}
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 hover:border-cyan-700 text-white rounded-xl transition text-sm hover:bg-transparent hover:text-cyan-500 hover:shadow-md"
        >
          {loading ? "Generating..." : "Generate AI Summary"}
        </button>

        {aiSummary && (
          <div className="mt-6 bg-white/20 text-white/90 p-4 rounded-xl text-sm shadow-inner">
            <div
                        className="text-white/90 text-sm leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: marked.parse(aiSummary) }}
                      />
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeModal;
