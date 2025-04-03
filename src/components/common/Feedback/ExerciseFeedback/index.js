import React from "react";
import { View, Text } from "react-native";
import AnimatedFeedback from "../AnimatedFeedback";
import styles from "./style";

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
          {explanation && (
            <Text style={styles.explanationText}>{explanation}</Text>
          )}

          {!isCorrect && hint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintTitle}>Hint:</Text>
              <Text style={styles.hintText}>{hint}</Text>
            </View>
          )}

          {!isCorrect && correctAnswer && (
            <View style={styles.correctAnswerContainer}>
              <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
              <Text style={styles.correctAnswerText}>{correctAnswer}</Text>
            </View>
          )}

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
