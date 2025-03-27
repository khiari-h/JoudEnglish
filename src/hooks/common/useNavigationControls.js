import { useCallback } from 'react';

/**
 * Hook générique pour gérer la navigation entre les éléments d'un exercice
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.navigation - Objet de navigation React Navigation
 * @param {number} params.currentIndex - Index actuel
 * @param {number} params.totalItems - Nombre total d'éléments
 * @param {Function} params.setCurrentIndex - Fonction pour changer l'index courant
 * @param {Function} params.resetState - Fonction pour réinitialiser l'état (optionnel)
 * @param {Function} params.onComplete - Fonction appelée quand tous les éléments sont terminés (optionnel)
 * @returns {Object} Fonctions et états de navigation
 */
const useNavigationControls = ({
  navigation,
  currentIndex,
  totalItems,
  setCurrentIndex,
  resetState = () => {},
  onComplete = () => navigation.goBack()
}) => {
  // Navigation vers l'élément suivant
  const goToNext = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      // Si ce n'est pas le dernier élément, passer au suivant
      if (resetState) resetState();
      setCurrentIndex(currentIndex + 1);
    } else {
      // Si c'est le dernier élément, appeler onComplete
      onComplete();
    }
  }, [currentIndex, totalItems, resetState, setCurrentIndex, onComplete]);

  // Navigation vers l'élément précédent
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      if (resetState) resetState();
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, resetState, setCurrentIndex]);

  // Gérer le retour à l'écran précédent
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // États dérivés
  const canGoToNext = currentIndex < totalItems - 1;
  const canGoToPrevious = currentIndex > 0;
  const isLastItem = currentIndex === totalItems - 1;

  return {
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastItem
  };
};

export default useNavigationControls;