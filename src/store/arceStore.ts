/**
 * Stub ACRE Store
 * Placeholder for future authentication and progress tracking
 */

import { create } from "zustand";

interface ArceStore {
  user: null;
  authInitialized: boolean;
  initAuth: () => void;
  logout: () => void;
  fetchProgress: () => Promise<void>;
  userProgress: any;
  progressDetails: any;
}

export const useArceStore = create<ArceStore>((set) => ({
  user: null,
  authInitialized: true,
  initAuth: () => {
    set({ authInitialized: true });
  },
  logout: () => {
    set({ user: null });
  },
  fetchProgress: async () => {
    // Placeholder
  },
  userProgress: null,
  progressDetails: null,
}));
