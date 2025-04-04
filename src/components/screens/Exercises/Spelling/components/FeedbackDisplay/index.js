import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

/**
 * Composant pour afficher le feedback après la réponse de l'utilisateur
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.correctAnswer - La réponse correcte à afficher si la réponse est incorrecte
 * @param {string} props.explanation - Explication de la réponse correcte
 * @returns {JSX.Element} Composant FeedbackDisplay
 */
const FeedbackDisplay = ({ isCorrect, correctAnswer, explanation }) => {
  return (
    <View
      style={[
        styles.feedbackContainer,
        isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
      ]}
    >
      <Text style={styles.feedbackTitle}>
        {isCorrect ? "Correct!" : "Incorrect!"}
      </Text>
      
      {!isCorrect && correctAnswer && (
        <Text style={styles.correctSpelling}>
          The correct {correctAnswer.includes(' ') ? 'answer' : 'spelling'} is:{' '}
          <Text style={styles.spellingHighlight}>{correctAnswer}</Text>
        </Text>
      )}
      
      <Text style={styles.feedbackExplanation}>{explanation}</Text>
    </View>
  );
};

export default FeedbackDisplay;