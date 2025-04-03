import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';

const useSpellingExercise = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'spelling',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: spellingData.exercises,
    exerciseType: 'spelling',
    level
  });

  const handleSpelling = (answer) => {
    // Logique spécifique au spelling
  };

  return {
    ...exerciseState,
    ...taskProgress,
    handleSpelling,
    mode: 'exercise'
  };
};

export default useSpellingExercise;
