"use client";

import { useArceStore } from "@/store/arceStore";
import ArceInputPhase from "@/components/ArceInputPhase";
import CrisisModal from "@/components/CrisisModal";
import MasteryCanvas from "@/components/MasteryCanvas";
import ResultsPhase from "@/components/ResultsPhase";

export default function Home() {
  const { gameSession, currentPhase, currentScenario, resetGame, testMode, toggleTestMode } =
    useArceStore();

  return (
    <div className="min-h-screen-gradient bg-gradient-blue-white flex flex-col items-center justify-center transition-all duration-300 overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed top-40 left-10 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float pointer-events-none"></div>
      <div className="fixed bottom-40 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float-slow animation-delay-2000 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/3 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 pointer-events-none"></div>
      
      {/* Test Mode Toggle - Top Right Corner */}
      <button
        onClick={toggleTestMode}
        className={`fixed top-4 right-4 z-50 px-3 sm:px-4 py-2 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 ${
          testMode
            ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 animate-pulse-glow"
            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
        }`}
      >
        {testMode ? "TEST ON" : "TEST OFF"}
      </button>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Input Phase: Logo + Textarea */}
        {currentPhase === "input" && <ArceInputPhase />}

        {/* Playing Phase: Crisis Modal + Defense */}
        {currentPhase === "playing" && currentScenario && gameSession && (
          <CrisisModal scenario={currentScenario} />
        )}

        {/* Results Phase: Mastery Cards + Stats */}
        {currentPhase === "results" && gameSession && (
          <ResultsPhase session={gameSession} onNewGame={resetGame} />
        )}
      </div>
    </div>
  );
}
