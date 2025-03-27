import { useCallback } from 'react';
import { useNavigationControls } from '../common';

/**
 * Hook personnalisé pour gérer la navigation entre exercices et règles de grammaire
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {number} params.currentExerciseIndex - Index de l'exercice actuel
 * @param {number} params.selectedRuleIndex - Index de la règle sélectionnée
 * @param {Array} params.grammarData - Données de grammaire
 * @param {Function} params.setCurrentExerciseIndex - Fonction pour définir l'index de l'exercice
 * @param {Function} params.setSelectedRuleIndex - Fonction pour définir l'index de la règle
 * @param {Function} params.resetExercise - Fonction pour réinitialiser l'exercice
 * @returns {Object} Fonctions de navigation
 */
export const useExerciseNavigation = ({
  navigation,
  currentExerciseIndex,
  selectedRuleIndex,
  grammarData,
  setCurrentExerciseIndex,
  setSelectedRuleIndex,
  resetExercise,
}) => {
  // Définir une fonction pour passer à la règle suivante quand tous les exercices d'une règle sont terminés
  const handleRuleCompletion = useCallback(() => {
    if (selectedRuleIndex < grammarData.length - 1) {
      // Passer à la règle suivante
      setSelectedRuleIndex(selectedRuleIndex + 1);
      resetExercise();
      setCurrentExerciseIndex(0);
    } else {
      // Toutes les règles sont terminées
      navigation.goBack();
    }
  }, [selectedRuleIndex, grammarData, navigation, resetExercise, setCurrentExerciseIndex, setSelectedRuleIndex]);

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
    totalItems: grammarData[selectedRuleIndex]?.exercises?.length || 0,
    setCurrentIndex: setCurrentExerciseIndex,
    resetState: resetExercise,
    onComplete: handleRuleCompletion
  });

  // Changer de règle grammaticale (fonctionnalité spécifique à ce type d'exercice)
  const handleRuleChange = useCallback((index) => {
    if (index !== selectedRuleIndex) {
      setSelectedRuleIndex(index);
      resetExercise();
      setCurrentExerciseIndex(0);
    }
  }, [selectedRuleIndex, resetExercise, setCurrentExerciseIndex, setSelectedRuleIndex]);

  return {
    goToNextExercise: goToNext,
    goToPreviousExercise: goToPrevious,
    handleRuleChange,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastExercise: isLastItem
  };
};

export default useExerciseNavigation;