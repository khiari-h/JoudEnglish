import { useConversationState, useTaskProgress } from '../../../../../hooks/common';

const useChatLogic = ({ level, navigation }) => {
  // 1. Utilise les hooks généraux pour la base
  const handleMessage = (message) => {
    // Logique métier spécifique au chatbot
    // - Validation des réponses
    // - Progression du scénario
    // - Suggestions contextuelles
  };

  const { messages, isTyping, sendMessage } = useConversationState({
    onSend: handleMessage
  });

  const { currentTask, progress } = useTaskProgress({
    tasks: [],  // À remplacer par scenariosData
    exerciseType: 'chatbot',
    level,
    onTaskComplete: (taskId) => {
      // Logique de complétion
    }
  });

  return {
    messages,
    isTyping, 
    currentScenario: currentTask,
    progress,
    sendMessage
  };
};

export default useChatLogic;
