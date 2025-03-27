// src/components/screens/Exercises/WordGamesExercise/components/FeedbackMessage/index.js
import React from 'react';
import { Text } from 'react-native';
import AnimatedFeedback from '../../../../../common/animatedFeedback';
import styles from './style';

/**
 * Composant pour afficher un message de feedback dans les jeux de mots
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.message - Message personnalisé
 * @param {string} props.correctAnswer - Réponse correcte (si incorrecte)
 */
const FeedbackMessage = ({
  isCorrect,
  message,
  correctAnswer
}) => {
  // Préparer le contenu du message
  const messageContent = () => (
    <>
      {message && (
        <Text style={styles.feedbackText}>{message}</Text>
      )}
      
      {!isCorrect && correctAnswer && (
        <Text style={styles.correctAnswerText}>
          Correct answer: <Text style={styles.answerHighlight}>{correctAnswer}</Text>
        </Text>
      )}
    </>
  );

  return (
    <AnimatedFeedback
      isCorrect={isCorrect}
      title={isCorrect ? "Correct!" : "Incorrect!"}
      message={messageContent()}
      animationType={isCorrect ? "pulse" : "flash"}
      style={styles.customFeedbackStyle}
    />
  );
};

export default FeedbackMessage;