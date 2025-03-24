import { useCallback } from 'react';

/**
 * Hook personnalisé pour gérer la navigation entre phrases et expressions
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation
 * @param {number} params.selectedPhraseIndex - Index de la phrase sélectionnée
 * @param {Function} params.setSelectedPhraseIndex - Fonction pour définir l'index
 * @param {Array} params.currentPhrases - Liste des phrases filtrées par catégorie
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
  // Retour à l'écran précédent
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  
  // Passer à la phrase précédente
  const goToPreviousPhrase = useCallback(() => {
    if (selectedPhraseIndex > 0) {
      setSelectedPhraseIndex(selectedPhraseIndex - 1);
    }
  }, [selectedPhraseIndex, setSelectedPhraseIndex]);
  
  // Passer à la phrase suivante
  const goToNextPhrase = useCallback(() => {
    if (selectedPhraseIndex < currentPhrases.length - 1) {
      setSelectedPhraseIndex(selectedPhraseIndex + 1);
    }
  }, [selectedPhraseIndex, currentPhrases, setSelectedPhraseIndex]);
  
  // Vérifier si on peut aller à la phrase précédente
  const canGoToPrevious = selectedPhraseIndex > 0;
  
  // Vérifier si on peut aller à la phrase suivante
  const canGoToNext = selectedPhraseIndex < currentPhrases.length - 1;
  
  // Ouvrir le modal de détails
  const openPhraseDetails = useCallback((phrase) => {
    setSelectedPhrase(phrase);
  }, [setSelectedPhrase]);
  
  // Fermer le modal de détails
  const closePhraseDetails = useCallback(() => {
    setSelectedPhrase(null);
  }, [setSelectedPhrase]);
  
  return {
    handleGoBack,
    goToPreviousPhrase,
    goToNextPhrase,
    canGoToPrevious,
    canGoToNext,
    openPhraseDetails,
    closePhraseDetails,
  };
};

export default usePhraseNavigation;