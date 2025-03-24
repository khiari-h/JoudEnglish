import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.explanation - Explication de la réponse (optionnel)
 */
const FeedbackDisplay = ({
  isCorrect,
  explanation,
}) => {
  return (
    <View style={styles.feedbackContainer}>
      <Text style={styles.feedbackText}>
        {isCorrect
          ? "Correct! Great job."
          : "Oops! The correct answer is different."}
      </Text>
      
      {explanation && (
        <Text style={styles.explanationText}>
          {explanation}
        </Text>
      )}
    </View>
  );
};

export default FeedbackDisplay;