import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './style';

/**
 * Carte de question pour les exercices de lecture
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.question - Question à afficher
 * @param {number} props.questionIndex - Index de la question
 * @param {number|null} props.selectedAnswer - Index de la réponse sélectionnée
 * @param {Function} props.onSelectAnswer - Fonction pour sélectionner une réponse
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {number} props.attempts - Nombre de tentatives
 * @param {Animated.Value} props.fadeAnim - Valeur d'animation pour fondu
 * @param {Animated.Value} props.slideAnim - Valeur d'animation pour slide
 */
const QuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  isCorrect,
  attempts,
  fadeAnim,
  slideAnim,
}) => {
  if (!question) return null;

  return (
    <Animated.View
      style={[
        styles.questionContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.questionTitle}>
        Question {questionIndex + 1}
      </Text>
      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              showFeedback &&
                index === question.correctAnswer &&
                styles.correctOption,
              showFeedback &&
                selectedAnswer === index &&
                selectedAnswer !== question.correctAnswer &&
                styles.incorrectOption,
            ]}
            onPress={() => onSelectAnswer(index)}
            disabled={showFeedback}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText,
                showFeedback &&
                  index === question.correctAnswer &&
                  styles.correctOptionText,
                showFeedback &&
                  selectedAnswer === index &&
                  selectedAnswer !== question.correctAnswer &&
                  styles.incorrectOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback après réponse */}
      {showFeedback && (
        <View
          style={[
            styles.feedbackContainer,
            isCorrect
              ? styles.correctFeedback
              : styles.incorrectFeedback,
          ]}
        >
          <Text style={styles.feedbackTitle}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </Text>
          <Text style={styles.feedbackText}>
            {isCorrect
              ? question.explanation
              : attempts > 1
              ? `The correct answer is: ${
                  question.options[question.correctAnswer]
                }`
              : "Try again!"}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default QuestionCard;