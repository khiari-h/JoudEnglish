import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import des composants modes
import BrowseMode from "./components/BrowseMode";
import ExerciseMode from "./components/ExerciseMode";
import ResultsMode from "./components/ResultsMode";

// Import des utilitaires
import { getLevelColor } from "./utils/levelUtils";

// Import des données d'exercices par niveau
import errorsA1Data from "../../../data/exercises/errorCorrection/errorCorrectionA1";
import errorsA2Data from "../../../data/exercises/errorCorrection/errorCorrectionA2";
import errorsB1Data from "../../../data/exercises/errorCorrection/errorCorrectionB1";
import errorsB2Data from "../../../data/exercises/errorCorrection/errorCorrectionB2";
import errorsC1Data from "../../../data/exercises/errorCorrection/errorCorrectionC1";
import errorsC2Data from "../../../data/exercises/errorCorrection/errorCorrectionC2";

// Import des styles
import styles from "./style";
import Button from "../../../components/ui/Button";

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

  // Récupération des couleurs en fonction du niveau
  const levelColor = getLevelColor(level);

  // Récupère les données d'exercices en fonction du niveau
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

    // Mettre à jour le score et animer le retour
    if (isCorrectAnswer) {
      setScore((prevScore) => prevScore + 1);
      // Animation pour une réponse correcte sera gérée par animationUtils
    } else {
      // Animation pour une réponse incorrecte sera gérée par animationUtils
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
        <Button
          icon="chevron-left"
          variant="text"
          size="small"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.headerTitle}>Error Correction</Text>
      </View>

      {viewMode === "browse" && (
        <BrowseMode
          exercisesData={exercisesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          exercises={exercises}
          startExercise={startExercise}
          levelColor={levelColor}
        />
      )}
      
      {viewMode === "exercise" && !showResults && (
        <ExerciseMode
          exercises={exercises}
          currentExerciseIndex={currentExerciseIndex}
          userCorrection={userCorrection}
          setUserCorrection={setUserCorrection}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          correctionMode={correctionMode}
          selectedErrorIndices={selectedErrorIndices}
          handleWordPress={handleWordPress}
          selectedChoiceIndex={selectedChoiceIndex}
          handleChoiceSelect={handleChoiceSelect}
          showHint={showHint}
          setShowHint={setShowHint}
          highlightedErrors={highlightedErrors}
          checkCorrection={checkCorrection}
          goToNextExercise={goToNextExercise}
          setViewMode={setViewMode}
          levelColor={levelColor}
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
        />
      )}
      
      {(viewMode === "exercise" && showResults) || viewMode === "results" ? (
        <ResultsMode
          exercises={exercises}
          userAttempts={userAttempts}
          score={score}
          setShowResults={setShowResults}
          resetExerciseStates={resetExerciseStates}
          startExercise={startExercise}
          correctionMode={correctionMode}
          setViewMode={setViewMode}
          levelColor={levelColor}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default ErrorCorrectionExercise;