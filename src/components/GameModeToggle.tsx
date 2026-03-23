"use client";

import { useCombatStore } from "@/store/combatStore";

export default function GameModeToggle() {
  const { game_mode, setGameMode, resetBattle } = useCombatStore();

  const handleModeChange = (mode: "test" | "live") => {
    if (game_mode !== mode) {
      setGameMode(mode);
      resetBattle();
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
      padding: "12px",
      backgroundColor: "var(--surface)",
      borderRadius: "8px",
      borderLeft: "4px solid var(--primary)",
    }}>
      <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-muted)", marginRight: "8px" }}>
        Mode:
      </div>
      <button
        onClick={() => handleModeChange("test")}
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          border: game_mode === "test" ? "2px solid var(--primary)" : "1px solid var(--border)",
          backgroundColor: game_mode === "test" ? "var(--primary-soft)" : "transparent",
          color: game_mode === "test" ? "var(--primary)" : "var(--text-muted)",
          fontWeight: "600",
          fontSize: "13px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        🧪 Test Mode
      </button>
      <button
        onClick={() => handleModeChange("live")}
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          border: game_mode === "live" ? "2px solid var(--secondary)" : "1px solid var(--border)",
          backgroundColor: game_mode === "live" ? "var(--secondary-soft)" : "transparent",
          color: game_mode === "live" ? "var(--secondary)" : "var(--text-muted)",
          fontWeight: "600",
          fontSize: "13px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        🚀 Live Mode
      </button>
    </div>
  );
}
