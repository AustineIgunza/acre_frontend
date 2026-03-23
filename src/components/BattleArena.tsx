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
    <div className="w-full h-full flex flex-col lg:flex-row gap-2 lg:gap-3">
      {/* Main Content - Left Side */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
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

        {/* Encounter Card - Takes main space */}
        <div className="flex-1 min-h-0" style={{ animation: "slideInFromRight 0.4s ease-out" }}>
          <EncounterCard
            encounter={current_encounter}
            is_loading={is_loading}
          />
        </div>
      </div>

      {/* Sidebar - Right Side (Fixed on desktop, collapsible on mobile) */}
      <div className="w-full lg:w-64 flex flex-col gap-2 lg:max-h-screen">
        {/* Health Bars */}
        <div className="rounded-xl border p-2 sm:p-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", animation: "slideInFromLeft 0.4s ease-out" }}>
          <h3 className="font-bold text-xs mb-2" style={{ color: "var(--text-secondary)" }}>⚔️ Status</h3>
          
          <div className="space-y-2">
            {/* Player HP */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs" style={{ color: "var(--text-secondary)" }}>You</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {battle_state.player_hp}/{battle_state.max_player_hp}
                </span>
              </div>
              <HealthBar percentage={player_hp_percent} color="blue" />
            </div>

            {/* VS Label */}
            <div className="text-center py-0.5" style={{ color: "var(--text-muted)", fontSize: "9px", fontWeight: "bold" }}>
              VS
            </div>

            {/* Boss HP */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs" style={{ color: "var(--text-secondary)" }}>
                  {battle_state.boss.boss_name}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {battle_state.boss_hp}/{battle_state.max_boss_hp}
                </span>
              </div>
              <HealthBar percentage={boss_hp_percent} color="red" />
            </div>
          </div>
        </div>

        {/* Battle Log */}
        {battle_state.battle_log.length > 0 && (
          <div 
            className="rounded-xl border p-2 sm:p-3 flex-1 min-h-0 flex flex-col"
            style={{
              backgroundColor: "var(--surface-alt)",
              borderColor: "var(--border)",
              animation: "popupEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            <h3 className="font-bold mb-2 text-xs" style={{ color: "var(--text-secondary)" }}>
              🔥 Battle Log
            </h3>
            <div className="space-y-1 overflow-y-auto flex-1">
              {[...battle_state.battle_log].reverse().slice(0, 10).map((log, idx) => (
                <div 
                  key={idx}
                  className="p-1.5 rounded text-xs"
                  style={{
                    backgroundColor: log.was_correct ? "var(--success-soft)" : "var(--error-soft)",
                    color: log.was_correct ? "var(--success)" : "var(--error)",
                    animation: "popupEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  <div className="font-bold">T{battle_state.battle_log.length - idx}</div>
                  <div className="text-xs">{log.was_correct ? "✅ Hit" : "❌ Miss"}</div>
                  <div className="text-xs opacity-75">+{log.damage_dealt} | -{log.damage_taken}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div 
          className="rounded-xl border p-2 sm:p-3"
          style={{
            backgroundColor: "var(--primary-soft)",
            borderColor: "var(--primary)",
            animation: "slideInFromRight 0.5s ease-out"
          }}
        >
          <h3 className="font-bold text-xs mb-1" style={{ color: "var(--primary)" }}>💡 Tips</h3>
          <div className="text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
            <p className="leading-tight">• Read carefully</p>
            <p className="leading-tight">• Think before answering</p>
            <p className="leading-tight">• Learn from mistakes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
