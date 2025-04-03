// src/components/screens/Exercises/GrammarExercise/hooks/useGrammarExercise.js
import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';
import { getGrammarDataByLevel } from '../utils/dataUtils';

const useGrammarExercise = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'grammar',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: getGrammarDataByLevel(level).exercises,
    exerciseType: 'grammar',
    level
  });

  const handleGrammar = (answer, type) => {
    // Logique spécifique grammaire
  };

  return {
    ...exerciseState,
    ...taskProgress,
    handleGrammar,
    mode: 'exercise'
  };
};

export default useGrammarExercise;