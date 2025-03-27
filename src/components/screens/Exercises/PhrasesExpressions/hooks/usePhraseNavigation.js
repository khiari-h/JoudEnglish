import { useCallback } from 'react';
import { useNavigationControls } from '../common';

/**
 * Hook pour gérer la navigation entre les phrases et expressions
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {number} params.selectedPhraseIndex - Index de la phrase sélectionnée
 * @param {Function} params.setSelectedPhraseIndex - Fonction pour changer l'index
 * @param {Array} params.currentPhrases - Liste des phrases actuelles
 * @param {Function} params.setSelectedPhrase - Fonction pour définir la phrase sélectionnée
 * @returns {Object} - Fonctions de navigation
 */
const usePhraseNavigation = ({
  navigation,
  selectedPhraseIndex,
  setSelectedPhraseIndex,
  currentPhrases,
  setSelectedPhrase,
}) => {
  // Utiliser le hook générique pour la navigation de base
  const {
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious
  } = useNavigationControls({
    navigation,
    currentIndex: selectedPhraseIndex,
    totalItems: currentPhrases.length,
    setCurrentIndex: setSelectedPhraseIndex
  });

  // Fonctions spécifiques pour gérer les détails des phrases
  const openPhraseDetails = useCallback((phrase) => {
    setSelectedPhrase(phrase);
  }, [setSelectedPhrase]);

  const closePhraseDetails = useCallback(() => {
    setSelectedPhrase(null);
  }, [setSelectedPhrase]);

  return {
    handleGoBack,
    goToNextPhrase: goToNext,
    goToPreviousPhrase: goToPrevious,
    canGoToNext,
    canGoToPrevious,
    openPhraseDetails,
    closePhraseDetails
  };
};

export default usePhraseNavigation;