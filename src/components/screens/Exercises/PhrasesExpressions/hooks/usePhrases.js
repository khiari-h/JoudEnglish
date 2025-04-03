import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';
import phrasesA1Data from "../../../../data/exercises/phrases/phrasesA1";

const usePhrases = ({ level, navigation }) => {
  const getPhrasesData = (level) => {
    switch (level) {
      case "A1":
        return phrasesA1Data;
      default:
        return phrasesA1Data;
    }
  };

  const phrasesData = getPhrasesData(level);

  const exerciseState = useExerciseState({
    type: 'phrases',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: phrasesData.exercises,
    exerciseType: 'phrases',
    level
  });

  return {
    ...exerciseState,
    ...taskProgress,
    mode: 'exercise'
  };
};

export default usePhrases;