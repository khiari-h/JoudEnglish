import { useCallback } from 'react';

/**
 * Hook personnalisé pour gérer la navigation entre exercices et règles
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
  // Passer à l'exercice suivant
  const goToNextExercise = useCallback(() => {
    const currentRule = grammarData[selectedRuleIndex];
    const isLastExercise = currentExerciseIndex === (currentRule?.exercises?.length - 1);
    
    if (isLastExercise) {
      if (selectedRuleIndex < grammarData.length - 1) {
        // Passer à la règle suivante
        setSelectedRuleIndex(selectedRuleIndex + 1);
        resetExercise();
        setCurrentExerciseIndex(0);
      } else {
        // Toutes les règles sont terminées
        navigation.goBack();
      }
    } else {
      resetExercise();
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  }, [
    currentExerciseIndex,
    selectedRuleIndex,
    grammarData,
    navigation,
    resetExercise,
    setCurrentExerciseIndex,
    setSelectedRuleIndex,
  ]);

  // Revenir à l'exercice précédent
  const goToPreviousExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      resetExercise();
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }, [currentExerciseIndex, resetExercise, setCurrentExerciseIndex]);

  // Changer de règle grammaticale
  const handleRuleChange = useCallback((index) => {
    if (index !== selectedRuleIndex) {
      setSelectedRuleIndex(index);
      resetExercise();
      setCurrentExerciseIndex(0);
    }
  }, [selectedRuleIndex, resetExercise, setCurrentExerciseIndex, setSelectedRuleIndex]);

  // Navigation de retour à l'écran précédent
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    goToNextExercise,
    goToPreviousExercise,
    handleRuleChange,
    handleGoBack,
  };
};

export default useExerciseNavigation;