import { useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * Hook personnalisé pour gérer la navigation et les transitions dans l'évaluation
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {Animated.Value} params.fadeAnim - Valeur d'animation pour les effets de fondu
 * @param {string} params.currentSection - Section actuelle
 * @param {number} params.currentQuestionIndex - Index de la question actuelle
 * @param {boolean} params.showFeedback - Indique si le feedback est visible
 * @param {number|null} params.selectedAnswer - Index de la réponse sélectionnée
 * @returns {Object} - Fonctions de navigation et d'animation
 */
const useAssessmentNavigation = ({
  navigation,
  fadeAnim,
  currentSection,
  currentQuestionIndex,
  showFeedback,
  selectedAnswer,
}) => {
  // Retour à l'écran précédent
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Animation pour le feedback
  const animateFeedback = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  // Réessayer la question actuelle (réinitialiser l'état)
  const tryAgain = useCallback(() => {
    return {
      type: 'TRY_AGAIN',
      payload: {
        section: currentSection,
        questionIndex: currentQuestionIndex,
      },
    };
  }, [currentSection, currentQuestionIndex]);

  // Passer à la question suivante
  const goToNextQuestion = useCallback(() => {
    return {
      type: 'NEXT_QUESTION',
      payload: {
        section: currentSection,
        questionIndex: currentQuestionIndex,
      },
    };
  }, [currentSection, currentQuestionIndex]);

  // Vérifier si une action est possible
  const canCheckAnswer = useCallback(() => {
    return selectedAnswer !== null && !showFeedback;
  }, [selectedAnswer, showFeedback]);

  // Vérifier si on peut passer à la question suivante
  const canGoToNext = useCallback(() => {
    return showFeedback;
  }, [showFeedback]);

  return {
    handleGoBack,
    animateFeedback,
    tryAgain,
    goToNextQuestion,
    canCheckAnswer,
    canGoToNext,
  };
};

export default useAssessmentNavigation;