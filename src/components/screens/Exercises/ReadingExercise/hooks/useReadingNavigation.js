import { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigationControls } from '../common';

/**
 * Hook personnalisé pour gérer la navigation dans les exercices de lecture
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {Animated.Value} params.fadeAnim - Valeur d'animation pour fondu
 * @param {Animated.Value} params.slideAnim - Valeur d'animation pour slide
 * @param {Object} params.scrollViewRef - Référence au ScrollView principal
 * @param {Object} params.textsScrollViewRef - Référence au ScrollView des textes
 * @param {number} params.selectedExerciseIndex - Index de l'exercice sélectionné
 * @param {number} params.currentExerciseIndex - Index de la question actuelle
 * @param {Function} params.setCurrentExerciseIndex - Fonction pour définir l'index de la question
 * @param {Array} params.allExercises - Liste des exercices
 * @param {Object} params.completedQuestions - Questions complétées
 * @param {boolean} params.isCorrectAnswer - Si la réponse actuelle est correcte
 * @returns {Object} - Fonctions de navigation
 */
const useReadingNavigation = ({
  navigation,
  fadeAnim,
  slideAnim,
  scrollViewRef,
  textsScrollViewRef,
  selectedExerciseIndex,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  allExercises,
  completedQuestions,
  isCorrectAnswer
}) => {
  // Animation de transition entre questions
  const animateQuestionTransition = useCallback(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
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
    
    // Scroll to top
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [fadeAnim, slideAnim, scrollViewRef]);
  
  // Fonction pour gérer la fin d'un texte (toutes les questions)
  const handleExerciseComplete = useCallback(() => {
    // Ici on pourrait gérer ce qui se passe quand on a terminé toutes les questions
    // Par exemple, afficher des résultats, ou passer au texte suivant
    // Pour l'instant, on ne fait rien de spécial
  }, []);
  
  // Utiliser le hook générique pour la navigation de base
  const {
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastItem
  } = useNavigationControls({
    navigation,
    currentIndex: currentExerciseIndex,
    totalItems: allExercises[selectedExerciseIndex]?.questions?.length || 0,
    setCurrentIndex: setCurrentExerciseIndex,
    resetState: animateQuestionTransition,
    onComplete: handleExerciseComplete
  });
  
  // Changer de texte sélectionné
  const handleTextChange = useCallback((index) => {
    if (index !== selectedExerciseIndex && textsScrollViewRef.current) {
      textsScrollViewRef.current.scrollTo({
        x: index * 110, // Approximation de la largeur de chaque bouton
        animated: true,
      });
      
      // Réinitialiser animations
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      return index;
    }
    return selectedExerciseIndex;
  }, [selectedExerciseIndex, textsScrollViewRef, fadeAnim, slideAnim]);
  
  // Sélectionner une question spécifique
  const handleQuestionSelect = useCallback((index) => {
    if (index !== currentExerciseIndex) {
      // Réinitialiser animations
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      // Animations pour la nouvelle question
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
      
      // Scroll to top
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
      
      return index;
    }
    return currentExerciseIndex;
  }, [currentExerciseIndex, fadeAnim, slideAnim, scrollViewRef]);

  return {
    handleGoBack,
    handleTextChange,
    handleQuestionSelect,
    handleNextQuestion: goToNext,
    handlePreviousQuestion: goToPrevious,
    animateQuestionTransition,
    canGoPrevious: canGoToPrevious,
    isLastQuestion: isLastItem
  };
};

export default useReadingNavigation;