import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const useExerciseStore = create(
  persist(
    (set, get) => ({
      progress: {},
      scores: {},
      currentExercise: null,
      exercises: {},
      
      setProgress: (exerciseId, value) => 
        set((state) => ({
          progress: {
            ...state.progress,
            [exerciseId]: value
          }
        })),
      
      setExerciseData: (type, level, data) =>
        set((state) => ({
          exercises: {
            ...state.exercises,
            [`${type}_${level}`]: data
          }
        })),

      setScore: async (exerciseId, score) => {
        try {
          const currentScores = get().scores;
          const newScores = {
            ...currentScores,
            [exerciseId]: score
          };
          
          await AsyncStorage.setItem('exercise_scores', JSON.stringify(newScores));
          
          set({ scores: newScores });
        } catch (error) {
          console.error('Error saving score:', error);
        }
      },
      
      loadStoredData: async () => {
        try {
          const [scores, progress] = await Promise.all([
            AsyncStorage.getItem('exercise_scores'),
            AsyncStorage.getItem('exercise_progress')
          ]);
          
          set({
            scores: scores ? JSON.parse(scores) : {},
            progress: progress ? JSON.parse(progress) : {}
          });
        } catch (error) {
          console.error('Error loading stored data:', error);
        }
      }
    }),
    {
      name: 'exercise-storage',
      getStorage: () => AsyncStorage,
    }
  )
);

export default useExerciseStore;
