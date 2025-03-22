import React from 'react';
import { View, TextInput } from 'react-native';
import Button from '../../../../../ui/Button';
import styles from './styles';

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
      <Button
        title="↑"
        onPress={onSendMessage}
        color={levelColor}
        size="small"
        style={[
          styles.sendButton,
          isMessageEmpty && styles.disabledButton
        ]}
        textStyle={styles.sendButtonText}
        disabled={isMessageEmpty}
      />
    </View>
  );
};

export default InputArea;