import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './style';

/**
 * Composant de zone de saisie pour l'envoi de messages
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.message - Texte actuel du message
 * @param {Function} props.setMessage - Fonction pour mettre à jour le message
 * @param {Function} props.onSendMessage - Fonction appelée à l'envoi du message
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const InputArea = ({ message, setMessage, onSendMessage, levelColor }) => {
  const isMessageEmpty = message.trim() === "";
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
        placeholder="Tapez votre message..."
        placeholderTextColor="#9ca3af"
        multiline
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          isMessageEmpty
            ? styles.disabledButton
            : { backgroundColor: levelColor },
        ]}
        onPress={onSendMessage}
        disabled={isMessageEmpty}
      >
        <Text style={styles.sendButtonText}>↑</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputArea;