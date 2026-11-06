import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const STORAGE_KEY = 'yashika-super-world-game-v2'
const STORAGE_VERSION = 4

const initialState = {
  coins: 0,
  favoriteTechGuessed: false,
  favoriteTech: null,
  visitedLevels: {
    educloudplatform: false,
    pitchperfect: false,
    aushdrishti: false,
    intentswitch: false
  },
  visitedScreens: {},
  clearedLevels: {
    educloudplatform: false,
    pitchperfect: false,
    aushdrishti: false,
    intentswitch: false
  },
  soundEnabled: false,
  currentScreen: 'preloader',
  isPaused: false
}

// Migration function to handle old storage formats
const migrateState = (persistedState) => {
  if (!persistedState) return initialState

  // Version 1 had visitedLevels as array or missing keys
  const visitedLevels = persistedState.visitedLevels || {}
  const normalizedVisited = {}
  const projectSlugs = ['educloudplatform', 'pitchperfect', 'aushdrishti', 'intentswitch']

  // Handle array format (old)
  if (Array.isArray(visitedLevels)) {
    projectSlugs.forEach(slug => {
      normalizedVisited[slug] = visitedLevels.includes(slug)
    })
  } else if (typeof visitedLevels === 'object') {
    // Handle object format - ensure all keys exist
    projectSlugs.forEach(slug => {
      normalizedVisited[slug] = !!visitedLevels[slug]
    })
  }

  // Handle clearedLevels similarly - ensure explicit false for all projects
  const clearedLevels = persistedState.clearedLevels || {}
  const normalizedCleared = {}

  if (Array.isArray(clearedLevels)) {
    projectSlugs.forEach(slug => {
      normalizedCleared[slug] = clearedLevels.includes(slug)
    })
  } else if (typeof clearedLevels === 'object') {
    // Handle object format - ensure all keys exist with explicit boolean
    projectSlugs.forEach(slug => {
      normalizedCleared[slug] = !!clearedLevels[slug]
    })
  } else {
    // Default to all false
    projectSlugs.forEach(slug => {
      normalizedCleared[slug] = false
    })
  }

  // Handle visitedScreens (new in version 2)
  const visitedScreens = persistedState.visitedScreens || {}

  return {
    ...initialState,
    ...persistedState,
    visitedLevels: normalizedVisited,
    clearedLevels: normalizedCleared,
    visitedScreens,
    _storageVersion: STORAGE_VERSION
  }
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      initializeGame: () => {
        const stored = get()
        // Only reset if not initialized
        if (stored.coins === 0 && !stored.favoriteTechGuessed) {
          // Already at initial state
        }
      },

      addCoins: (amount = 1) => set((state) => ({
        coins: state.coins + amount
      })),

      setFavoriteTechGuessed: (tech) => set({
        favoriteTechGuessed: true,
        favoriteTech: tech
      }),

      markLevelVisited: (levelId) => set((state) => ({
        visitedLevels: {
          ...state.visitedLevels,
          [levelId]: true
        }
      })),

      markLevelCleared: (levelId) => set((state) => ({
        clearedLevels: {
          ...state.clearedLevels,
          [levelId]: true
        }
      })),

      markScreenVisited: (screenId) => set((state) => ({
        visitedScreens: {
          ...state.visitedScreens,
          [screenId]: true
        }
      })),

      toggleSound: () => set((state) => ({
        soundEnabled: !state.soundEnabled
      })),

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      togglePause: () => set((state) => ({
        isPaused: !state.isPaused
      })),

      setPaused: (paused) => set({ isPaused: paused }),

      resetGame: () => {
        // Clear localStorage completely
        localStorage.removeItem(STORAGE_KEY)
        set(initialState)
      }
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      migrate: migrateState,
      partialize: (state) => ({
        favoriteTechGuessed: state.favoriteTechGuessed,
        favoriteTech: state.favoriteTech,
        visitedLevels: state.visitedLevels,
        visitedScreens: state.visitedScreens,
        clearedLevels: state.clearedLevels,
        soundEnabled: state.soundEnabled
      })
    }
  )
)