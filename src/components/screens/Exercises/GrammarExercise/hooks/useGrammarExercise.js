// src/components/screens/Exercises/GrammarExercise/hooks/useGrammarExercise.js
import { useTaskProgress } from '../../../../../hooks/common';
import { getGrammarDataByLevel } from '../utils/dataUtils';

const useGrammarExercise = ({ level, navigation }) => {
  const taskProgress = useTaskProgress({
    tasks: getGrammarDataByLevel(level).exercises,
    exerciseType: 'grammar',
    level
  });

  return {
    ...taskProgress,
    mode: 'exercise'
  };
};

export default useGrammarExercise;