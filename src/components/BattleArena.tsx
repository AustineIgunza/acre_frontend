"use client";

import { useCombatStore } from "@/store/combatStore";
import HealthBar from "./UI/HealthBar";
import EncounterCard from "./UI/EncounterCard";

export default function BattleArena() {
  const {
    battle_state,
    is_loading,
  } = useCombatStore();

  if (!battle_state) {
    return <div>Loading...</div>;
  }

  const current_encounter = battle_state.boss.encounters[battle_state.current_encounter_index] || null;
  const player_hp_percent = (battle_state.player_hp / battle_state.max_player_hp) * 100;
  const boss_hp_percent = (battle_state.boss_hp / battle_state.max_boss_hp) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 space-y-2 sm:space-y-3">
      {/* Boss Introduction - Compact */}
      {battle_state.current_encounter_index === 0 && (
        <div 
          className="p-2 sm:p-3 rounded-xl border text-center"
          style={{
            backgroundColor: "var(--secondary-soft)",
            borderColor: "var(--secondary)",
            animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          <h2 className="text-sm sm:text-base font-bold mb-1" style={{ color: "var(--secondary)" }}>
            {battle_state.boss.boss_name}
          </h2>
          <p className="text-xs leading-tight" style={{ color: "var(--text-secondary)" }}>
            {battle_state.boss.intro_narrative}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Encounter {battle_state.current_encounter_index + 1} of {battle_state.boss.encounters.length}
          </p>
        </div>
      )}

      {/* Health Bars - Compact */}
      <div className="space-y-1 sm:space-y-2" style={{ animation: "slideInFromLeft 0.4s ease-out" }}>
        <div>
          <div className="flex justify-between items-center mb-0.5">
            <span className="font-semibold text-xs" style={{ color: "var(--text-secondary)" }}>
              YOUR HP
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {battle_state.player_hp} / {battle_state.max_player_hp}
            </span>
          </div>
          <HealthBar percentage={player_hp_percent} color="blue" />
        </div>

        <div className="text-center" style={{ color: "var(--text-muted)", fontSize: "10px", fontWeight: "bold" }}>
          VS
        </div>

        <div>
          <div className="flex justify-between items-center mb-0.5">
            <span className="font-semibold text-xs" style={{ color: "var(--text-secondary)" }}>
              {battle_state.boss.boss_name}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {battle_state.boss_hp} / {battle_state.max_boss_hp}
            </span>
          </div>
          <HealthBar percentage={boss_hp_percent} color="red" />
        </div>
      </div>

      {/* Encounter Card */}
      <div style={{ animation: "slideInFromRight 0.4s ease-out" }}>
        <EncounterCard
          encounter={current_encounter}
          is_loading={is_loading}
        />
      </div>

      {/* Battle Log - Compact */}
      {battle_state.battle_log.length > 0 && (
        <div 
          className="rounded-xl border p-2 sm:p-3"
          style={{
            backgroundColor: "var(--surface-alt)",
            borderColor: "var(--border)",
            maxHeight: "100px",
            overflowY: "auto",
            animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          <h3 className="font-bold mb-1 text-xs" style={{ color: "var(--text-secondary)" }}>
            ⚔️ Battle Log
          </h3>
          <div className="space-y-0.5">
            {[...battle_state.battle_log].reverse().slice(0, 5).map((log, idx) => (
              <div 
                key={idx}
                className="p-1 rounded text-xs"
                style={{
                  backgroundColor: log.was_correct ? "var(--success-soft)" : "var(--error-soft)",
                  color: log.was_correct ? "var(--success)" : "var(--error)"
                }}
              >
                <span className="font-bold">Turn {battle_state.battle_log.length - idx}:</span> {" "}
                {log.was_correct ? "✅ Hit!" : "❌ Miss"} ({log.damage_dealt}→boss, {log.damage_taken}←you)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
