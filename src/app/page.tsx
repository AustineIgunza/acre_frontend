"use client";

import { useEffect } from "react";
import { useCombatStore } from "@/store/combatStore";
import BattleInput from "@/components/BattleInput";
import BattleArena from "@/components/BattleArena";
import BattleResult from "@/components/BattleResult";
import GameModeToggle from "@/components/GameModeToggle";

export default function Home() {
  const { battle_state, resetBattle } = useCombatStore();
  const is_battle_active = !!(battle_state && !battle_state.is_victory && !battle_state.is_defeat);

  // Reset on unmount
  useEffect(() => {
    return () => {
      // Optionally persist state to localStorage on unmount
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {/* Subtle animated background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--primary)",
            opacity: 0.1,
            animation: "floatUp 6s ease-in-out infinite"
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{
            backgroundColor: "var(--secondary)",
            opacity: 0.1,
            animation: "floatUp 8s ease-in-out infinite 1s"
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 max-h-screen overflow-y-auto">
        {/* Mode Toggle */}
        <GameModeToggle />

        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center" style={{ animation: "smoothFadeIn 0.8s ease-out" }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight" style={{ color: "var(--foreground)" }}>
            ACRE
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Transform your learning with interactive mastery challenges
          </p>
        </div>

        {/* Main Content */}
        <div style={{ animation: "smoothScale 0.6s ease-out" }}>
          {!battle_state ? (
            <BattleInput />
          ) : is_battle_active ? (
            <BattleArena />
          ) : (
            <BattleResult onReset={resetBattle} />
          )}
        </div>
      </div>
    </div>
  );
}
