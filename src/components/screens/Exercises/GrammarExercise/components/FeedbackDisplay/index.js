import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {number} props.attempts - Nombre de tentatives de l'utilisateur
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const FeedbackDisplay = ({
  isCorrect,
  exercise,
  attempts,
  levelColor,
}) => {
  if (!exercise) return null;

  // Détermine le message de feedback en fonction du résultat et des tentatives
  const getFeedbackMessage = () => {
    if (isCorrect) {
      return exercise.explanation || "Well done! That's correct.";
    } else {
      // Après plusieurs tentatives, montrer la réponse
      if (attempts > 1) {
        return `The correct answer is: ${exercise.answer}`;
      } else {
        return "Not quite right. Try again!";
      }
    }
  };

  // Ajoute un conseil supplémentaire pour aider l'utilisateur
  const getTip = () => {
    if (!isCorrect && exercise.hint) {
      return exercise.hint;
    }
    return null;
  };

  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
      ]}
    >
      <Text style={styles.title}>
        {isCorrect ? 'Correct!' : 'Incorrect!'}
      </Text>
      
      <Text style={styles.feedbackText}>
        {getFeedbackMessage()}
      </Text>
      
      {/* Afficher un conseil si disponible */}
      {!isCorrect && exercise.hint && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipLabel}>Hint:</Text>
          <Text style={styles.tipText}>{exercise.hint}</Text>
        </View>
      )}
      
      {/* Explication additionnelle pour les réponses correctes */}
      {isCorrect && exercise.additionalInfo && (
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoText}>
            {exercise.additionalInfo}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FeedbackDisplay;