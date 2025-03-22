import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher une bulle de message dans la conversation
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.message - Objet message contenant texte, expéditeur, etc.
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const MessageBubble = ({ message, levelColor }) => {
  const isBotMessage = message.sender === "bot";
  
  return (
    <View
      style={[
        styles.messageBubble,
        isBotMessage ? styles.botBubble : styles.userBubble,
        isBotMessage
          ? { backgroundColor: `${levelColor}15` } // Couleur avec 15% d'opacité
          : { backgroundColor: levelColor }
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isBotMessage ? { color: "#1f2937" } : { color: "white" }
        ]}
      >
        {message.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          isBotMessage
            ? { color: "#6b7280" }
            : { color: "rgba(255,255,255,0.7)" }
        ]}
      >
        {message.timestamp}
      </Text>
    </View>
  );
};

export default MessageBubble;