import { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigationControls } from '../common';

/**
 * Hook personnalisé pour gérer la navigation et les transitions dans l'évaluation
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {Animated.Value} params.fadeAnim - Valeur d'animation pour les effets de fondu
 * @param {string} params.currentSection - Section actuelle
 * @param {number} params.currentQuestionIndex - Index de la question actuelle
 * @param {number} params.totalQuestions - Nombre total de questions dans la section actuelle
 * @param {Function} params.setCurrentQuestionIndex - Fonction pour mettre à jour l'index
 * @param {boolean} params.showFeedback - Indique si le feedback est visible
 * @param {number|null} params.selectedAnswer - Index de la réponse sélectionnée
 * @param {Function} params.resetQuestionState - Fonction pour réinitialiser l'état de la question
 * @returns {Object} - Fonctions de navigation et d'animation
 */
const useAssessmentNavigation = ({
  navigation,
  fadeAnim,
  currentSection,
  currentQuestionIndex,
  totalQuestions,
  setCurrentQuestionIndex,
  showFeedback,
  selectedAnswer,
  resetQuestionState = () => {}
}) => {
  // Fonction pour passer à la section suivante quand toutes les questions sont terminées
  const handleSectionCompletion = useCallback(() => {
    // Logique pour passer à la section suivante ou terminer l'évaluation
    // Cette logique dépendra de votre implémentation spécifique
    // Pour l'instant, on retourne simplement à l'écran précédent
    navigation.goBack();
  }, [navigation]);

  // Utiliser le hook générique pour la navigation de base
  const {
    handleGoBack: genericHandleGoBack,
    canGoToNext: genericCanGoToNext,
    isLastItem
  } = useNavigationControls({
    navigation,
    currentIndex: currentQuestionIndex,
    totalItems: totalQuestions,
    setCurrentIndex: setCurrentQuestionIndex,
    resetState: resetQuestionState,
    onComplete: handleSectionCompletion
  });

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
    handleGoBack: genericHandleGoBack,
    animateFeedback,
    tryAgain,
    goToNextQuestion,
    canCheckAnswer,
    canGoToNext,
    isLastQuestion: isLastItem
  };
};

export default useAssessmentNavigation;