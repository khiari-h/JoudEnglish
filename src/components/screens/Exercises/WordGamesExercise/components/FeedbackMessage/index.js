import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant d'affichage du feedback après une réponse
 */
const FeedbackMessage = ({ isCorrect, levelColor, game }) => {
  // Message de succès ou d'échec
  const title = isCorrect ? "Great job!" : "Try again!";
  
  // Message personnalisé ou par défaut
  const message = isCorrect
    ? (game.successMessage || "You've successfully completed this game!")
    : (game.failureMessage || "Don't worry, you can try another word game.");

  return (
    <View
      style={[
        styles.feedbackContainer,
        isCorrect
          ? [styles.correctFeedback, { borderLeftColor: levelColor }]
          : styles.incorrectFeedback,
      ]}
    >
      <Text style={styles.feedbackTitle}>{title}</Text>
      <Text style={styles.feedbackText}>{message}</Text>
      
      {/* Afficher la réponse correcte en cas d'échec */}
      {!isCorrect && game.correctAnswer && (
        <Text style={styles.correctAnswerText}>
          Correct answer:{" "}
          <Text style={styles.answerHighlight}>
            {game.correctAnswer}
          </Text>
        </Text>
      )}
    </View>
  );
};

export default FeedbackMessage;