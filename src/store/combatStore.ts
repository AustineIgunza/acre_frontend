"use client";

import { create } from "zustand";
import {
  CombatStore,
  BattleState,
  CombatEncounter,
  EXAMPLE_COMBAT_BOSS,
} from "@/types/combat";
import { MOCK_TEST_BOSS, generateMockBattleLog } from "@/utils/mockTestData";

/**
 * ACRE Combat Store - Zustand
 * Manages all battle state across the app
 * 
 * TEST MODE:
 * A = Correct answer (full damage to boss, no damage to player)
 * C = Close/Partial (moderate damage to boss, small damage to player)
 * B = Wrong answer (minimal damage to boss, heavy damage to player)
 * 
 * HEATMAP: Blue (Hold/0-33%) → Orange (Warm/34-66%) → Red (Hot/67-100%)
 */

// Mode toggle: test or live
const GAME_MODE = "test"; // "test" or "live"

export const useCombatStore = create<CombatStore>((set, get) => ({
  // Initial state
  battle_session_id: null,
  battle_state: null,
  is_loading: false,
  error: null,
  game_mode: GAME_MODE,

  // Start a new battle
  startBattle: async (payload: { text?: string; url?: string; file?: File }, sourceTitle?: string) => {
    set({ is_loading: true, error: null });

    try {
      // Extract source content from payload
      let sourceContent = payload.text || "";
      
      // Mock API call for Day 1 - will connect to real backend on Day 2
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Use test mode boss or example boss
      const boss = GAME_MODE === "test" ? MOCK_TEST_BOSS : EXAMPLE_COMBAT_BOSS;

      // Generate mock battle state
      const mockBattleState: BattleState = {
        boss: boss,
        current_encounter_index: 0,
        player_hp: 100,
        boss_hp: 100,
        max_player_hp: 100,
        max_boss_hp: 100,
        battle_log: [],
        is_victory: false,
        is_defeat: false,
      };

      const sessionId = `battle-${Date.now()}`;

      // Save to localStorage
      localStorage.setItem(
        `acre-battle-${sessionId}`,
        JSON.stringify(mockBattleState)
      );

      set({
        battle_session_id: sessionId,
        battle_state: mockBattleState,
        is_loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to start battle",
        is_loading: false,
      });
    }
  },

  // Submit an answer to an encounter
  submitAnswer: async (encounterId: number, choice: "A" | "B" | "C" | "D") => {
    const state = get();
    if (!state.battle_state) return;

    set({ is_loading: true, error: null });

    try {
      // Mock API call - will connect to real backend on Day 2
      await new Promise((resolve) => setTimeout(resolve, 600));

      const encounter = state.battle_state.boss.encounters.find(
        (e) => e.id === encounterId
      );
      if (!encounter) throw new Error("Encounter not found");

      // Test mode scoring:
      // A = Correct (full mastery)
      // C = Close (partial understanding)
      // B = Wrong (needs review)
      let isCorrect: boolean;
      let damageDealt: number;
      let damageTaken: number;

      if (choice === "A") {
        // Correct answer
        isCorrect = true;
        damageDealt = 25;
        damageTaken = 0;
      } else if (choice === "C") {
        // Close/partial answer
        isCorrect = true; // Counts as success for progression
        damageDealt = 15;
        damageTaken = 5;
      } else if (choice === "B") {
        // Wrong answer
        isCorrect = false;
        damageDealt = 5;
        damageTaken = 20;
      } else {
        // Other choices treated as wrong
        isCorrect = false;
        damageDealt = 5;
        damageTaken = 15;
      }

      // Update battle state
      const newBattleState: BattleState = {
        ...state.battle_state,
        player_hp: Math.max(0, state.battle_state.player_hp - damageTaken),
        boss_hp: Math.max(0, state.battle_state.boss_hp - damageDealt),
        current_encounter_index:
          state.battle_state.current_encounter_index + 1,
        battle_log: [
          ...state.battle_state.battle_log,
          {
            timestamp: Date.now(),
            encounter_id: encounterId,
            player_choice: choice,
            was_correct: isCorrect,
            damage_dealt: damageDealt,
            damage_taken: damageTaken,
            feedback: isCorrect
              ? encounter.win_feedback
              : encounter.loss_feedback,
          },
        ],
        is_victory:
          state.battle_state.boss_hp - damageDealt <= 0 ||
          state.battle_state.current_encounter_index >=
            state.battle_state.boss.encounters.length,
        is_defeat: state.battle_state.player_hp - damageTaken <= 0,
      };

      // Save to localStorage
      if (state.battle_session_id) {
        localStorage.setItem(
          `acre-battle-${state.battle_session_id}`,
          JSON.stringify(newBattleState)
        );
      }

      set({
        battle_state: newBattleState,
        is_loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to submit answer",
        is_loading: false,
      });
    }
  },

  // Reset battle
  resetBattle: () => {
    set({
      battle_session_id: null,
      battle_state: null,
      is_loading: false,
      error: null,
    });
  },

  // Derived state: current encounter
  get current_encounter(): CombatEncounter | null {
    const state = get();
    if (!state.battle_state) return null;
    return (
      state.battle_state.boss.encounters[
        state.battle_state.current_encounter_index
      ] || null
    );
  },

  // Derived state: is battle active
  get is_battle_active(): boolean {
    const state = get();
    return !!(state.battle_state &&
      !state.battle_state.is_victory &&
      !state.battle_state.is_defeat);
  },

  // Derived state: player HP percentage
  get player_hp_percent(): number {
    const state = get();
    if (!state.battle_state) return 100;
    return (
      (state.battle_state.player_hp /
        state.battle_state.max_player_hp) *
      100
    );
  },

  // Derived state: boss HP percentage
  get boss_hp_percent(): number {
    const state = get();
    if (!state.battle_state) return 100;
    return (
      (state.battle_state.boss_hp / state.battle_state.max_boss_hp) *
      100
    );
  },

  // Set game mode (test or live)
  setGameMode: (mode: "test" | "live") => {
    set({ game_mode: mode });
  },
}));
