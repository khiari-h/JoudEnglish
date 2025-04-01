import create from 'zustand';

const useExerciseStore = create((set) => ({
  progress: {},
  setProgress: (exerciseId, value) => 
    set((state) => ({
      progress: {
        ...state.progress,
        [exerciseId]: value
      }
    })),
    
  scores: {},
  setScore: (exerciseId, score) =>
    set((state) => ({
      scores: {
        ...state.scores,
        [exerciseId]: score
      }
    }))
}));

export default useExerciseStore;
