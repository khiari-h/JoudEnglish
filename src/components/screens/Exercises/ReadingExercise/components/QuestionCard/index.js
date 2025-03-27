// src/components/screens/Exercises/ReadingExercise/components/QuestionCard/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AnimatedFeedback from '../../../../../common/animatedFeedback';
import styles from './style';

const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  isCorrect,
  levelColor
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>Question:</Text>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && [
                styles.selectedOption,
                { borderColor: levelColor }
              ],
              showFeedback && index === question.correctAnswer && styles.correctOption,
              showFeedback && selectedAnswer === index && !isCorrect && styles.incorrectOption,
            ]}
            onPress={() => onSelectAnswer(index)}
            disabled={showFeedback}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === index && { color: levelColor },
                showFeedback && index === question.correctAnswer && styles.correctOptionText,
                showFeedback && selectedAnswer === index && !isCorrect && styles.incorrectOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Feedback avec le composant réutilisable */}
      {showFeedback && (
        <AnimatedFeedback
          isCorrect={isCorrect}
          title={isCorrect ? "Correct!" : "Incorrect"}
          message={
            <Text style={styles.feedbackText}>
              {isCorrect 
                ? (question.correctFeedback || "Good job! That's the right answer.")
                : (question.incorrectFeedback || "That's not the correct answer. Try to understand the context better.")}
            </Text>
          }
          animationType="fadeIn"
          style={styles.feedbackContainer}
        />
      )}
    </View>
  );
};

export default QuestionCard;