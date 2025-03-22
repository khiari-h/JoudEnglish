import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Importation des données pour les règles d'orthographe
let spellingRulesA1Data;

try {
  spellingRulesA1Data =
    require("../../../../data/exercises/spelling/spellingRulesA1").default;
} catch (error) {
  console.warn(
    "Erreur lors de l'importation des fichiers de règles d'orthographe"
  );
  // Données par défaut en cas d'erreur
  spellingRulesA1Data = {
    title: "Spelling Rules",
    description: "Basic spelling rules",
    exercises: [
      {
        type: "spelling_rule",
        rule: "Example rule",
        instruction: "Apply the rule: Form the plural of 'cat'",
        correctAnswer: "cats",
        hasHint: true,
        hint: "Just add 's' to the end.",
        explanation: "Most nouns form their plural by adding 's' at the end.",
      },
    ],
  };
}

const SpellingRulesPractice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // États pour gérer les exercices
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAttempts, setUserAttempts] = useState([]);
  const [hasHint, setHasHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Détermine la couleur en fonction du niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Initialisation des données d'exercice
  useEffect(() => {
    try {
      const data = spellingRulesA1Data;
      console.log("Données de règles chargées:", data);

      if (data && data.exercises && data.exercises.length > 0) {
        setExercises(data.exercises);
        resetUserAttempts(data.exercises.length);
        setIsLoading(false);
      } else {
        console.error("Format de données de règles invalide:", data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement des règles d'orthographe:",
        error
      );
      setIsLoading(false);
    }
  }, [level]);

  const resetUserAttempts = (length) => {
    setUserAttempts(
      Array(length).fill({ input: "", isCorrect: false, attempted: false })
    );
  };

  // L'exercice actuel
  const currentExercise = exercises[currentExerciseIndex] || null;

  // Fonction pour vérifier la réponse de l'utilisateur
  const checkAnswer = () => {
    if (!userInput.trim()) return;

    const input = userInput.trim().toLowerCase();
    const correct = currentExercise.correctAnswer.toLowerCase();
    const isCorrectAnswer = input === correct;

    // Met à jour les tentatives de l'utilisateur
    const newAttempts = [...userAttempts];
    newAttempts[currentExerciseIndex] = {
      input,
      isCorrect: isCorrectAnswer,
      attempted: true,
    };
    setUserAttempts(newAttempts);

    // Mise à jour du score et de l'état de feedback
    if (isCorrectAnswer) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);

      // Animation pour une réponse correcte
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setIsCorrect(false);

      // Animation pour une réponse incorrecte
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setShowFeedback(true);
  };

  // Passe à l'exercice suivant ou affiche les résultats
  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput("");
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);

      // Réinitialise les animations
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
    } else {
      setShowResults(true);
    }
  };

  // Réinitialise l'exercice
  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setUserInput("");
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setScore(0);
    resetUserAttempts(exercises.length);
    setShowHint(false);
  };

  // Affiche un indice
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Détermine si l'indice est disponible pour l'exercice actuel
  useEffect(() => {
    if (currentExercise && currentExercise.hasHint !== undefined) {
      setHasHint(currentExercise.hasHint);
    } else {
      setHasHint(true); // Par défaut, tous les exercices ont des indices
    }
  }, [currentExerciseIndex, currentExercise]);

  // Affiche l'écran de chargement si les exercices ne sont pas encore chargés
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading spelling rules...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si aucun exercice n'est disponible malgré la fin du chargement
  if (!currentExercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.exerciseTitle}>Spelling Rules</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            No spelling rules found for this level.
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: levelColor, marginTop: 20 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Affiche les résultats finaux
  if (showResults) {
    const totalExercises = exercises.length;
    const percentage = Math.round((score / totalExercises) * 100);

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.exerciseTitle}>Spelling Rules</Text>
        </View>

        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
        >
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Practice Complete!</Text>

            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
              <Text style={styles.scoreText}>
                {score}/{totalExercises}
              </Text>
            </View>

            <Text style={styles.resultsFeedback}>
              {percentage >= 80
                ? "Excellent! You've mastered these spelling rules."
                : percentage >= 60
                ? "Good job! Keep practicing these spelling rules."
                : "Keep working on these spelling rules. Practice makes perfect!"}
            </Text>

            <View style={styles.answersReview}>
              <Text style={styles.reviewTitle}>Review Your Answers:</Text>

              {exercises.map((exercise, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.ruleText}>{exercise.rule}</Text>
                  <Text style={styles.reviewQuestion}>
                    {exercise.instruction}
                  </Text>
                  <View style={styles.reviewAnswerContainer}>
                    <Text style={styles.reviewAnswerLabel}>Your answer:</Text>
                    <Text
                      style={[
                        styles.reviewAnswer,
                        userAttempts[index].isCorrect
                          ? styles.correctAnswer
                          : styles.incorrectAnswer,
                      ]}
                    >
                      {userAttempts[index].attempted
                        ? userAttempts[index].input
                        : "(not attempted)"}
                    </Text>
                  </View>
                  {!userAttempts[index].isCorrect &&
                    userAttempts[index].attempted && (
                      <View style={styles.correctionContainer}>
                        <Text style={styles.correctionLabel}>
                          Correct answer:
                        </Text>
                        <Text style={styles.correctionText}>
                          {exercise.correctAnswer}
                        </Text>
                      </View>
                    )}
                  <Text style={styles.explanationText}>
                    {exercise.explanation}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.resultsButtons}>
              <TouchableOpacity
                style={[styles.resultsButton, { backgroundColor: levelColor }]}
                onPress={resetExercise}
              >
                <Text style={styles.resultsButtonText}>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.resultsButton,
                  styles.secondaryButton,
                  { borderColor: levelColor },
                ]}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.resultsButtonText, { color: levelColor }]}>
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Affiche l'exercice principal
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec niveau et titre */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.exerciseTitle}>Spelling Rules</Text>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  ((currentExerciseIndex + (showFeedback ? 1 : 0)) /
                    exercises.length) *
                  100
                }%`,
                backgroundColor: levelColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1}/{exercises.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Carte de l'exercice */}
        <Animated.View
          style={[
            styles.exerciseCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.ruleContainer}>
            <Text style={styles.ruleLabel}>Rule:</Text>
            <Text style={styles.ruleText}>{currentExercise.rule}</Text>
          </View>

          <Text style={styles.instruction}>{currentExercise.instruction}</Text>

          {/* Zone de saisie de l'utilisateur */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                showFeedback &&
                  (isCorrect ? styles.correctInput : styles.incorrectInput),
                {
                  borderColor: showFeedback
                    ? isCorrect
                      ? "#10b981"
                      : "#ef4444"
                    : "#cbd5e1",
                },
              ]}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Enter your answer..."
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!showFeedback}
            />

            {hasHint && !showFeedback && (
              <TouchableOpacity
                style={[styles.hintButton, { borderColor: levelColor }]}
                onPress={toggleHint}
              >
                <Text style={[styles.hintButtonText, { color: levelColor }]}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Affichage de l'indice si activé */}
          {showHint && !showFeedback && (
            <View
              style={[
                styles.hintContainer,
                { backgroundColor: `${levelColor}10` },
              ]}
            >
              <Text style={styles.hintText}>{currentExercise.hint}</Text>
            </View>
          )}

          {/* Feedback après vérification */}
          {showFeedback && (
            <View
              style={[
                styles.feedbackContainer,
                isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </Text>
              {!isCorrect && (
                <Text style={styles.correctSpelling}>
                  The correct answer is:{" "}
                  <Text style={styles.spellingHighlight}>
                    {currentExercise.correctAnswer}
                  </Text>
                </Text>
              )}
              <Text style={styles.feedbackExplanation}>
                {currentExercise.explanation}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Boutons d'action en bas */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              !userInput.trim()
                ? styles.disabledButton
                : [styles.enabledButton, { backgroundColor: levelColor }],
            ]}
            onPress={checkAnswer}
            disabled={!userInput.trim()}
          >
            <Text style={styles.actionButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.enabledButton,
              { backgroundColor: levelColor },
            ]}
            onPress={handleNextExercise}
          >
            <Text style={styles.actionButtonText}>
              {currentExerciseIndex < exercises.length - 1
                ? "Next Rule"
                : "See Results"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#475569",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#64748b",
  },
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  ruleContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  ruleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    lineHeight: 22,
  },
  instruction: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#334155",
    marginBottom: 10,
  },
  correctInput: {
    borderColor: "#10b981",
    backgroundColor: "#f0fdf4",
  },
  incorrectInput: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  hintButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  hintContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 15,
    color: "#475569",
    fontStyle: "italic",
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  correctFeedback: {
    backgroundColor: "#f0fdf4",
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  incorrectFeedback: {
    backgroundColor: "#fef2f2",
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  correctSpelling: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 8,
  },
  spellingHighlight: {
    fontWeight: "600",
    color: "#334155",
  },
  feedbackExplanation: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  actionContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  enabledButton: {
    backgroundColor: "#3b82f6",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // Styles pour l'écran de résultats
  resultsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f1f5f9",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  scoreText: {
    fontSize: 16,
    color: "#64748b",
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  answersReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 12,
  },
  reviewAnswerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAnswerLabel: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 8,
  },
  reviewAnswer: {
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  correctAnswer: {
    backgroundColor: "#f0fdf4",
    color: "#10b981",
  },
  incorrectAnswer: {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
  },
  correctionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  correctionLabel: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 8,
  },
  correctionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#10b981",
  },
  explanationText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    marginTop: 8,
  },
  resultsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
  },
  resultsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default SpellingRulesPractice;
