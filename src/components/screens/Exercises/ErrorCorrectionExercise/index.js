// src/components/screens/Exercises/ErrorCorrectionExercise/index.js
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import BaseExercise from "../../../common/BaseExercise";
import { NavigationButton, IconButton } from '../../../common/Navigation';
import { AnimatedFeedback, ExerciseFeedback } from '../../../common/Feedback';

// Import des composants
import BrowseMode from "./components/BrowseMode";
import ExerciseMode from "./components/ExerciseMode";
import ResultsMode from "./components/ResultsMode";

// Import des hooks personnalisés
import useProgress from "../../../../hooks/useProgress"; // Ajout du hook de progression
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes"; // Ajout des constantes de types d'exercices

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de correction d'erreurs
 */
const ErrorCorrectionExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  const [viewMode, setViewMode] = useState("browse"); // 'browse', 'exercise', 'results'
  const [exercisesData, setExercisesData] = useState({ categories: [] });
  const [correctionMode, setCorrectionMode] = useState("full"); // 'full', 'identify', 'multiple_choice'
  const [userCorrection, setUserCorrection] = useState("");
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState([]);

  // Charger les données d'exercice
  useEffect(() => {
    const data = getErrorCorrectionDataByLevel(level);
    setExercisesData(data);
    if (data.categories && data.categories.length > 0) {
      setSelectedCategory(data.categories[0].id);
    }
  }, [level]);

  // Filtrer les exercices par catégorie
  const exercises = exercisesData.categories
    ? exercisesData.categories.find((c) => c.id === selectedCategory)
        ?.exercises || []
    : [];

  // Fonction personnalisée pour vérifier les réponses
  const checkErrorCorrection = (userAnswer, exercise) => {
    if (correctionMode === "full") {
      // Normaliser et comparer les corrections
      return (
        userAnswer.trim().toLowerCase() === exercise.correctText.toLowerCase()
      );
    } else if (correctionMode === "identify") {
      // Vérifier si les erreurs identifiées correspondent
      const errorIndices = exercise.errorIndices || [];
      return (
        userAnswer.length === errorIndices.length &&
        userAnswer.every((index) => errorIndices.includes(index))
      );
    } else if (correctionMode === "multiple_choice") {
      // Vérifier le choix sélectionné
      return userAnswer === exercise.correctChoiceIndex;
    }
    return false;
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex,
    setCurrentIndex,
    currentExercise,
    showFeedback,
    isCorrect,
    attempts,
    userAnswer,
    setUserAnswer,
    progress,
    levelColor,
    isLastExercise,
    checkAnswer,
    retryExercise,
    resetExerciseState,
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    canCheckAnswer,
    completedItems,
  } = useExerciseState({
    type: EXERCISE_TYPES.ERROR_CORRECTION,
    level,
    exercises,
    navigation,
    checkAnswerFn: checkErrorCorrection,
    autoSaveProgress: false, // On va gérer manuellement la progression
  });

  // Mise à jour de la réponse utilisateur en fonction du mode
  useEffect(() => {
    if (correctionMode === "full") {
      setUserAnswer(userCorrection);
    } else if (correctionMode === "identify") {
    } else if (correctionMode === "multiple_choice") {
      setUserAnswer(selectedChoiceIndex);
    }
  }, [
    correctionMode,
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    setUserAnswer,
  ]);

  // Mise à jour de la progression quand une réponse est correcte
  useEffect(() => {
    if (viewMode === "exercise" && showFeedback && isCorrect) {
      // Calculer la progression
      const completedCount = completedItems.length;
      const totalExercises = exercises.length;

      // Identifier cette catégorie spécifique pour la progression
      const categoryId = selectedCategory || "default";

      // Mettre à jour la progression pour cette catégorie spécifique
      updateProgress(
        `error_correction_${level.toLowerCase()}_${categoryId}`,
        EXERCISE_TYPES.ERROR_CORRECTION,
        level,
        completedCount,
        totalExercises
      );

      // Calculer la progression globale pour la correction d'erreurs
      let totalAllExercises = 0;
      let completedAllExercises = 0;

      exercisesData.categories.forEach((category) => {
        if (category.exercises) {
          const catExercises = category.exercises.length;
          totalAllExercises += catExercises;

          // Si c'est la catégorie actuelle, utiliser completedItems
          if (category.id === categoryId) {
            completedAllExercises += completedCount;
          } else {
            // Ici, vous pourriez ajouter une logique pour récupérer les exercices
            // complétés des autres catégories depuis un stockage persistant
            completedAllExercises += 0; // Pour l'instant, supposons 0
          }
        }
      });

      // Mettre à jour la progression globale
      updateProgress(
        `error_correction_${level.toLowerCase()}`,
        EXERCISE_TYPES.ERROR_CORRECTION,
        level,
        completedAllExercises,
        totalAllExercises
      );
    }
  }, [
    viewMode,
    showFeedback,
    isCorrect,
    completedItems.length,
    exercises.length,
    level,
    selectedCategory,
    exercisesData.categories,
    updateProgress,
  ]);

  // Démarrer un exercice
  const startExercise = (mode) => {
    setCorrectionMode(mode);
    setViewMode("exercise");
    setCurrentIndex(0);
    resetExerciseState();
    setUserCorrection("");
    setSelectedErrorIndices([]);
    setSelectedChoiceIndex(null);
    setShowHint(false);
  };

  // Gérer le clic sur un mot (pour l'identification d'erreurs)
  const handleWordPress = (index) => {
    if (showFeedback) return;

    const newIndices = [...selectedErrorIndices];
    const indexPosition = newIndices.indexOf(index);

    if (indexPosition === -1) {
      newIndices.push(index);
    } else {
      newIndices.splice(indexPosition, 1);
    }
    setSelectedErrorIndices(newIndices);
  };

  // Aller à l'exercice suivant ou afficher les résultats
  const handleNext = () => {
    if (isLastExercise) {
      // Finaliser et afficher les résultats
      setResults([
        ...completedItems.map((index) => ({
          exercise: exercises[index],
          isCorrect: true,
        })),
      ]);
      // Mettre à jour une dernière fois la progression
      updateProgress(
        `error_correction_${level.toLowerCase()}_${
          selectedCategory || "default"
        }`,
        EXERCISE_TYPES.ERROR_CORRECTION,
        level,
        completedItems.length,
        exercises.length
      );
      setViewMode("results");
    } else {
      goToNext();
      setUserCorrection("");
      setSelectedErrorIndices([]);
      setSelectedChoiceIndex(null);
      setShowHint(false);
    }
  };

  const renderContent = () => {
    if (viewMode === "browse") {
      return (
        <BrowseMode
          exercisesData={exercisesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          exercises={exercises}
          startExercise={startExercise}
          levelColor={levelColor}
        />
      );
    } else if (viewMode === "exercise") {
      return (
        <ExerciseMode
          exercises={exercises}
          currentExerciseIndex={currentIndex}
          userCorrection={userCorrection}
          setUserCorrection={setUserCorrection}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          correctionMode={correctionMode}
          selectedErrorIndices={selectedErrorIndices}
          handleWordPress={handleWordPress}
          selectedChoiceIndex={selectedChoiceIndex}
          handleChoiceSelect={setSelectedChoiceIndex}
          showHint={showHint}
          setShowHint={setShowHint}
          checkCorrection={checkAnswer}
          goToNextExercise={handleNext}
          setViewMode={setViewMode}
          levelColor={levelColor}
        />
      );
    } else {
      return (
        <ResultsMode
          results={results}
          totalExercises={exercises.length}
          levelColor={levelColor}
          onStartOver={() => setViewMode("browse")}
        />
      );
    }
  };

  return (
    <BaseExercise
      title="Error Correction"
      level={level}
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
    >
      {renderContent()}
    </BaseExercise>
  );
};

export default ErrorCorrectionExercise;
