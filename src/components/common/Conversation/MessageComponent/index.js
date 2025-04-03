import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const MessageComponent = ({
  message,
  isUser,
  levelColor,
  showTimestamp = true,
  showAvatar = false,
}) => {
  return (
    <View style={[
      styles.container,
      isUser ? styles.userMessage : styles.botMessage,
      { backgroundColor: isUser ? levelColor : `${levelColor}15` }
    ]}>
      <Text style={[
        styles.text,
        isUser ? styles.userText : styles.botText
      ]}>
        {message.text}
      </Text>
      {showTimestamp && (
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      )}
    </View>
  );
};

export default MessageComponent;
