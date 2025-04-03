import { useState, useRef, useEffect } from 'react';

export const useConversationState = ({
  onSend,
  onTypingStart,
  onTypingEnd
}) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    if (onSend) onSend(newMessage);
  };

  return {
    messages,
    isTyping,
    sendMessage: handleSendMessage,
    scrollRef,
    setTyping: setIsTyping
  };
};
