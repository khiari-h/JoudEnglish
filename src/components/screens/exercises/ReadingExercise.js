import React, { useState, useRef, useEffect } from "react";
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

// Import dynamique des données en fonction du niveau
import readingA1Data from "../../../data/exercises/reading/readingA1";
import readingA2Data from "../../../data/exercises/reading/readingA2";
import readingB1Data from "../../../data/exercises/reading/readingB1";
import readingB2Data from "../../../data/exercises/reading/readingB2";
import readingC1Data from "../../../data/exercises/reading/readingC1";
import readingC2Data from "../../../data/exercises/reading/readingC2";

const ReadingExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  const scrollViewRef = useRef();
  const textsScrollViewRef = useRef();

  // États pour gérer l'exercice
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [textExpanded, setTextExpanded] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [attempts, setAttempts] = useState(0); // Ajout du compteur de tentatives

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Determine color based on level
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

  // Function to get data based on level
  const getReadingData = (level) => {
    const dataMap = {
      A1: readingA1Data,
      A2: readingA2Data,
      B1: readingB1Data,
      B2: readingB2Data,
      C1: readingC1Data,
      C2: readingC2Data,
    };
    return dataMap[level] || readingA1Data;
  };

  // Get current exercise
  const currentExercise = allExercises[selectedExerciseIndex];

  // Initialize with the appropriate data based on level
  useEffect(() => {
    const exerciseData = getReadingData(level);

    if (exerciseData.exercises && exerciseData.exercises.length > 0) {
      setAllExercises(exerciseData.exercises);

      // Initialize completed questions for all exercises
      const initialCompletedQuestions = {};

      exerciseData.exercises.forEach((exercise, index) => {
        initialCompletedQuestions[index] = [];
      });

      // Only initialize if not already set
      if (Object.keys(completedQuestions).length === 0) {
        setCompletedQuestions(initialCompletedQuestions);
      }
    }
  }, [level]);

  // Reset question state when changing the selected exercise
  useEffect(() => {
    if (currentExercise) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTextExpanded(true);
      setAttempts(0);

      // Reset animations
      fadeAnim.setValue(1);
      slideAnim.setValue(0);

      // Scroll to top
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  }, [selectedExerciseIndex]);

  // Reset attempts when changing question
  useEffect(() => {
    setAttempts(0);
  }, [currentQuestionIndex]);

  // When selected exercise changes, scroll to center it
  useEffect(() => {
    if (textsScrollViewRef.current && allExercises.length > 0) {
      textsScrollViewRef.current.scrollTo({
        x: selectedExerciseIndex * 110, // Approximate width of each button
        animated: true,
      });
    }
  }, [selectedExerciseIndex]);

  // Animation when question changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    };
  }, [currentQuestionIndex, selectedExerciseIndex]);

  // Handle text selection change
  const handleTextChange = (index) => {
    if (index !== selectedExerciseIndex) {
      setSelectedExerciseIndex(index);
    }
  };

  // Verify if the current question is completed
  const isCurrentQuestionCompleted = () => {
    return completedQuestions[selectedExerciseIndex]?.includes(
      currentQuestionIndex
    );
  };

  // Calculate progress for the current exercise
  const calculateProgress = () => {
    const completed = completedQuestions[selectedExerciseIndex]?.length || 0;
    const total = currentExercise?.questions.length || 0;
    return (completed / total) * 100;
  };

  // Handle answer selection
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
  };

  // Handle submission of answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentExercise) return;

    // Increment attempts counter
    setAttempts(attempts + 1);

    // Show feedback
    setShowFeedback(true);
  };

  // Retry the current exercise
  const retryExercise = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  // Handle navigation to next question
  const handleNextQuestion = () => {
    if (!currentExercise) return;

    // Mark the current question as completed if it's not already
    if (!isCurrentQuestionCompleted()) {
      const updatedCompletedQuestions = { ...completedQuestions };
      if (!updatedCompletedQuestions[selectedExerciseIndex]) {
        updatedCompletedQuestions[selectedExerciseIndex] = [];
      }
      updatedCompletedQuestions[selectedExerciseIndex].push(
        currentQuestionIndex
      );
      setCompletedQuestions(updatedCompletedQuestions);
    }

    setShowFeedback(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Move to the next question if there is one
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAttempts(0);
    } else {
      // All questions in this exercise are completed
      const allCompleted = allExercises.every((exercise, index) => {
        return (
          (completedQuestions[index]?.length || 0) === exercise.questions.length
        );
      });

      if (allCompleted) {
        // All exercises are completed
        alert("All reading exercises completed!");
        navigation.goBack();
      } else {
        // Suggest moving to the next exercise
        let nextExerciseIndex =
          (selectedExerciseIndex + 1) % allExercises.length;

        // Find the next uncompleted exercise
        while (
          completedQuestions[nextExerciseIndex]?.length ===
            allExercises[nextExerciseIndex].questions.length &&
          nextExerciseIndex !== selectedExerciseIndex
        ) {
          nextExerciseIndex = (nextExerciseIndex + 1) % allExercises.length;
        }

        if (nextExerciseIndex === selectedExerciseIndex) {
          // If we come back to the current exercise, everything is completed
          alert("All reading exercises completed!");
          navigation.goBack();
        } else {
          // Ask user if they want to move to the next exercise
          if (
            confirm(
              `You've completed this text! Move to ${allExercises[nextExerciseIndex].title}?`
            )
          ) {
            setSelectedExerciseIndex(nextExerciseIndex);
          } else {
            // Reset progress for this exercise
            const updatedCompletedQuestions = { ...completedQuestions };
            updatedCompletedQuestions[selectedExerciseIndex] = [];
            setCompletedQuestions(updatedCompletedQuestions);

            // Reset to first question
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setAttempts(0);
          }
        }
      }
    }
  };

  // Handle navigation to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAttempts(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  };

  // Toggle text section expansion
  const toggleTextExpansion = () => {
    setTextExpanded(!textExpanded);

    // Scroll to top when expanding
    if (!textExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  // Handle word highlight for vocabulary help
  const handleWordPress = (word) => {
    if (
      currentExercise &&
      currentExercise.vocabulary &&
      currentExercise.vocabulary[word]
    ) {
      setHighlightedWord({
        word,
        definition: currentExercise.vocabulary[word],
      });
    }
  };

  // Close vocabulary popup
  const closeVocabularyPopup = () => {
    setHighlightedWord(null);
  };

  // If no exercise data is loaded yet
  if (allExercises.length === 0 || !currentExercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get current questions and calculate progress
  const totalQuestions = currentExercise.questions.length;
  const progress = calculateProgress();
  const currentQuestion = currentExercise.questions[currentQuestionIndex];
  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;

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
        <Text style={styles.exerciseTitle}>Reading</Text>
      </View>

      {/* Text selector */}
      <View style={styles.textSelectorContainer}>
        <Text style={styles.textSelectorLabel}>Texts:</Text>
        <ScrollView
          ref={textsScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.textsScrollView}
          contentContainerStyle={styles.textsContainer}
        >
          {allExercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.textButton,
                selectedExerciseIndex === index && [
                  styles.selectedTextButton,
                  { borderColor: levelColor },
                ],
              ]}
              onPress={() => handleTextChange(index)}
            >
              <Text
                style={[
                  styles.textButtonText,
                  selectedExerciseIndex === index && { color: levelColor },
                ]}
              >
                {exercise.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: levelColor },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedQuestions[selectedExerciseIndex]?.length || 0}/
          {totalQuestions}
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Text Section */}
        <View
          style={[
            styles.textContainer,
            !textExpanded && styles.collapsedTextContainer,
          ]}
        >
          <Text style={styles.textTitle}>{currentExercise.title}</Text>

          {textExpanded ? (
            <View style={styles.fullTextContainer}>
              {currentExercise.text.split(" ").map((word, index) => {
                // Remove punctuation for checking vocabulary
                const cleanWord = word.replace(/[.,!?;:""]/g, "");
                const hasDefinition =
                  currentExercise.vocabulary &&
                  currentExercise.vocabulary[cleanWord];

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={!hasDefinition}
                    onPress={() => hasDefinition && handleWordPress(cleanWord)}
                    style={styles.wordContainer}
                  >
                    <Text
                      style={[
                        styles.textWord,
                        hasDefinition && styles.highlightedWord,
                      ]}
                    >
                      {word}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={styles.collapsedText}>
              {currentExercise.text.substring(0, 100)}...
            </Text>
          )}

          <TouchableOpacity
            style={[styles.expandButton, { borderColor: levelColor }]}
            onPress={toggleTextExpansion}
          >
            <Text style={[styles.expandButtonText, { color: levelColor }]}>
              {textExpanded ? "Collapse Text" : "Expand Text"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Question Section */}
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
            Question {currentQuestionIndex + 1}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  showFeedback &&
                    index === currentQuestion.correctAnswer &&
                    styles.correctOption,
                  showFeedback &&
                    selectedAnswer === index &&
                    selectedAnswer !== currentQuestion.correctAnswer &&
                    styles.incorrectOption,
                ]}
                onPress={() => handleSelectAnswer(index)}
                disabled={showFeedback}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                    showFeedback &&
                      index === currentQuestion.correctAnswer &&
                      styles.correctOptionText,
                    showFeedback &&
                      selectedAnswer === index &&
                      selectedAnswer !== currentQuestion.correctAnswer &&
                      styles.incorrectOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Feedback section */}
          {showFeedback && (
            <View
              style={[
                styles.feedbackContainer,
                isCorrectAnswer
                  ? styles.correctFeedback
                  : styles.incorrectFeedback,
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {isCorrectAnswer ? "Correct!" : "Incorrect!"}
              </Text>
              <Text style={styles.feedbackText}>
                {isCorrectAnswer
                  ? currentQuestion.explanation
                  : attempts > 1
                  ? `The correct answer is: ${
                      currentQuestion.options[currentQuestion.correctAnswer]
                    }`
                  : "Try again!"}
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Question indicators */}
        <View style={styles.questionIndicatorContainer}>
          {currentExercise.questions.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentQuestionIndex(index);
                setSelectedAnswer(null);
                setShowFeedback(false);
                setAttempts(0);
                fadeAnim.setValue(0);
                slideAnim.setValue(50);
              }}
            >
              <View
                style={[
                  styles.questionIndicator,
                  {
                    backgroundColor:
                      currentQuestionIndex === index
                        ? levelColor
                        : completedQuestions[selectedExerciseIndex]?.includes(
                            index
                          )
                        ? `${levelColor}50`
                        : "#e5e7eb",
                    width: currentQuestionIndex === index ? 12 : 8,
                    height: currentQuestionIndex === index ? 12 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom action buttons */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          // Bouton "Check Answer" quand l'utilisateur n'a pas encore validé sa réponse
          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedAnswer === null
                ? styles.disabledButton
                : { backgroundColor: levelColor },
            ]}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.actionButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : isCorrectAnswer ? (
          // Boutons "Previous" et "Next Question" quand la réponse est correcte
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.prevButton,
                { opacity: currentQuestionIndex > 0 ? 1 : 0.5 },
                { backgroundColor: `${levelColor}15` },
              ]}
              onPress={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={[styles.navButtonText, { color: levelColor }]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                { backgroundColor: levelColor },
              ]}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < currentExercise.questions.length - 1
                  ? "Next Question"
                  : "Complete"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Boutons "Try Again" et "Skip" quand la réponse est incorrecte
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.retryButton,
                { backgroundColor: `${levelColor}15` },
              ]}
              onPress={retryExercise}
            >
              <Text style={[styles.navButtonText, { color: levelColor }]}>
                Try Again
              </Text>
            </TouchableOpacity>

            {attempts > 1 && (
              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.skipButton,
                  { backgroundColor: levelColor },
                ]}
                onPress={handleNextQuestion}
              >
                <Text style={styles.nextButtonText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Vocabulary popup */}
      {highlightedWord && (
        <View style={styles.vocabularyOverlay}>
          <View style={styles.vocabularyPopup}>
            <View style={styles.vocabularyHeader}>
              <Text style={styles.vocabularyWord}>{highlightedWord.word}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeVocabularyPopup}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.vocabularyDefinition}>
              {highlightedWord.definition}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
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
  // Text selector styles
  textSelectorContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "white",
  },
  textSelectorLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  textsScrollView: {
    flexGrow: 0,
  },
  textsContainer: {
    paddingRight: 20,
  },
  textButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedTextButton: {
    borderWidth: 2,
  },
  textButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  textContainer: {
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
  collapsedTextContainer: {
    maxHeight: 150,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  fullTextContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordContainer: {
    flexDirection: "row",
  },
  textWord: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
  },
  highlightedWord: {
    color: "#3b82f6",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  collapsedText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
  },
  expandButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  questionContainer: {
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
  questionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#eff6ff",
    borderColor: "#3b82f6",
  },
  correctOption: {
    backgroundColor: "#f0fdf4",
    borderColor: "#10b981",
  },
  incorrectOption: {
    backgroundColor: "#fef2f2",
    borderColor: "#ef4444",
  },
  optionText: {
    fontSize: 16,
    color: "#334155",
  },
  selectedOptionText: {
    color: "#3b82f6",
    fontWeight: "500",
  },
  correctOptionText: {
    color: "#10b981",
    fontWeight: "500",
  },
  incorrectOptionText: {
    color: "#ef4444",
    fontWeight: "500",
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
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
  feedbackText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  questionIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  questionIndicator: {
    borderRadius: 6,
    margin: 4,
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
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  retryButton: {
    marginRight: 10,
  },
  skipButton: {
    marginLeft: 10,
  },
  navButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  vocabularyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  vocabularyPopup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  vocabularyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  vocabularyWord: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#64748b",
  },
  vocabularyDefinition: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 22,
  },
});

export default ReadingExercise;
