import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./style";
import Button from "../../../../../ui/Button";

/**
 * Composant pour l'affichage des résultats après les exercices
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.exercises - Liste des exercices
 * @param {Array} props.userAttempts - Tentatives de l'utilisateur
 * @param {number} props.score - Score obtenu
 * @param {Function} props.setShowResults - Fonction pour changer la visibilité des résultats
 * @param {Function} props.resetExerciseStates - Fonction pour réinitialiser les états
 * @param {Function} props.startExercise - Fonction pour démarrer un exercice
 * @param {string} props.correctionMode - Mode de correction utilisé
 * @param {Function} props.setViewMode - Fonction pour changer de mode d'affichage
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ResultsMode = ({
  exercises,
  userAttempts,
  score,
  setShowResults,
  resetExerciseStates,
  startExercise,
  correctionMode,
  setViewMode,
  levelColor,
}) => {
  const totalExercises = exercises.length;
  const percentage = Math.round((score / totalExercises) * 100);

  // Fonction pour obtenir un message de feedback selon le score
  const getFeedbackMessage = (percentage) => {
    if (percentage >= 80) {
      return "Excellent! You have a great eye for errors.";
    } else if (percentage >= 60) {
      return "Good job! Keep practicing to improve your error detection skills.";
    } else {
      return "Keep working on identifying and correcting errors. Practice makes perfect!";
    }
  };

  return (
    <ScrollView
      style={styles.resultsContainer}
      contentContainerStyle={styles.resultsContent}
    >
      <View style={styles.resultsCard}>
        <Text style={styles.resultsTitle}>Exercise Complete!</Text>

        {/* Cercle de score */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>
            {score}/{totalExercises}
          </Text>
        </View>

        {/* Message de feedback */}
        <Text style={styles.resultsFeedback}>
          {getFeedbackMessage(percentage)}
        </Text>

        {/* Section d'analyse des exercices */}
        <View style={styles.exercisesReview}>
          <Text style={styles.reviewTitle}>Exercise Review:</Text>

          {exercises.map((exercise, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewItemHeader}>
                <Text style={styles.reviewItemNumber}>#{index + 1}</Text>
                {userAttempts[index] && (
                  <View
                    style={[
                      styles.reviewStatusBadge,
                      userAttempts[index].isCorrect
                        ? styles.correctStatusBadge
                        : styles.incorrectStatusBadge,
                    ]}
                  >
                    <Text style={styles.reviewStatusText}>
                      {userAttempts[index].isCorrect ? "Correct" : "Incorrect"}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.reviewItemText}>
                Original: {exercise.text}
              </Text>
              <Text style={styles.reviewItemSolution}>
                Correct: {exercise.correctedText}
              </Text>

              {exercise.explanation && (
                <Text style={styles.reviewItemExplanation}>
                  {exercise.explanation}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Boutons d'action */}
        <View style={styles.resultsButtons}>
          <Button
            title="Try Again"
            onPress={() => {
              setShowResults(false);
              resetExerciseStates(exercises.length);
              startExercise(correctionMode);
            }}
            color={levelColor}
            size="large"
            fullWidth
            style={styles.tryAgainButton}
          />

          <Button
            title="Back to Browse"
            onPress={() => setViewMode("browse")}
            variant="outlined"
            color={levelColor}
            size="medium"
            fullWidth
            style={styles.backToBrowseButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResultsMode;
