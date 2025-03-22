import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

/**
 * En-tête du composant ChatbotWriting avec navigation et badge de niveau
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.level - Niveau de langue (A1, B2, etc.)
 * @param {string} props.levelColor - Couleur associée au niveau
 * @param {Function} props.onBack - Fonction à appeler lors du retour
 */
const ChatHeader = ({ level, levelColor, onBack }) => {
  const navigation = useNavigation();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.exerciseTitle}>Chatbot Writing</Text>
    </View>
  );
};

export default ChatHeader;