import { useState, useEffect } from 'react';
import { useProgress } from './useProgress';
import { useExerciseState } from './useExerciseState';

export const useExerciseTask = ({
  tasks,
  exerciseType,
  level,
  navigation,
  onTaskComplete
}) => {
  const exerciseState = useExerciseState({
    type: exerciseType,
    level,
    exercises: tasks,
    navigation
  });

  const taskProgress = useTaskState({
    tasks,
    exerciseType,
    level,
    onTaskComplete
  });

  return {
    ...exerciseState,
    ...taskProgress,
    currentTask: tasks[exerciseState.currentIndex]
  };
};
