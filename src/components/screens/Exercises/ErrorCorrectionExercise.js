// src/components/screens/exercises/ErrorCorrectionExercise.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Animated,
  FlatList,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import fictif des données d'exercices de correction d'erreurs par niveau
import errorsA1Data from "../../../data/exercises/errorCorrection/errorCorrectionA1";
import errorsA2Data from "../../../data/exercises/errorCorrection/errorCorrectionA2";
import errorsB1Data from "../../../data/exercises/errorCorrection/errorCorrectionB1";
import errorsB2Data from "../../../data/exercises/errorCorrection/errorCorrectionB2";
import errorsC1Data from "../../../data/exercises/errorCorrection/errorCorrectionC1";
import errorsC2Data from "../../../data/exercises/errorCorrection/errorCorrectionC2";

const ErrorCorrectionExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // États pour gérer les exercices
  const [exercisesData, setExercisesData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userCorrection, setUserCorrection] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAttempts, setUserAttempts] = useState([]);
  const [score, setScore] = useState(0);
  const [highlightedErrors, setHighlightedErrors] = useState([]);
  const [viewMode, setViewMode] = useState("browse"); // 'browse', 'exercise', 'results'
  const [showHint, setShowHint] = useState(false);
  const [correctionMode, setCorrectionMode] = useState("full"); // 'full', 'identify', 'multiple_choice'
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);

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

  // Récupère les données en fonction du niveau
  const getErrorsData = (level) => {
    const dataMap = {
      A1: errorsA1Data,
      A2: errorsA2Data,
      B1: errorsB1Data,
      B2: errorsB2Data,
      C1: errorsC1Data,
      C2: errorsC2Data,
    };
    return dataMap[level] || errorsA1Data;
  };

  // Initialisation des données d'exercices
  useEffect(() => {
    const data = getErrorsData(level);
    setExercisesData(data);

    if (data && data.categories && data.categories.length > 0) {
      setSelectedCategory(data.categories[0].id);
    }
  }, [level]);

  // Filtre les exercices par catégorie sélectionnée
  useEffect(() => {
    if (exercisesData && selectedCategory) {
      const filteredExercises = exercisesData.exercises.filter(
        (exercise) => exercise.categoryId === selectedCategory
      );
      setExercises(filteredExercises);

      // Réinitialiser les états pour les nouveaux exercices
      resetExerciseStates(filteredExercises.length);
    }
  }, [exercisesData, selectedCategory]);

  // Réinitialise les états pour les exercices
  const resetExerciseStates = (exercisesCount) => {
    setCurrentExerciseIndex(0);
    setUserCorrection("");
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setUserAttempts(
      Array(exercisesCount).fill({
        correction: "",
        isCorrect: false,
        attempted: false,
      })
    );
    setScore(0);
    setHighlightedErrors([]);
    setSelectedErrorIndices([]);
    setSelectedChoiceIndex(null);
    setShowHint(false);
  };

  // Démarrer un exercice
  const startExercise = (mode = "full") => {
    if (exercises.length === 0) return;

    setCorrectionMode(mode);
    setViewMode("exercise");

    // Si le mode est 'identify', initialiser les erreurs à mettre en évidence
    if (mode === "identify" && exercises[0].errorPositions) {
      setHighlightedErrors([]);
    } else if (mode === "multiple_choice") {
      setSelectedChoiceIndex(null);
    } else {
      // Pour le mode 'full', initialiser la correction de l'utilisateur avec le texte original
      setUserCorrection(exercises[0].text);
    }
  };

  // Vérifier la correction de l'utilisateur
  const checkCorrection = () => {
    if (showFeedback) return;

    const currentExercise = exercises[currentExerciseIndex];
    let isCorrectAnswer = false;

    if (correctionMode === "full") {
      // Pour la correction complète, comparer avec la solution
      isCorrectAnswer =
        userCorrection.trim() === currentExercise.correctedText.trim();
    } else if (correctionMode === "identify") {
      // Pour l'identification des erreurs, vérifier si toutes les positions d'erreur ont été identifiées
      const errorPositions = currentExercise.errorPositions || [];
      isCorrectAnswer =
        selectedErrorIndices.length === errorPositions.length &&
        selectedErrorIndices.every((index) => errorPositions.includes(index));
    } else if (correctionMode === "multiple_choice") {
      // Pour le choix multiple, vérifier si l'option correcte a été sélectionnée
      isCorrectAnswer =
        selectedChoiceIndex === currentExercise.correctChoiceIndex;
    }

    // Mettre à jour le score
    if (isCorrectAnswer) {
      setScore((prevScore) => prevScore + 1);

      // Animation pour une réponse correcte
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
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
      // Animation pour une réponse incorrecte
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Mettre à jour les tentatives de l'utilisateur
    const newAttempts = [...userAttempts];
    newAttempts[currentExerciseIndex] = {
      correction:
        correctionMode === "full"
          ? userCorrection
          : correctionMode === "identify"
          ? JSON.stringify(selectedErrorIndices)
          : selectedChoiceIndex !== null
          ? currentExercise.choices[selectedChoiceIndex]
          : "",
      isCorrect: isCorrectAnswer,
      attempted: true,
    };
    setUserAttempts(newAttempts);

    // Afficher le feedback
    setIsCorrect(isCorrectAnswer);
    setShowFeedback(true);

    // En mode identification, mettre en évidence toutes les erreurs
    if (correctionMode === "identify") {
      setHighlightedErrors(currentExercise.errorPositions || []);
    }
  };

  // Passer à l'exercice suivant
  const goToNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      setUserCorrection(exercises[currentExerciseIndex + 1].text);
      setShowFeedback(false);
      setIsCorrect(false);
      setHighlightedErrors([]);
      setSelectedErrorIndices([]);
      setSelectedChoiceIndex(null);
      setShowHint(false);
    } else {
      // Afficher les résultats
      setShowResults(true);
    }
  };

  // Gérer le clic sur un mot (pour le mode d'identification d'erreurs)
  const handleWordPress = (index) => {
    if (showFeedback || correctionMode !== "identify") return;

    // Toggle la sélection du mot
    if (selectedErrorIndices.includes(index)) {
      setSelectedErrorIndices((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedErrorIndices((prev) => [...prev, index]);
    }
  };

  // Gérer la sélection d'une option (pour le mode choix multiple)
  const handleChoiceSelect = (index) => {
    if (showFeedback) return;

    setSelectedChoiceIndex(index);

    // Animation de sélection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Rendu d'une catégorie
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && [
          styles.selectedCategoryButton,
          { borderColor: levelColor },
        ],
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item.id && { color: levelColor },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Rendu des mots avec mise en évidence des erreurs (pour le mode identification)
  const renderWords = (text, mode) => {
    const words = text.split(" ");

    return (
      <View style={styles.wordsContainer}>
        {words.map((word, index) => {
          const isHighlighted =
            mode === "feedback"
              ? highlightedErrors.includes(index)
              : selectedErrorIndices.includes(index);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.word,
                isHighlighted &&
                  (mode === "feedback"
                    ? styles.highlightedErrorWord
                    : [
                        styles.selectedErrorWord,
                        {
                          backgroundColor: `${levelColor}20`,
                          borderColor: levelColor,
                        },
                      ]),
              ]}
              onPress={() => handleWordPress(index)}
              disabled={mode === "feedback"}
            >
              <Text
                style={[
                  styles.wordText,
                  isHighlighted &&
                    (mode === "feedback"
                      ? styles.highlightedErrorWordText
                      : { color: levelColor }),
                ]}
              >
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Rendu du mode de navigation
  const renderBrowseMode = () => (
    <ScrollView
      style={styles.browseContainer}
      contentContainerStyle={styles.browseContent}
    >
      <Text style={styles.sectionTitle}>Select Error Type</Text>

      {exercisesData && exercisesData.categories && (
        <FlatList
          horizontal
          data={exercisesData.categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesListContent}
        />
      )}

      <View style={styles.exerciseModesContainer}>
        <Text style={styles.exerciseModesTitle}>Choose Exercise Mode:</Text>

        <TouchableOpacity
          style={[styles.modeCard, { borderColor: levelColor }]}
          onPress={() => startExercise("full")}
          disabled={exercises.length === 0}
        >
          <View
            style={[
              styles.modeIconContainer,
              { backgroundColor: `${levelColor}20` },
            ]}
          >
            <Text style={[styles.modeIcon, { color: levelColor }]}>✏️</Text>
          </View>
          <View style={styles.modeDetails}>
            <Text style={styles.modeTitle}>Full Correction</Text>
            <Text style={styles.modeDescription}>
              Correct the entire sentence by editing the text
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeCard, { borderColor: levelColor }]}
          onPress={() => startExercise("identify")}
          disabled={exercises.length === 0}
        >
          <View
            style={[
              styles.modeIconContainer,
              { backgroundColor: `${levelColor}20` },
            ]}
          >
            <Text style={[styles.modeIcon, { color: levelColor }]}>🔍</Text>
          </View>
          <View style={styles.modeDetails}>
            <Text style={styles.modeTitle}>Identify Errors</Text>
            <Text style={styles.modeDescription}>
              Tap on words that contain errors
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeCard, { borderColor: levelColor }]}
          onPress={() => startExercise("multiple_choice")}
          disabled={exercises.length === 0}
        >
          <View
            style={[
              styles.modeIconContainer,
              { backgroundColor: `${levelColor}20` },
            ]}
          >
            <Text style={[styles.modeIcon, { color: levelColor }]}>📝</Text>
          </View>
          <View style={styles.modeDetails}>
            <Text style={styles.modeTitle}>Multiple Choice</Text>
            <Text style={styles.modeDescription}>
              Choose the correct version from options
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryDescription}>
        {selectedCategory && exercisesData && (
          <Text style={styles.categoryDescriptionText}>
            {exercisesData.categories.find((c) => c.id === selectedCategory)
              ?.description ||
              "Improve your English by identifying and correcting common errors."}
          </Text>
        )}

        <Text style={styles.exerciseCount}>
          {exercises.length} {exercises.length === 1 ? "exercise" : "exercises"}{" "}
          available
        </Text>
      </View>
    </ScrollView>
  );

  // Rendu du mode d'exercice
  const renderExerciseMode = () => {
    if (exercises.length === 0 || currentExerciseIndex >= exercises.length) {
      return (
        <View style={styles.emptyExerciseContainer}>
          <Text style={styles.emptyExerciseText}>No exercises available.</Text>
          <TouchableOpacity
            style={[styles.backToBrowseButton, { backgroundColor: levelColor }]}
            onPress={() => setViewMode("browse")}
          >
            <Text style={styles.backToBrowseButtonText}>Back to Browse</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const currentExercise = exercises[currentExerciseIndex];

    return (
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseProgress}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(currentExerciseIndex / exercises.length) * 100}%`,
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
          style={styles.exerciseScrollView}
          contentContainerStyle={styles.exerciseContent}
        >
          <Animated.View
            style={[
              styles.exerciseCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.exerciseTypeLabel}>
              {correctionMode === "full"
                ? "Full Correction"
                : correctionMode === "identify"
                ? "Identify Errors"
                : "Multiple Choice"}
            </Text>

            <Text style={styles.instructionText}>
              {correctionMode === "full"
                ? "Edit the text to correct all errors:"
                : correctionMode === "identify"
                ? "Tap on words that contain errors:"
                : "Select the correct version:"}
            </Text>

            {correctionMode === "full" && (
              <>
                <View style={styles.originalTextContainer}>
                  <Text style={styles.originalTextLabel}>Original text:</Text>
                  <Text style={styles.originalText}>
                    {currentExercise.text}
                  </Text>
                </View>

                <TextInput
                  style={[
                    styles.correctionInput,
                    showFeedback &&
                      (isCorrect ? styles.correctInput : styles.incorrectInput),
                  ]}
                  value={userCorrection}
                  onChangeText={setUserCorrection}
                  multiline
                  placeholder="Type the corrected text here..."
                  placeholderTextColor="#94a3b8"
                  editable={!showFeedback}
                />
              </>
            )}

            {correctionMode === "identify" && (
              <View style={styles.identifyContainer}>
                {showFeedback
                  ? renderWords(currentExercise.text, "feedback")
                  : renderWords(currentExercise.text, "select")}

                {!showFeedback && (
                  <Text style={styles.identifyInstructions}>
                    Tap on words that contain errors. You need to find{" "}
                    {currentExercise.errorPositions?.length || "?"} errors.
                  </Text>
                )}
              </View>
            )}

            {correctionMode === "multiple_choice" && (
              <View style={styles.multipleChoiceContainer}>
                <View style={styles.originalTextContainer}>
                  <Text style={styles.originalTextLabel}>Original text:</Text>
                  <Text style={styles.originalText}>
                    {currentExercise.text}
                  </Text>
                </View>

                <Text style={styles.choicesLabel}>
                  Choose the correct version:
                </Text>

                <View style={styles.choices}>
                  {currentExercise.choices &&
                    currentExercise.choices.map((choice, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.choiceOption,
                          selectedChoiceIndex === index && [
                            styles.selectedChoiceOption,
                            { borderColor: levelColor },
                          ],
                          showFeedback &&
                            index === currentExercise.correctChoiceIndex &&
                            styles.correctChoiceOption,
                          showFeedback &&
                            selectedChoiceIndex === index &&
                            selectedChoiceIndex !==
                              currentExercise.correctChoiceIndex &&
                            styles.incorrectChoiceOption,
                        ]}
                        onPress={() => handleChoiceSelect(index)}
                        disabled={showFeedback}
                      >
                        <Text
                          style={[
                            styles.choiceOptionText,
                            selectedChoiceIndex === index && {
                              color: levelColor,
                            },
                            showFeedback &&
                              index === currentExercise.correctChoiceIndex &&
                              styles.correctChoiceText,
                            showFeedback &&
                              selectedChoiceIndex === index &&
                              selectedChoiceIndex !==
                                currentExercise.correctChoiceIndex &&
                              styles.incorrectChoiceText,
                          ]}
                        >
                          {choice}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            )}

            {!showFeedback && (
              <TouchableOpacity
                style={[styles.hintButton, { borderColor: levelColor }]}
                onPress={() => setShowHint(!showHint)}
              >
                <Text style={[styles.hintButtonText, { color: levelColor }]}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Text>
              </TouchableOpacity>
            )}

            {showHint && (
              <View
                style={[
                  styles.hintContainer,
                  { backgroundColor: `${levelColor}10` },
                ]}
              >
                <Text style={styles.hintText}>{currentExercise.hint}</Text>
              </View>
            )}

            {showFeedback && (
              <View
                style={[
                  styles.feedbackContainer,
                  isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
                ]}
              >
                <Text style={styles.feedbackTitle}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </Text>

                {!isCorrect && (
                  <View style={styles.correctSolutionContainer}>
                    <Text style={styles.correctSolutionLabel}>
                      Correct solution:
                    </Text>
                    <Text style={styles.correctSolutionText}>
                      {correctionMode === "full" ||
                      correctionMode === "multiple_choice"
                        ? currentExercise.correctedText
                        : "The highlighted words contain errors."}
                    </Text>
                  </View>
                )}

                {currentExercise.explanation && (
                  <Text style={styles.explanationText}>
                    {currentExercise.explanation}
                  </Text>
                )}
              </View>
            )}
          </Animated.View>
        </ScrollView>

        <View style={styles.exerciseActions}>
          {!showFeedback ? (
            <TouchableOpacity
              style={[
                styles.checkButton,
                ((correctionMode === "full" && userCorrection.trim() === "") ||
                  (correctionMode === "identify" &&
                    selectedErrorIndices.length === 0) ||
                  (correctionMode === "multiple_choice" &&
                    selectedChoiceIndex === null)) &&
                  styles.disabledButton,
                { backgroundColor: levelColor },
              ]}
              onPress={checkCorrection}
              disabled={
                (correctionMode === "full" && userCorrection.trim() === "") ||
                (correctionMode === "identify" &&
                  selectedErrorIndices.length === 0) ||
                (correctionMode === "multiple_choice" &&
                  selectedChoiceIndex === null)
              }
            >
              <Text style={styles.checkButtonText}>Check Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: levelColor }]}
              onPress={goToNextExercise}
            >
              <Text style={styles.nextButtonText}>
                {currentExerciseIndex < exercises.length - 1
                  ? "Next Exercise"
                  : "See Results"}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.exitButton, { borderColor: levelColor }]}
            onPress={() => setViewMode("browse")}
          >
            <Text style={[styles.exitButtonText, { color: levelColor }]}>
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Rendu du mode résultats
  const renderResultsMode = () => {
    const totalExercises = exercises.length;
    const percentage = Math.round((score / totalExercises) * 100);

    return (
      <ScrollView
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
      >
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Exercise Complete!</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreText}>
              {score}/{totalExercises}
            </Text>
          </View>

          <Text style={styles.resultsFeedback}>
            {percentage >= 80
              ? "Excellent! You have a great eye for errors."
              : percentage >= 60
              ? "Good job! Keep practicing to improve your error detection skills."
              : "Keep working on identifying and correcting errors. Practice makes perfect!"}
          </Text>

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
                        {userAttempts[index].isCorrect
                          ? "Correct"
                          : "Incorrect"}
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

          <View style={styles.resultsButtons}>
            <TouchableOpacity
              style={[styles.tryAgainButton, { backgroundColor: levelColor }]}
              onPress={() => {
                setShowResults(false);
                resetExerciseStates(exercises.length);
                startExercise(correctionMode);
              }}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.backToBrowseButton, { borderColor: levelColor }]}
              onPress={() => setViewMode("browse")}
            >
              <Text
                style={[styles.backToBrowseButtonText, { color: levelColor }]}
              >
                Back to Browse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  // Affichage de l'écran de chargement
  if (!exercisesData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercises...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Error Correction</Text>
      </View>

      {viewMode === "browse" && renderBrowseMode()}
      {viewMode === "exercise" && !showResults && renderExerciseMode()}
      {(viewMode === "exercise" && showResults) || viewMode === "results"
        ? renderResultsMode()
        : null}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
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
  // Browse mode styles
  browseContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  browseContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoriesListContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 10,
    backgroundColor: "white",
  },
  selectedCategoryButton: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  exerciseModesContainer: {
    marginBottom: 24,
  },
  exerciseModesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  modeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  modeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  modeIcon: {
    fontSize: 24,
  },
  modeDetails: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  categoryDescription: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  categoryDescriptionText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseCount: {
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
  },
  // Exercise mode styles
  exerciseContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  exerciseProgress: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
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
  exerciseScrollView: {
    flex: 1,
  },
  exerciseContent: {
    padding: 16,
    paddingBottom: 30,
  },
  exerciseCard: {
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
  exerciseTypeLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  originalTextContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalTextLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  originalText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  correctionInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#334155",
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
    lineHeight: 24,
  },
  correctInput: {
    borderColor: "#10b981",
    backgroundColor: "#f0fdf4",
  },
  incorrectInput: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  identifyContainer: {
    marginBottom: 16,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
  },
  word: {
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedErrorWord: {
    borderWidth: 1,
  },
  highlightedErrorWord: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  wordText: {
    fontSize: 16,
    color: "#334155",
  },
  highlightedErrorWordText: {
    color: "#ef4444",
  },
  identifyInstructions: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 12,
    textAlign: "center",
  },
  multipleChoiceContainer: {
    marginBottom: 16,
  },
  choicesLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 12,
  },
  choices: {
    marginBottom: 16,
  },
  choiceOption: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedChoiceOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctChoiceOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  incorrectChoiceOption: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  choiceOptionText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  correctChoiceText: {
    color: "#10b981",
    fontWeight: "500",
  },
  incorrectChoiceText: {
    color: "#ef4444",
    fontWeight: "500",
  },
  hintButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 8,
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  hintContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 20,
  },
  feedbackContainer: {
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  correctFeedback: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#10b981",
  },
  incorrectFeedback: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  correctSolutionContainer: {
    marginBottom: 12,
  },
  correctSolutionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 4,
  },
  correctSolutionText: {
    fontSize: 15,
    color: "#10b981",
    fontWeight: "500",
  },
  explanationText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  exerciseActions: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  checkButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  exitButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  emptyExerciseContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  emptyExerciseText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  // Results mode styles
  resultsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  resultsContent: {
    padding: 16,
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
    lineHeight: 24,
  },
  exercisesReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  reviewItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewItemNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  reviewStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctStatusBadge: {
    backgroundColor: "#10b981",
  },
  incorrectStatusBadge: {
    backgroundColor: "#ef4444",
  },
  reviewStatusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  reviewItemText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
  },
  reviewItemSolution: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 8,
  },
  reviewItemExplanation: {
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
    lineHeight: 18,
  },
  resultsButtons: {
    marginTop: 10,
  },
  tryAgainButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  tryAgainButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  backToBrowseButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  backToBrowseButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ErrorCorrectionExercise;
