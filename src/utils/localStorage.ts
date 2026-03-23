/**
 * Local storage utilities for persisting game progress
 */

interface GameProgress {
  currentBattle: number;
  completedBattles: number[];
  totalScore: number;
  lastPlayedDate: string;
  heatmapResults: ("correct" | "wrong" | "close")[];
  masteryScores: number[];
}

const STORAGE_KEY = "acre_game_progress";

/**
 * Save game progress to local storage
 */
export function saveGameProgress(progress: Partial<GameProgress>): void {
  try {
    const existing = getGameProgress();
    const updated = {
      ...existing,
      ...progress,
      lastPlayedDate: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save game progress:", error);
  }
}

/**
 * Get game progress from local storage
 */
export function getGameProgress(): GameProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load game progress:", error);
  }

  // Return default progress
  return {
    currentBattle: 0,
    completedBattles: [],
    totalScore: 0,
    lastPlayedDate: new Date().toISOString(),
    heatmapResults: Array(9).fill("close"),
    masteryScores: Array(9).fill(50),
  };
}

/**
 * Save heatmap results to local storage
 */
export function saveHeatmapResults(
  results: ("correct" | "wrong" | "close")[],
  masteryScores: number[]
): void {
  saveGameProgress({
    heatmapResults: results,
    masteryScores: masteryScores,
  });
}

/**
 * Get heatmap results from local storage
 */
export function getHeatmapResults(): {
  results: ("correct" | "wrong" | "close")[];
  masteryScores: number[];
} {
  const progress = getGameProgress();
  return {
    results: progress.heatmapResults,
    masteryScores: progress.masteryScores,
  };
}

/**
 * Save battle score
 */
export function saveBattleScore(score: number): void {
  const progress = getGameProgress();
  saveGameProgress({
    totalScore: progress.totalScore + score,
    currentBattle: progress.currentBattle + 1,
  });
}

/**
 * Clear all game progress
 */
export function clearGameProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear game progress:", error);
  }
}

/**
 * Get total sessions played
 */
export function getTotalSessions(): number {
  const progress = getGameProgress();
  return progress.completedBattles.length;
}

/**
 * Get average score per battle
 */
export function getAverageScore(): number {
  const progress = getGameProgress();
  if (progress.currentBattle === 0) return 0;
  return Math.round(progress.totalScore / progress.currentBattle);
}
