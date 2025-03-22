import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import MessageBubble from '../MessageBubble';
import TypingIndicator from '../TypingIndicator';
import styles from './style';

/**
 * Composant affichant la liste des messages de la conversation
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.conversation - Liste des messages de la conversation
 * @param {boolean} props.isTyping - Indique si le bot est en train d'écrire
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const MessageList = ({ conversation, isTyping, levelColor }) => {
  const scrollViewRef = useRef(null);
  
  // Défilement automatique vers le bas lorsque les messages changent
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation, isTyping]);
  
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Afficher tous les messages */}
      {conversation.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          levelColor={levelColor}
        />
      ))}
      
      {/* Afficher l'indicateur de frappe si le bot est en train d'écrire */}
      {isTyping && <TypingIndicator levelColor={levelColor} />}
    </ScrollView>
  );
};

export default MessageList;