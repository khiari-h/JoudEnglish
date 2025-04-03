import { useState, useEffect } from 'react';
import { useProgress } from './useProgress';

export const useTaskState = ({
  tasks,
  exerciseType,
  level,
  onTaskComplete,
  onAllTasksComplete
}) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { updateProgress } = useProgress();

  const currentTask = tasks[currentTaskIndex];
  const progress = (completedTasks.length / tasks.length) * 100;
  
  const markTaskComplete = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      const newCompleted = [...completedTasks, taskId];
      setCompletedTasks(newCompleted);
      
      updateProgress(exerciseType, level, newCompleted.length, tasks.length);
      
      if (onTaskComplete) onTaskComplete(taskId);
      
      if (newCompleted.length === tasks.length && onAllTasksComplete) {
        onAllTasksComplete();
      }
    }
  };

  return {
    currentTask,
    currentTaskIndex,
    setCurrentTaskIndex,
    completedTasks,
    markTaskComplete,
    progress,
    isComplete: completedTasks.length === tasks.length
  };
};
