import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const useExerciseNavigation = (level) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToResults = useCallback((score) => {
    navigation.navigate('ExerciseResults', { 
      level,
      score 
    });
  }, [navigation, level]);

  const exitExercise = useCallback(() => {
    navigation.navigate('ExerciseSelection', { level });
  }, [navigation, level]);

  return {
    goBack,
    goToResults,
    exitExercise
  };
};

export default useExerciseNavigation;
