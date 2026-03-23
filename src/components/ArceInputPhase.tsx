"use client";

import { useState } from "react";
import { useArceStore } from "@/store/arceStore";
import LoadingScreen from "./LoadingScreen";

export default function InputPhase() {
  const { showLogo, startGame, isLoading } = useArceStore();
  const [sourceContent, setSourceContent] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (sourceContent.trim().length < 100) {
      setError("Please provide at least 100 characters of study material.");
      return;
    }

    await startGame({ text: sourceContent }, sourceTitle || "Learning Session");
  };

  return (
    <>
      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen phase="extracting" progress={Math.random() * 70 + 30} />
      )}

      <div className="min-h-screen bg-gradient-subtle flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 relative overflow-x-hidden">
        {/* Animated background elements - hidden on mobile */}
        <div className="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
        <div className="hidden sm:block absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow animation-delay-2000 pointer-events-none"></div>
        
        {/* Logo - only at start */}
        {showLogo && (
          <div className="mb-8 sm:mb-12 text-center animate-fadeIn max-w-3xl relative z-10 px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-3 md:mb-4 tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-float">
              ARCÉ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-1 sm:mb-2 md:mb-3 animate-slideDown">
              The Iteration Engine
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-snug sm:leading-relaxed px-1 animate-slideUp break-words">
              Convert passive learning into mastery through crisis scenarios
            </p>
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-lg border-1.5 border-blue-200 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-7 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 sm:space-y-4 md:space-y-5 relative z-10 animate-scaleIn"
        >
          <div className="space-y-2 sm:space-y-3 animate-slideUp">
            <label className="block text-xs sm:text-sm md:text-base font-bold text-blue-900 text-center">
              Study Material
            </label>
            <p className="text-center text-xs text-slate-600 font-medium leading-tight">
              Paste your notes, lecture transcript, or learning material
            </p>
            <textarea
              value={sourceContent}
              onChange={(e) => setSourceContent(e.target.value)}
              placeholder="Enter your study material... (min 100 chars)"
              className="w-full p-2 sm:p-3 md:p-4 border-1.5 border-blue-200 rounded-lg sm:rounded-2xl font-medium text-slate-800 bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-blue-50 transition-all duration-250 placeholder-slate-400 text-xs sm:text-sm break-words overflow-hidden"
              disabled={isLoading}
              style={{ minHeight: "100px", maxHeight: "150px" }}
            />
            <div className="text-center text-xs font-semibold text-blue-700">
              {sourceContent.length} / 100 minimum
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <label className="block text-xs sm:text-sm md:text-base font-bold text-blue-900 text-center">
              Title (Optional)
            </label>
            <input
              type="text"
              value={sourceTitle}
              onChange={(e) => setSourceTitle(e.target.value)}
              placeholder="e.g., Biology Chapter 3"
              className="w-full p-2 sm:p-3 md:p-4 border-1.5 border-blue-200 rounded-lg sm:rounded-2xl text-slate-800 bg-blue-50/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-blue-50 transition-all duration-250 placeholder-slate-400 text-center font-medium text-xs sm:text-sm truncate"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-red-50 to-orange-50 border-1.5 border-red-300 rounded-lg sm:rounded-2xl text-red-700 font-bold text-center text-xs sm:text-sm animate-slideDown">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full button-primary py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-bold rounded-lg sm:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg active:scale-95 animate-bounceGentle"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Extracting...
              </span>
            ) : (
              "Begin Crisis Scenario"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-center text-slate-600 max-w-2xl px-3 relative z-10 animate-slideUp">
          <p className="font-medium text-xs sm:text-sm leading-snug break-words">
            Tip: The more detailed your material, the richer your experience.
          </p>
        </div>
      </div>
    </>
  );
}
