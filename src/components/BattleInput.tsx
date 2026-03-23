"use client";

import { useState } from "react";
import { useCombatStore } from "@/store/combatStore";

export default function BattleInput() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { startBattle, is_loading, error } = useCombatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    const contentToSubmit: string = content.trim();
    const titleToSubmit: string = title.trim() || "Untitled Challenge";
    (startBattle as any)(contentToSubmit, titleToSubmit);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div 
        className="rounded-2xl border shadow-lg backdrop-blur"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          animation: "smoothFadeIn 0.6s ease-out"
        }}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            Begin Your Challenge
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "var(--text-muted)" }}>
            Paste your study notes to activate ACRE's adaptive learning engine
          </p>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Title Input */}
            <div className="space-y-2" style={{ animation: "slideInFromLeft 0.5s ease-out" }}>
              <label className="block text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                Challenge Name (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Cellular Biology Fundamentals"
                className="w-full px-4 py-2.5 rounded-xl border text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--surface-alt)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)"
                }}
                disabled={is_loading}
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-2" style={{ animation: "slideInFromLeft 0.6s ease-out" }}>
              <div className="flex justify-between items-baseline">
                <label className="block text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Study Material
                </label>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {content.length} characters
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your notes, transcript, or learning material..."
                className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base resize-none"
                style={{
                  height: "140px",
                  backgroundColor: "var(--surface-alt)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)"
                }}
                disabled={is_loading}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div 
                className="p-3 sm:p-4 rounded-xl border text-sm"
                style={{
                  backgroundColor: "var(--error-soft)",
                  borderColor: "var(--error)",
                  color: "var(--error)",
                  animation: "smoothScale 0.3s ease-out"
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={is_loading || !content.trim()}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm sm:text-base"
              style={{
                backgroundColor: is_loading || !content.trim() ? "var(--text-muted)" : "var(--primary)",
                color: "white",
                cursor: is_loading || !content.trim() ? "not-allowed" : "pointer",
                opacity: is_loading || !content.trim() ? 0.6 : 1,
                animation: is_loading || !content.trim() ? "none" : "smoothScale 0.3s ease-out"
              }}
              onMouseEnter={(e) => {
                if (!is_loading && content.trim()) {
                  e.currentTarget.style.filter = "brightness(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              {is_loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div style={{ animation: "pulseGlow 1.5s ease-in-out infinite" }}>⚡</div>
                  <span>Preparing Challenge...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Start Learning</span>
                </div>
              )}
            </button>
          </form>

          {/* Info Boxes */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div 
              className="p-3 sm:p-4 rounded-xl border text-sm"
              style={{
                backgroundColor: "var(--primary-soft)",
                borderColor: "var(--primary)",
                animation: "slideInFromLeft 0.7s ease-out"
              }}
            >
              <p style={{ color: "var(--primary)", margin: 0 }}>
                <strong>💡 Smart Generation:</strong> AI creates personalized scenarios from your material
              </p>
            </div>
            <div 
              className="p-3 sm:p-4 rounded-xl border text-sm"
              style={{
                backgroundColor: "var(--success-soft)",
                borderColor: "var(--success)",
                animation: "slideInFromRight 0.7s ease-out"
              }}
            >
              <p style={{ color: "var(--success)", margin: 0 }}>
                <strong>🎯 Interactive:</strong> Answer questions to master concepts and build mastery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
