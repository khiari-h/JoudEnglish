import create from 'zustand';

const useNavigationStore = create((set) => ({
  currentLevel: null,
  currentExercise: null,
  history: [],
  
  setCurrentLevel: (level) => set({ currentLevel: level }),
  setCurrentExercise: (exercise) => set({ currentExercise: exercise }),
  addToHistory: (screen) => set((state) => ({
    history: [...state.history, { screen, timestamp: Date.now() }]
  })),
  clearHistory: () => set({ history: [] })
}));

export default useNavigationStore;
