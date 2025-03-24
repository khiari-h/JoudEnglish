import { useCallback } from 'react';
import { Animated } from 'react-native';

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
  allExercises,
  completedQuestions,
  isCorrectAnswer
}) => {
  // Retour à l'écran précédent
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
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
  }, [fadeAnim, slideAnim]);
  
  // Aller à la question suivante
  const handleNextQuestion = useCallback(() => {
    const currentExercise = allExercises[selectedExerciseIndex];
    if (!currentExercise) return;
    
    // Vérifier si c'est la dernière question
    const isLastQuestion = currentExerciseIndex >= currentExercise.questions.length - 1;
    
    if (!isLastQuestion) {
      // Aller à la question suivante
      animateQuestionTransition();
      return currentExerciseIndex + 1;
    } else {
      // Comportement de fin d'exercice
      // Note: La logique complète de fin d'exercice est gérée par le composant
      return currentExerciseIndex;
    }
  }, [allExercises, selectedExerciseIndex, currentExerciseIndex, animateQuestionTransition]);
  
  // Aller à la question précédente
  const handlePreviousQuestion = useCallback(() => {
    if (currentExerciseIndex > 0) {
      // Animer la transition
      animateQuestionTransition();
      return currentExerciseIndex - 1;
    }
    return currentExerciseIndex;
  }, [currentExerciseIndex, animateQuestionTransition]);
  
  // Vérifier si on peut aller à la question précédente
  const canGoPrevious = currentExerciseIndex > 0;
  
  // Vérifier si c'est la dernière question
  const isLastQuestion = allExercises[selectedExerciseIndex]?.questions.length - 1 === currentExerciseIndex;
  
  return {
    handleGoBack,
    handleTextChange,
    handleQuestionSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    animateQuestionTransition,
    canGoPrevious,
    isLastQuestion
  };
};

export default useReadingNavigation;