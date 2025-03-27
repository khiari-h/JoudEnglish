import { useCallback } from 'react';
import { useNavigationControls } from '../common';

/**
 * Hook pour gérer la navigation entre les jeux de mots
 * 
 * @param {number} currentGameIndex - Index du jeu actuel
 * @param {Function} setCurrentGameIndex - Fonction pour définir l'index du jeu
 * @param {number} totalGames - Nombre total de jeux
 * @param {Function} setShowFeedback - Fonction pour afficher/masquer le feedback
 * @param {Function} setShowResults - Fonction pour afficher/masquer les résultats
 * @param {Function} resetGameState - Fonction pour réinitialiser l'état du jeu
 * @returns {Object} Fonctions de navigation
 */
const useGameNavigation = ({
  navigation,
  currentGameIndex,
  setCurrentGameIndex,
  totalGames,
  setShowFeedback,
  setShowResults,
  resetGameState
}) => {
  // Fonction pour gérer la fin de tous les jeux
  const handleGamesComplete = useCallback(() => {
    setShowResults(true);
  }, [setShowResults]);

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
    currentIndex: currentGameIndex,
    totalItems: totalGames,
    setCurrentIndex: setCurrentGameIndex,
    resetState: resetGameState,
    onComplete: handleGamesComplete
  });

  // Réinitialiser tous les jeux (fonctionnalité spécifique)
  const resetAllGames = useCallback(() => {
    setCurrentGameIndex(0);
    setShowFeedback(false);
    setShowResults(false);
    resetGameState();
  }, [setCurrentGameIndex, setShowFeedback, setShowResults, resetGameState]);

  return {
    goToNextGame: goToNext,
    goToPreviousGame: goToPrevious,
    resetAllGames,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastGame: isLastItem
  };
};

export default useGameNavigation;