import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';

const useListening = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'listening',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: listeningData.exercises,
    exerciseType: 'listening',
    level
  });

  return {
    ...exerciseState,
    ...taskProgress,
    mode: 'exercise'
  };
};

export default useListening;
