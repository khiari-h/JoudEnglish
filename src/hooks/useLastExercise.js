import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useExerciseStore from '../stores/exerciseStore';

export const useLastExercise = () => {
  const [lastExercise, setLastExercise] = useState(null);
  const { progress } = useExerciseStore();

  const updateLastExercise = async (exerciseData) => {
    try {
      await AsyncStorage.setItem('lastExercise', JSON.stringify({
        ...exerciseData,
        timestamp: Date.now()
      }));
      setLastExercise(exerciseData);
    } catch (error) {
      console.error('Error saving last exercise:', error);
    }
  };

  useEffect(() => {
    const loadLastExercise = async () => {
      try {
        const stored = await AsyncStorage.getItem('lastExercise');
        if (stored) {
          setLastExercise(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading last exercise:', error);
      }
    };
    
    loadLastExercise();
  }, []);

  return { lastExercise, updateLastExercise };
};
