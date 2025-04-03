// src/components/screens/Exercises/ChatbotWriting/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import { MessageComponent, InputArea } from '../../../common/Conversation';
import useChatLogic from './hooks/useChatLogic';

const ChatbotWriting = ({ navigation }) => {
  // Utilise uniquement useChatLogic qui gère toute la complexité
  const { messages, isTyping, currentScenario, progress, sendMessage } = 
    useChatLogic({ level, navigation });

  return (
    <BaseExercise>
      <MessageComponent messages={messages} />
      <InputArea onSend={sendMessage} />
    </BaseExercise>
  );
};

export default ChatbotWriting;
