import { useState, useEffect } from 'react';
import { useProgress } from './useProgress';

export const useTaskProgress = ({
  tasks,
  exerciseType,
  level,
  onTaskComplete
}) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const { updateProgress } = useProgress();

  const markTaskAsComplete = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const newCompleted = [...completedTasks, taskId];
      setCompletedTasks(newCompleted);
      
      // Mise à jour de la progression
      updateProgress(exerciseType, level, newCompleted.length, tasks.length);
      
      if (onTaskComplete) onTaskComplete(taskId);
    }
  };

  return {
    completedTasks,
    markTaskAsComplete,
    progress: (completedTasks.length / tasks.length) * 100
  };
};
