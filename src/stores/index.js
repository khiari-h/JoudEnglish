import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Navigation state
      currentLevel: null,
      currentExercise: null,
      history: [],
      
      // Exercise state
      progress: {},
      scores: {},
      
      // Actions
      setProgress: (exerciseId, value) => set(/*...*/),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      setCurrentExercise: (exercise) => set({ currentExercise: exercise }),
      
      // History actions
      addToHistory: (screen) => set((state) => ({
        history: [...state.history, { screen, timestamp: Date.now() }]
      })),
      clearHistory: () => set({ history: [] })
    }),
    {
      name: 'app-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
