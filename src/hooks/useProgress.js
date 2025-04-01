import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useExerciseStore from '../stores/exerciseStore';

export const useProgress = () => {
  const { setProgress, progress } = useExerciseStore();

  const updateProgress = useCallback(async (exerciseId, type, level, completed, total) => {
    const progressValue = Math.round((completed / total) * 100);
    const key = `${type}_${level}_${exerciseId}`;
    
    // Sauvegarder dans le store
    setProgress(key, progressValue);
    
    // Persister dans AsyncStorage
    try {
      await AsyncStorage.setItem(`progress_${key}`, JSON.stringify({
        value: progressValue,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [setProgress]);

  return { updateProgress };
};

export default useProgress;
