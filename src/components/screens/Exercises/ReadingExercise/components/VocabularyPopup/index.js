import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './style';

/**
 * Popup pour afficher les définitions de vocabulaire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.word - Mot à afficher avec sa définition
 * @param {Function} props.onClose - Fonction pour fermer le popup
 */
const VocabularyPopup = ({
  word,
  onClose,
}) => {
  // Si pas de mot, ne pas afficher le popup
  if (!word) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!word}
      onRequestClose={onClose}
    >
      <View style={styles.vocabularyOverlay}>
        <View style={styles.vocabularyPopup}>
          <View style={styles.vocabularyHeader}>
            <Text style={styles.vocabularyWord}>{word.word}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.vocabularyDefinition}>
            {word.definition}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default VocabularyPopup;