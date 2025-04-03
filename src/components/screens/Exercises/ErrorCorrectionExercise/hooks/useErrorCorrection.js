import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';

const useErrorCorrection = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'error_correction',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: errorData.exercises,
    exerciseType: 'error_correction',
    level
  });

  const handleCorrection = (correction, mode) => {
    // ...logique spécifique de correction
  };

  return {
    ...exerciseState,
    ...taskProgress,
    handleCorrection,
    mode: 'exercise'
  };
};

export default useErrorCorrection;
