"use client";

import { useCombatStore } from "@/store/combatStore";

interface BattleResultProps {
  onReset: () => void;
}

export default function BattleResult({ onReset }: BattleResultProps) {
  const { battle_state } = useCombatStore();

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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Result Card */}
      <div
        className="rounded-2xl border-2 p-6 sm:p-8 text-center shadow-lg"
        style={{
          backgroundColor: isVictory ? "var(--success-soft)" : "var(--error-soft)",
          borderColor: isVictory ? "var(--success)" : "var(--error)",
          animation: "smoothScale 0.6s ease-out"
        }}
      >
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory ? "🏆 VICTORY!" : "💀 DEFEAT"}
        </h1>

        {/* Boss Name */}
        <p className="text-lg sm:text-2xl mb-4 sm:mb-6" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory ? "You defeated" : "Vanquished by"}{" "}
          <strong>{battle_state.boss.boss_name}</strong>
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div 
            className="p-3 sm:p-4 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.4s ease-out"
            }}
          >
            <p className="text-xs sm:text-sm font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Correct
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {correctAnswers}/{totalEncounters}
            </p>
          </div>
          <div 
            className="p-3 sm:p-4 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.5s ease-out"
            }}
          >
            <p className="text-xs sm:text-sm font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Accuracy
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {accuracy}%
            </p>
          </div>
          <div 
            className="p-3 sm:p-4 rounded-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: "slideInFromLeft 0.6s ease-out"
            }}
          >
            <p className="text-xs sm:text-sm font-semibold" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              Final HP
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
              {battle_state.player_hp}
            </p>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm sm:text-base opacity-90" style={{ color: isVictory ? "var(--success)" : "var(--error)" }}>
          {isVictory
            ? "You've proven your mastery! 🎓"
            : "Learn from this defeat. You'll grow stronger. 💪"}
        </p>
      </div>

      {/* 3x3 Heatmap Grid */}
      <div 
        className="rounded-2xl border p-6 sm:p-8"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          animation: "smoothFadeIn 0.7s ease-out"
        }}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: "var(--text-secondary)" }}>
          Performance Heatmap
        </h2>
        
        <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${cellsPerRow}, 1fr)` }}>
          {gridCells.map((cell) => (
            <div
              key={cell.id}
              className="aspect-square rounded-lg border-2 flex items-center justify-center font-bold text-lg sm:text-xl transition-all cursor-default"
              style={{
                backgroundColor: cell.isCorrect ? "var(--success-soft)" : "var(--error-soft)",
                borderColor: cell.isCorrect ? "var(--success)" : "var(--error)",
                color: cell.isCorrect ? "var(--success)" : "var(--error)",
                animation: `smoothScale ${0.3 + cell.id * 0.05}s ease-out`,
                transform: "translateZ(0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {cell.isCorrect ? "✓" : "✕"}
            </div>
          ))}
        </div>
      </div>

      {/* Battle Summary */}
      <div 
        className="rounded-2xl border p-4 sm:p-6"
        style={{
          backgroundColor: "var(--surface-alt)",
          borderColor: "var(--border)",
          maxHeight: "200px",
          overflowY: "auto",
          animation: "smoothFadeIn 0.8s ease-out"
        }}
      >
        <p className="font-bold mb-3 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
          Battle Summary
        </p>
        <div className="space-y-1 text-xs sm:text-sm">
          {battle_state.battle_log.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded" 
              style={{
                backgroundColor: log.was_correct ? "var(--success-soft)" : "var(--error-soft)",
                color: log.was_correct ? "var(--success)" : "var(--error)"
              }}
            >
              <span>
                <strong>Q{idx + 1}:</strong> {log.was_correct ? "✅ Correct" : "❌ Wrong"}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                +{log.damage_dealt} dmg | -{log.damage_taken} hp
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onReset}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
          style={{
            backgroundColor: isVictory ? "var(--success)" : "var(--primary)",
            color: "white",
            animation: "smoothScale 0.5s ease-out"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          {isVictory ? "🎉 Share Victory" : "⚔️ Try Again"}
        </button>
        <button
          onClick={onReset}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
          style={{
            backgroundColor: "var(--text-muted)",
            color: "white",
            animation: "smoothScale 0.6s ease-out"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          ← New Challenge
        </button>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div 
          className="p-4 rounded-xl border"
          style={{
            backgroundColor: "var(--primary-soft)",
            borderColor: "var(--primary)",
            animation: "slideInFromLeft 0.8s ease-out"
          }}
        >
          <p className="text-xs sm:text-sm" style={{ color: "var(--primary)", margin: 0 }}>
            <strong>💡 Pro Tip:</strong> Incorrect answers show gaps in understanding. Review those concepts.
          </p>
        </div>
        <div 
          className="p-4 rounded-xl border"
          style={{
            backgroundColor: "var(--secondary-soft)",
            borderColor: "var(--secondary)",
            animation: "slideInFromRight 0.8s ease-out"
          }}
        >
          <p className="text-xs sm:text-sm" style={{ color: "var(--secondary)", margin: 0 }}>
            <strong>🎯 Next Step:</strong> Try a new challenge to build mastery across topics.
          </p>
        </div>
      </div>
    </div>
  );
}
