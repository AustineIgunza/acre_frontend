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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
      {/* Boss Introduction - Compact */}
      {battle_state.current_encounter_index === 0 && (
        <div 
          className="p-3 sm:p-4 rounded-xl border text-center"
          style={{
            backgroundColor: "var(--secondary-soft)",
            borderColor: "var(--secondary)",
            animation: "smoothScale 0.5s ease-out"
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: "var(--secondary)" }}>
            {battle_state.boss.boss_name}
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            {battle_state.boss.intro_narrative}
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Encounter {battle_state.current_encounter_index + 1} of {battle_state.boss.encounters.length}
          </p>
        </div>
      )}

      {/* Health Bars - Compact */}
      <div className="space-y-2 sm:space-y-3" style={{ animation: "slideInFromLeft 0.5s ease-out" }}>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
              YOUR HP
            </span>
            <span className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
              {battle_state.player_hp} / {battle_state.max_player_hp}
            </span>
          </div>
          <HealthBar percentage={player_hp_percent} color="blue" />
        </div>

        <div className="text-center" style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "bold" }}>
          VS
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
              {battle_state.boss.boss_name}
            </span>
            <span className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
              {battle_state.boss_hp} / {battle_state.max_boss_hp}
            </span>
          </div>
          <HealthBar percentage={boss_hp_percent} color="red" />
        </div>
      </div>

      {/* Encounter Card */}
      <div style={{ animation: "slideInFromRight 0.5s ease-out" }}>
        <EncounterCard
          encounter={current_encounter}
          is_loading={is_loading}
        />
      </div>

      {/* Battle Log - Compact */}
      {battle_state.battle_log.length > 0 && (
        <div 
          className="rounded-xl border p-3 sm:p-4"
          style={{
            backgroundColor: "var(--surface-alt)",
            borderColor: "var(--border)",
            maxHeight: "120px",
            overflowY: "auto"
          }}
        >
          <h3 className="font-bold mb-2 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            ⚔️ Battle Log
          </h3>
          <div className="space-y-1">
            {[...battle_state.battle_log].reverse().slice(0, 5).map((log, idx) => (
              <div 
                key={idx}
                className="p-2 rounded text-xs"
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
