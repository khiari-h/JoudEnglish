import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';

const useWordGames = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'word_games',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: gameData.exercises,
    exerciseType: 'word_games',
    level
  });

  return {
    ...exerciseState,
    ...taskProgress,
    mode: 'exercise'
  };
};

export default useWordGames;