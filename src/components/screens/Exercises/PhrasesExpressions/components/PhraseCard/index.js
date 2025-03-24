import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Carte affichant une phrase ou expression
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.categoryName - Nom de la catégorie
 * @param {Object} props.phrase - Données de la phrase
 * @param {Function} props.onShowDetails - Fonction pour afficher les détails
 */
const PhraseCard = ({
  categoryName,
  phrase,
  onShowDetails,
}) => {
  if (!phrase) return null;

  return (
    <View style={styles.phraseContainer}>
      <Text style={styles.phraseTitle}>{categoryName}</Text>

      <View style={styles.phraseCard}>
        <Text style={styles.phraseEnglish}>{phrase.english}</Text>
        <Text style={styles.phraseTranslation}>
          {phrase.translation}
        </Text>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={onShowDetails}
        >
          <Text style={styles.detailsButtonText}>Voir les détails</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhraseCard;