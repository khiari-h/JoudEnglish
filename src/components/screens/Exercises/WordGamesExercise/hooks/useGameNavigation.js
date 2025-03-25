import { useCallback } from 'react';

/**
 * Hook pour gérer la navigation entre les jeux
 * @param {number} currentGameIndex - Index du jeu actuel
 * @param {Function} setCurrentGameIndex - Fonction pour mettre à jour l'index du jeu
 * @param {number} gamesLength - Nombre total de jeux
 * @param {Function} setShowFeedback - Fonction pour afficher/masquer le feedback
 * @param {Function} setShowResults - Fonction pour afficher/masquer les résultats
 * @param {Function} resetGameState - Fonction pour réinitialiser l'état du jeu actuel
 * @returns {Object} - Fonctions de navigation
 */
const useGameNavigation = (
  currentGameIndex,
  setCurrentGameIndex,
  gamesLength,
  setShowFeedback,
  setShowResults,
  resetGameState
) => {
  /**
   * Passe au jeu suivant
   */
  const goToNextGame = useCallback(() => {
    if (currentGameIndex < gamesLength - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
      setShowFeedback(false);
      if (resetGameState) {
        resetGameState();
      }
    } else {
      // Si c'est le dernier jeu, afficher les résultats
      setShowResults(true);
    }
  }, [currentGameIndex, gamesLength, setCurrentGameIndex, setShowFeedback, setShowResults, resetGameState]);

  /**
   * Revient au jeu précédent
   */
  const goToPreviousGame = useCallback(() => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(currentGameIndex - 1);
      setShowFeedback(false);
      if (resetGameState) {
        resetGameState();
      }
    }
  }, [currentGameIndex, setCurrentGameIndex, setShowFeedback, resetGameState]);

  /**
   * Réinitialise tous les jeux et revient au premier
   */
  const resetAllGames = useCallback(() => {
    setCurrentGameIndex(0);
    setShowFeedback(false);
    setShowResults(false);
    if (resetGameState) {
      resetGameState();
    }
  }, [setCurrentGameIndex, setShowFeedback, setShowResults, resetGameState]);

  return {
    goToNextGame,
    goToPreviousGame,
    resetAllGames
  };
};

export default useGameNavigation;