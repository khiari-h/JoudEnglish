import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Button from '../../../../../common/Button';

/**
 * Modal affichant les détails d'une phrase ou expression
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.phrase - Phrase à afficher
 * @param {boolean} props.visible - Indique si le modal est visible
 * @param {Function} props.onClose - Fonction pour fermer le modal
 */
const PhraseDetailModal = ({
  phrase,
  visible,
  onClose,
}) => {
  if (!phrase) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Détails de la Phrase</Text>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Phrase Originale:</Text>
            <Text style={styles.detailText}>{phrase.english}</Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Traduction:</Text>
            <Text style={styles.detailText}>
              {phrase.translation}
            </Text>
          </View>

          {phrase.context && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Contexte:</Text>
              <Text style={styles.detailText}>{phrase.context}</Text>
            </View>
          )}

          {phrase.examples && phrase.examples.length > 0 && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Exemples:</Text>
              {phrase.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleSpoken}>{example.english}</Text>
                  <Text style={styles.exampleContext}>
                    Traduction: {example.translation}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {phrase.notes && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Notes:</Text>
              <Text style={styles.detailText}>{phrase.notes}</Text>
            </View>
          )}

          <Button
            title="Fermer"
            onPress={onClose}
            variant="text"
            size="medium"
            style={styles.closeModalButton}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PhraseDetailModal;