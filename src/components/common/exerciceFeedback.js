// src/components/common/ExerciseFeedback/index.js
import React from 'react';
import { View, Text } from 'react-native';
import AnimatedFeedback from '../AnimatedFeedback';
import styles from './style';

const ExerciseFeedback = ({
  isCorrect,
  explanation,
  hint,
  correctAnswer,
  correctOption,
  attempts = 1,
  style,
  animationType,
}) => {
  // Déterminer le titre en fonction du résultat et des tentatives
  const title = isCorrect 
    ? "Correct!" 
    : attempts > 1 
      ? "Let's try again" 
      : "Incorrect";
  
  return (
    <AnimatedFeedback
      isCorrect={isCorrect}
      title={title}
      animationType={animationType || (isCorrect ? "pulse" : "fadeIn")}
      style={style}
      message={
        <>
          {/* Explication principale */}
          {explanation && (
            <Text style={styles.explanationText}>{explanation}</Text>
          )}
          
          {/* Indice (si disponible et réponse incorrecte) */}
          {!isCorrect && hint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintTitle}>Hint:</Text>
              <Text style={styles.hintText}>{hint}</Text>
            </View>
          )}
          
          {/* Réponse correcte (si incorrecte) */}
          {!isCorrect && correctAnswer && (
            <View style={styles.correctAnswerContainer}>
              <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
              <Text style={styles.correctAnswerText}>{correctAnswer}</Text>
            </View>
          )}
          
          {/* Option correcte pour QCM (si incorrecte) */}
          {!isCorrect && correctOption && (
            <View style={styles.correctOptionContainer}>
              <Text style={styles.correctOptionLabel}>Correct option:</Text>
              <Text style={styles.correctOptionText}>{correctOption}</Text>
            </View>
          )}
        </>
      }
    />
  );
};

export default ExerciseFeedback;