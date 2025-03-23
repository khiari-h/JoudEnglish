import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.correctionMode - Mode de correction (full, identify, multiple_choice)
 * @param {Object} props.exercise - Données de l'exercice actuel
 */
const FeedbackDisplay = ({ isCorrect, correctionMode, exercise }) => {
  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
      ]}
    >
      {/* Titre du feedback */}
      <Text style={styles.title}>
        {isCorrect ? "Correct!" : "Incorrect"}
      </Text>

      {/* Solution correcte (affichée uniquement en cas d'erreur) */}
      {!isCorrect && (
        <View style={styles.correctSolutionContainer}>
          <Text style={styles.correctSolutionLabel}>
            Correct solution:
          </Text>
          <Text style={styles.correctSolutionText}>
            {correctionMode === "full" ||
            correctionMode === "multiple_choice"
              ? exercise.correctedText
              : "The highlighted words contain errors."}
          </Text>
        </View>
      )}

      {/* Explication (si disponible) */}
      {exercise.explanation && (
        <Text style={styles.explanationText}>
          {exercise.explanation}
        </Text>
      )}

      {/* Astuces supplémentaires (pour les apprenants) */}
      {!isCorrect && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips to improve:</Text>
          <Text style={styles.tipText}>
            {getImprovementTip(correctionMode, exercise.errorType)}
          </Text>
        </View>
      )}
    </View>
  );
};

/**
 * Renvoie un conseil personnalisé en fonction du mode et du type d'erreur
 * 
 * @param {string} mode - Mode de correction
 * @param {string} errorType - Type d'erreur (si disponible dans l'exercice)
 * @returns {string} Conseil d'amélioration
 */
const getImprovementTip = (mode, errorType = "") => {
  const generalTips = {
    full: "Pay attention to grammar, spelling, word order, and punctuation.",
    identify: "Read the sentence carefully and look for grammar or vocabulary errors.",
    multiple_choice: "Compare options carefully and identify subtle differences.",
  };

  // Si un type d'erreur spécifique est fourni, donner un conseil plus précis
  // (Cette partie pourrait être étendue avec des conseils plus détaillés)
  if (errorType) {
    switch (errorType) {
      case "grammar":
        return "Focus on verb tenses, subject-verb agreement, and sentence structure.";
      case "vocabulary":
        return "Pay attention to word choice, collocations, and idioms.";
      case "spelling":
        return "Watch out for commonly misspelled words and double-check your spelling.";
      case "punctuation":
        return "Check comma usage, apostrophes, and sentence-ending punctuation.";
      default:
        return generalTips[mode] || "Practice makes perfect!";
    }
  }

  return generalTips[mode] || "Practice makes perfect!";
};

export default FeedbackDisplay;