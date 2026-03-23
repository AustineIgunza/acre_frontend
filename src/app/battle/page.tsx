"use client";

import { useEffect, useState } from "react";
import { useCombatStore } from "@/store/combatStore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MultimodalInput from "@/components/MultimodalInput";
import BattleArena from "@/components/BattleArena";

export default function BattlePage() {
  const { battle_state, startBattle, resetBattle, is_loading, error: battleError } = useCombatStore();
  const router = useRouter();

  // Optional: Add auth check later when backend is ready
  // For now, users can access directly

  const handleStartBattle = async (payload: { text?: string; url?: string; file?: File }, title: string) => {
    await startBattle(payload, title);
  };

  const handleReset = () => {
    resetBattle();
  };

  return (
    <div style={{ backgroundColor: "var(--p-surface)", minHeight: "100vh", color: "var(--t-mid)" }}>
      <Navbar />

      <main role="main" style={{ padding: "48px 24px 80px", maxWidth: "800px", margin: "0 auto" }}>
        
        {!battle_state ? (
          <>
            {/* Pre-Battle Setup */}
            <div style={{ marginBottom: "40px", animation: "slideUp 0.4s ease-out" }}>
              <span className="eyebrow" style={{ marginBottom: "12px", display: "inline-block" }}>
                BATTLE ARENA
              </span>
              <h1 style={{ fontSize: "36px", letterSpacing: "-1px", color: "var(--t-primary)", marginBottom: "8px" }}>
                Boss Battle Mode
              </h1>
              <p style={{ fontSize: "17px", color: "var(--t-secondary)" }}>
                Confront a boss that tests your knowledge in an intense multi-round encounter.
              </p>
            </div>

            <div style={{ width: "100%" }}>
              <MultimodalInput onSubmit={handleStartBattle} isLoading={is_loading} buttonText="⚔️ Enter Battle Arena" />
              {battleError && (
                <div style={{ marginTop: "16px", padding: "16px", borderRadius: "8px", backgroundColor: "var(--error-bg)", color: "var(--error)", fontSize: "14px", fontWeight: 600, textAlign: "center" }}>
                  {battleError}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Active Battle */}
            <div style={{ marginBottom: "24px", animation: "slideUp 0.4s ease-out" }}>
              <span className="eyebrow" style={{ marginBottom: "8px", display: "inline-block" }}>
                BATTLE IN PROGRESS
              </span>
            </div>
            
            <BattleArena />

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button onClick={handleReset} className="btn-ghost">
                ← Exit Battle
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
