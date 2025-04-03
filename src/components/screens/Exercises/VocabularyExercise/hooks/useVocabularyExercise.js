import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';
import vocabularyData from '../../../../../data/exercises/vocabulary/vocabularyA1';

const useVocabularyExercise = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'vocabulary',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: vocabularyData.exercises,
    exerciseType: 'vocabulary',
    level
  });

  const handleVocabulary = (answer) => {
    // Logique spécifique au vocabulaire
  };
  
  return {
    ...exerciseState,
    ...taskProgress,
    handleVocabulary,
    mode: 'exercise'
  };
};

export default useVocabularyExercise;