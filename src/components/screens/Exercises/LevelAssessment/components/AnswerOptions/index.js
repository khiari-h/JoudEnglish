import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher les options de réponse
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.options - Liste des options de réponse
 * @param {number|null} props.selectedAnswer - Index de l'option sélectionnée
 * @param {Function} props.onSelectAnswer - Fonction pour sélectionner une option
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {number} props.correctAnswer - Index de la réponse correcte
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const AnswerOptions = ({
  options,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  correctAnswer,
  levelColor,
}) => {
  if (!options || !options.length) return null;

  return (
    <View style={styles.answerOptions}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerOption,
            selectedAnswer === index && [
              styles.selectedAnswerOption,
              { borderColor: levelColor },
            ],
            showFeedback &&
              index === correctAnswer &&
              styles.correctAnswerOption,
          ]}
          onPress={() => onSelectAnswer(index)}
          disabled={showFeedback}
        >
          <Text
            style={[
              styles.answerOptionText,
              selectedAnswer === index && { color: levelColor },
              showFeedback &&
                index === correctAnswer &&
                styles.correctAnswerText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AnswerOptions;