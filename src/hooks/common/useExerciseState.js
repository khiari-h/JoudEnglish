// src/hooks/common/useExerciseState.js
import { useState, useCallback, useMemo } from "react";
import { useNavigationControls } from "./index";
import useProgress from "../useProgress";
import { getLevelColor } from "../../utils/getLevelColor";

/**
 * Hook générique pour gérer l'état des exercices
 *
 * @param {Object} params - Paramètres du hook
 * @param {string} params.type - Type d'exercice (grammar, vocabulary, etc.)
 * @param {string} params.level - Niveau (A1, A2, B1, etc.)
 * @param {Array} params.exercises - Données des exercices
 * @param {Object} params.navigation - Objet de navigation
 * @param {Function} params.checkAnswerFn - Fonction personnalisée pour vérifier la réponse
 * @param {boolean} params.autoSaveProgress - Enregistrer automatiquement la progression
 * @returns {Object} État et fonctions de l'exercice
 */
const useExerciseState = ({
  type,
  level,
  exercises = [],
  navigation,
  checkAnswerFn,
  autoSaveProgress = true,
}) => {
  // États de base
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);

  // Hook de progression
  const { updateProgress } = useProgress();

  // Couleur du niveau
  const levelColor = useMemo(() => getLevelColor(level), [level]);

  // Données de l'exercice actuel
  const currentExercise = useMemo(
    () => exercises[currentIndex] || null,
    [exercises, currentIndex]
  );

  // Calcul de la progression
  const progress = useMemo(() => {
    return exercises.length > 0
      ? ((currentIndex + 1) / exercises.length) * 100
      : 0;
  }, [currentIndex, exercises]);

  // Réinitialiser l'état pour un nouvel exercice
  const resetExerciseState = useCallback(() => {
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts(0);
    setUserAnswer(null);
  }, []);

  // Navigation entre les exercices
  const {
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastItem: isLastExercise,
  } = useNavigationControls({
    navigation,
    currentIndex,
    totalItems: exercises.length,
    setCurrentIndex,
    resetState: resetExerciseState,
  });

  // Vérifier la réponse
  const checkAnswer = useCallback(() => {
    // Incrémenter le nombre de tentatives
    setAttempts((prev) => prev + 1);

    // Vérifier la réponse avec la fonction personnalisée ou la fonction par défaut
    const result = checkAnswerFn
      ? checkAnswerFn(userAnswer, currentExercise)
      : userAnswer === currentExercise?.correctAnswer;

    setIsCorrect(result);
    setShowFeedback(true);

    // Si la réponse est correcte, ajouter à la liste des items complétés
    if (result && !completedItems.includes(currentIndex)) {
      const newCompletedItems = [...completedItems, currentIndex];
      setCompletedItems(newCompletedItems);

      // Enregistrer la progression si activé
      if (autoSaveProgress) {
        updateProgress(
          `${type}_${level.toLowerCase()}`,
          type,
          level,
          newCompletedItems.length,
          exercises.length
        );
      }
    }

    return result;
  }, [
    userAnswer,
    currentExercise,
    checkAnswerFn,
    completedItems,
    currentIndex,
    type,
    level,
    exercises.length,
    autoSaveProgress,
    updateProgress,
  ]);

  // Réessayer la question actuelle
  const retryExercise = useCallback(() => {
    setShowFeedback(false);
    setUserAnswer(null);
  }, []);

  // Vérifier si on peut vérifier la réponse
  const canCheckAnswer = useCallback(() => {
    return userAnswer !== null && !showFeedback;
  }, [userAnswer, showFeedback]);

  return {
    // États
    currentIndex,
    currentExercise,
    showFeedback,
    isCorrect,
    attempts,
    userAnswer,
    completedItems,
    progress,
    levelColor,
    isLastExercise,

    // Actions
    setCurrentIndex,
    setUserAnswer,
    checkAnswer,
    retryExercise,
    resetExerciseState,

    // Navigation
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,

    // Autres
    canCheckAnswer,
  };
};

export default useExerciseState;
