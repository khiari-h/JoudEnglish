// src/components/common/ExerciseFeedback/index.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedFeedback from "./animatedFeedback";

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

// Définition des styles pour le composant
const styles = StyleSheet.create({
  explanationText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 12,
    lineHeight: 22,
  },
  hintContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fffbeb",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#f59e0b",
  },
  hintTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#92400e",
    marginBottom: 4,
  },
  hintText: {
    fontSize: 14,
    color: "#78350f",
    lineHeight: 20,
  },
  correctAnswerContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#f0f9ff",
    borderRadius: 6,
  },
  correctAnswerLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#0369a1",
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 14,
    color: "#0c4a6e",
  },
  correctOptionContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#f0f9ff",
    borderRadius: 6,
  },
  correctOptionLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#0369a1",
    marginBottom: 4,
  },
  correctOptionText: {
    fontSize: 14,
    color: "#0c4a6e",
  },
});

export default ExerciseFeedback;
