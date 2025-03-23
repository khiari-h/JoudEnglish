import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";

/**
 * Composant pour le mode de correction complète
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {string} props.userCorrection - Texte de correction entré par l'utilisateur
 * @param {Function} props.setUserCorrection - Fonction pour mettre à jour la correction
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 */
const FullCorrectionView = ({
  exercise,
  userCorrection,
  setUserCorrection,
  showFeedback,
  isCorrect,
}) => {
  return (
    <View style={styles.container}>
      {/* Texte original */}
      <View style={styles.originalTextContainer}>
        <Text style={styles.originalTextLabel}>Original text:</Text>
        <Text style={styles.originalText}>{exercise.text}</Text>
      </View>

      {/* Zone de correction */}
      <TextInput
        style={[
          styles.correctionInput,
          showFeedback &&
            (isCorrect ? styles.correctInput : styles.incorrectInput),
        ]}
        value={userCorrection}
        onChangeText={setUserCorrection}
        multiline
        placeholder="Type the corrected text here..."
        placeholderTextColor="#94a3b8"
        editable={!showFeedback}
      />

      {/* Affichage des différences (peut être amélioré dans une version future) */}
      {showFeedback && !isCorrect && (
        <View style={styles.differencesContainer}>
          <Text style={styles.differencesLabel}>Key differences:</Text>
          <Text style={styles.differencesText}>
            Compare your answer with the correct version to see what you missed.
          </Text>
        </View>
      )}
    </View>
  );
};

export default FullCorrectionView;