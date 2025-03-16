import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import levelA1AssessmentData from "../../../data/exercises/assessments/levelA1Assessments";

const LevelAssessment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Référence pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // États de gestion du test
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Sections du test
  // Sections du test (correspondant aux sections dans le fichier de données)
  const sections = [
    "vocabulary",
    "grammar",
    "phrases_expressions",
    "error_correction",
    "spelling",
    "spelling_rules",
    "reading_comprehension",
  ];

  // Données d'évaluation basées sur le niveau
  const Data = levelA1AssessmentData;

  // Couleurs par niveau
  const getLevelColor = () => {
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

  const levelColor = getLevelColor();

  // Initialisation du test
  useEffect(() => {
    // Commencer par la première section
    setCurrentSection(sections[0]);
  }, []);

  // Gestion de la sélection de réponse
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  // Vérification de la réponse
  const validateAnswer = () => {
    if (selectedAnswer === null) return;

    // Montrer le feedback
    setShowFeedback(true);

    // Animation de feedback
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // Passer à la question suivante ou section suivante
  const goToNextQuestion = () => {
    const currentSectionData = Data[currentSection];

    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      // Passer à la question suivante dans la section
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Passer à la section suivante
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Test terminé
        setTestCompleted(true);
      }
    }
  };

  // Nouvelle fonction pour réessayer la question actuelle
  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Rendu des résultats
  const renderResults = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Assessment Complete!</Text>
          <Text style={styles.resultsFeedback}>
            Thank you for completing the level assessment.
          </Text>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: levelColor }]}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  // Rendu de la question actuelle
  const renderCurrentQuestion = () => {
    const currentSectionData = Data[currentSection];
    const currentQuestion = currentSectionData.questions[currentQuestionIndex];

    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.sectionTitle}>
          {currentSection.replace("_", " ").toUpperCase()}
        </Text>

        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.answerOptions}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerOption,
                selectedAnswer === index && [
                  styles.selectedAnswerOption,
                  { borderColor: levelColor },
                ],
                showFeedback &&
                  index === currentQuestion.correctAnswer &&
                  styles.correctAnswerOption,
              ]}
              onPress={() => handleSelectAnswer(index)}
              disabled={showFeedback}
            >
              <Text
                style={[
                  styles.answerOptionText,
                  selectedAnswer === index && { color: levelColor },
                  showFeedback &&
                    index === currentQuestion.correctAnswer &&
                    styles.correctAnswerText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct! Great job."
                : "Oops! The correct answer is different."}
            </Text>
            {currentQuestion.explanation && (
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    );
  };

  // Si le test est terminé, afficher les résultats
  if (testCompleted) {
    return renderResults();
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Level Assessment</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {currentSection && renderCurrentQuestion()}
      </ScrollView>

      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedAnswer === null && styles.disabledButton,
              { backgroundColor: levelColor },
            ]}
            onPress={validateAnswer}
            disabled={selectedAnswer === null}
          >
            <Text
              style={[
                styles.actionButtonText,
                { fontSize: 16, fontWeight: "700" },
              ]}
            >
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.tryAgainButton,
                { borderColor: levelColor },
              ]}
              onPress={tryAgain}
            >
              <Text style={[styles.actionButtonText, { color: levelColor }]}>
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: levelColor }]}
              onPress={goToNextQuestion}
            >
              <Text style={styles.actionButtonText}>
                Next{" "}
                {currentQuestionIndex ===
                Data[currentSection].questions.length - 1
                  ? "Section"
                  : "Question"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    elevation: 2, // Pour une meilleure ombre sur Android
    zIndex: 1, // Assurer que l'en-tête est au-dessus des autres éléments
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
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
    minWidth: 36, // Largeur minimale
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionCard: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  answerOptions: {
    marginBottom: 10,
  },
  answerOption: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedAnswerOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctAnswerOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  answerOptionText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
  },
  correctAnswerText: {
    color: "#10b981",
    fontWeight: "500",
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
  },
  feedbackText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
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
    justifyContent: "center", // Ajouter cette ligne
    flex: 1,
    minHeight: 48, // Ajouter une hauteur minimale
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center", // Garantir l'alignement du texte
    includeFontPadding: false, // Améliorer le rendu sur Android
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  explanationText: {
    fontSize: 14,
    color: "#475569",
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 20,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tryAgainButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    marginRight: 8,
    flex: 1,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    flex: 1,
  },
});

export default LevelAssessment;
