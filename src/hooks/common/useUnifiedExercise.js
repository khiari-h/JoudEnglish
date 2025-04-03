const useUnifiedExercise = ({ type, level, navigation, tasks }) => {
  const exerciseState = useExerciseState({ type, level, navigation });
  const taskProgress = useTaskProgress({ tasks, exerciseType: type, level });

  return {
    ...exerciseState,
    ...taskProgress,
    currentTask: tasks[exerciseState.currentIndex]
  };
};

export default useUnifiedExercise;
