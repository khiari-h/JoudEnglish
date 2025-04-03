import { useState, useEffect } from 'react';
import { useProgress } from './useProgress';

export const useMessageProgress = ({
  messages,
  exerciseType,
  level,
  onMessageComplete
}) => {
  const [completedMessages, setCompletedMessages] = useState([]);
  const { updateProgress } = useProgress();

  const markMessageAsComplete = (messageId) => {
    if (!completedMessages.includes(messageId)) {
      const newCompleted = [...completedMessages, messageId];
      setCompletedMessages(newCompleted);
      
      updateProgress(exerciseType, level, newCompleted.length, messages.length);
      
      if (onMessageComplete) onMessageComplete(messageId);
    }
  };

  return {
    completedMessages,
    markMessageAsComplete,
    progress: (completedMessages.length / messages.length) * 100
  };
};
