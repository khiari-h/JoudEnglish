import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './styles';

const ExerciseFeedback = ({
  isCorrect,
  message,
  explanation,
  levelColor,
  fadeAnim = new Animated.Value(1)
}) => {
  return (
    <Animated.View 
      style={[
        styles.container,
        isCorrect ? styles.correctContainer : styles.incorrectContainer,
        { opacity: fadeAnim }
      ]}
    >
      <Text style={styles.status}>
        {isCorrect ? "Correct!" : "Incorrect"}
      </Text>
      
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
      
      {explanation && (
        <Text style={styles.explanation}>{explanation}</Text>
      )}
    </Animated.View>
  );
};

export default ExerciseFeedback;
