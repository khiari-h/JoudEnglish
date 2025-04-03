import { useExerciseState, useTaskProgress } from '../../../../../hooks/common';
import assessmentData from "../../../../data/exercises/assessments/levelA1Assessments";

const useAssessment = ({ level, navigation }) => {
  const exerciseState = useExerciseState({
    type: 'assessment',
    level,
    navigation
  });

  const taskProgress = useTaskProgress({
    tasks: assessmentData.exercises,
    exerciseType: 'assessment',
    level
  });

  const handleAssessment = (answer, type) => {
    // Logique spécifique à l'évaluation
  };

  return {
    ...exerciseState,
    ...taskProgress,
    handleAssessment,
    mode: 'exercise'
  };
};

export default useAssessment;