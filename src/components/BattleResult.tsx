"use client";

import { useEffect, useState } from "react";
import { useCombatStore } from "@/store/combatStore";
import { saveHeatmapResults } from "@/utils/localStorage";
import HeatmapGrid from "./HeatmapGrid";
import SaveProgress from "./SaveProgress";
import ShareModal from "./UI/ShareModal";

interface BattleResultProps {
  onReset: () => void;
}

export default function BattleResult({ onReset }: BattleResultProps) {
  const { battle_state } = useCombatStore();
  const [showShareModal, setShowShareModal] = useState(false);

  // Save battle results to local storage
  useEffect(() => {
    if (battle_state) {
      const results = battle_state.battle_log.map(log => log.was_correct ? "correct" : "wrong");
      const masteryScores = battle_state.battle_log.map((log, idx) => {
        if (log.was_correct) return 85 + Math.random() * 15;
        if (log.damage_dealt > 10) return 50 + Math.random() * 16;
        return 20 + Math.random() * 13;
      });
      saveHeatmapResults(results as ("correct" | "wrong" | "close")[], masteryScores.map(s => Math.round(s)));
    }
  }, [battle_state]);

  if (!battle_state) return null;

  const isVictory = battle_state.is_victory;
  const correctAnswers = battle_state.battle_log.filter(
    (log) => log.was_correct
  ).length;
  const totalEncounters = battle_state.boss.encounters.length;
  const accuracy = Math.round((correctAnswers / totalEncounters) * 100);

  // Create 3x3 grid for heatmap
  const gridSize = 9;
  const cellsPerRow = 3;
  const gridCells = Array.from({ length: gridSize }).map((_, idx) => {
    const isCorrect = idx < correctAnswers;
    return { id: idx, isCorrect };
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 space-y-3 sm:space-y-4">
      {/* Result Card */}
      <div
        className="rounded-2xl border-2 p-4 sm:p-5 text-center shadow-lg"
        style={{
          backgroundColor: isVictory ? "var(--success-soft)" : "var(--error-soft)",
          borderColor: isVictory ? "var(--success)" : "var(--error)",
          animation: "popupEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory ? "🏆 VICTORY!" : "💀 DEFEAT"}
        </h1>

        {/* Boss Name */}
        <p className="text-sm sm:text-base mb-3 sm:mb-4" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory ? "You defeated" : "Vanquished by"}{" "}
          <strong>{battle_state.boss.boss_name}</strong>
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-5">
          <div 
            className="p-2 sm:p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.3s ease-out"
            }}
          >
            <p className="text-xs font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Correct
            </p>
            <p className="text-lg sm:text-xl font-bold mt-0.5" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {correctAnswers}/{totalEncounters}
            </p>
          </div>
          <div 
            className="p-2 sm:p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.4s ease-out"
            }}
          >
            <p className="text-xs font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Accuracy
            </p>
            <p className="text-lg sm:text-xl font-bold mt-0.5" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {accuracy}%
            </p>
          </div>
          <div 
            className="p-2 sm:p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.5s ease-out"
            }}
          >
            <p className="text-xs font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Final HP
            </p>
            <p className="text-lg sm:text-xl font-bold mt-0.5" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {battle_state.player_hp}
            </p>
          </div>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm opacity-90" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory
            ? "You've proven your mastery! 🎓"
            : "Learn from this defeat. You'll grow stronger. 💪"}
        </p>
      </div>

      {/* 3x3 Heatmap Grid with Color Gradients */}
      <div 
        className="rounded-2xl border p-3 sm:p-4"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          animation: "popupEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        <HeatmapGrid 
          results={battle_state.battle_log.map(log => log.was_correct ? "correct" : "wrong")}
          masteryScores={battle_state.battle_log.map((log, idx) => {
            // Calculate mastery score based on performance
            if (log.was_correct) return 85 + Math.random() * 15; // 85-100
            if (log.damage_dealt > 10) return 50 + Math.random() * 16; // 50-66 (close/partial)
            return 20 + Math.random() * 13; // 20-33 (wrong)
          })}
          battleLog={battle_state.battle_log}
        />
      </div>

      {/* Battle Summary */}
      <div 
        className="rounded-2xl border p-3 sm:p-4"
        style={{
          backgroundColor: "var(--surface-alt)",
          borderColor: "var(--border)",
          maxHeight: "120px",
          overflowY: "auto",
          animation: "popupEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        <p className="font-bold mb-2 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
          Battle Summary
        </p>
        <div className="space-y-0.5 text-xs">
          {battle_state.battle_log.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center p-1 rounded text-xs" 
              style={{
                backgroundColor: log.was_correct ? "var(--success-soft)" : "var(--error-soft)",
                color: log.was_correct ? "var(--success)" : "var(--error)"
              }}
            >
              <span>
                <strong>Q{idx + 1}:</strong> {log.was_correct ? "✅" : "❌"}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
                +{log.damage_dealt} dmg | -{log.damage_taken} hp
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setShowShareModal(true)}
          className="px-4 sm:px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm"
          style={{
            backgroundColor: isVictory ? "var(--success)" : "var(--primary)",
            color: "white",
            animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          {isVictory ? "🎉 Share Results" : "📤 Share"}
        </button>
        <button
          onClick={onReset}
          className="px-4 sm:px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm"
          style={{
            backgroundColor: "var(--text-muted)",
            color: "white",
            animation: "popupEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          {isVictory ? "⚔️ Next Battle" : "⚔️ Again"}
        </button>
      </div>

      {/* Save Progress & Sign In */}
      <SaveProgress playerScore={correctAnswers} totalQuestions={totalEncounters} canSave={true} />

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)}
      />

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div 
          className="p-2 sm:p-3 rounded-xl border"
          style={{
            backgroundColor: "var(--primary-soft)",
            borderColor: "var(--primary)",
            animation: "slideInFromLeft 0.6s ease-out"
          }}
        >
          <p className="text-xs" style={{ color: "var(--primary)", margin: 0 }}>
            <strong>💡 Pro:</strong> Incorrect answers show gaps. Review them.
          </p>
        </div>
        <div 
          className="p-2 sm:p-3 rounded-xl border"
          style={{
            backgroundColor: "var(--secondary-soft)",
            borderColor: "var(--secondary)",
            animation: "slideInFromRight 0.6s ease-out"
          }}
        >
          <p className="text-xs" style={{ color: "var(--secondary)", margin: 0 }}>
            <strong>🎯 Next:</strong> Try new challenges to build mastery.
          </p>
        </div>
      </div>
    </div>
  );
}
