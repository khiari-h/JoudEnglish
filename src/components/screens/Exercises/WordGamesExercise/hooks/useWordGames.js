import { useState, useEffect, useCallback } from 'react';

// Importation des données de jeux
import wordGamesA1Data from "../../../../data/exercises/wordGames/wordGamesA1";
import wordGamesA2Data from "../../../../data/exercises/wordGames/wordGamesA2";
import wordGamesB1Data from "../../../../data/exercises/wordGames/wordGamesB1";
import wordGamesB2Data from "../../../../data/exercises/wordGames/wordGamesB2";
import wordGamesC1Data from "../../../../data/exercises/wordGames/wordGamesC1";
import wordGamesC2Data from "../../../../data/exercises/wordGames/wordGamesC2";

// Importation des hooks
import useGameTimer from './useGameTimer';
import useGameNavigation from './useGameNavigation';
import { getLevelColor } from '../utils/levelUtils';

/**
 * Hook principal pour gérer les jeux de mots
 * @param {string} level - Niveau de difficulté (A1, A2, etc.)
 * @param {Object} navigation - Objet de navigation React Navigation
 * @returns {Object} - État et fonctions pour les jeux de mots
 */
const useWordGames = (level, navigation) => {
  // États principaux
  const [games, setGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [gameResults, setGameResults] = useState([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [bounceAnim] = useState(new Animated.Value(1));

  // Récupérer la couleur du niveau
  const levelColor = getLevelColor(level);

  // Hook pour le timer
  const { timeLeft, isActive, startTimer, stopTimer, resetTimer } = useGameTimer(handleTimeUp);

  // Récupérer les données en fonction du niveau
  const getWordGamesData = useCallback((level) => {
    const dataMap = {
      A1: wordGamesA1Data,
      A2: wordGamesA2Data,
      B1: wordGamesB1Data,
      B2: wordGamesB2Data,
      C1: wordGamesC1Data,
      C2: wordGamesC2Data,
    };
    return dataMap[level] || wordGamesA1Data;
  }, []);

  // Initialiser les jeux selon le niveau
  useEffect(() => {
    const data = getWordGamesData(level);
    if (data && data.games) {
      setGames(data.games);
      initializeGameResults(data.games.length);
    }
  }, [level, getWordGamesData]);

  // Initialiser les résultats des jeux
  const initializeGameResults = useCallback((length) => {
    setGameResults(
      Array(length).fill({ score: 0, maxScore: 0, completed: false })
    );
  }, []);

  // Configurer le jeu actuel
  useEffect(() => {
    if (games.length > 0 && currentGameIndex < games.length) {
      const currentGame = games[currentGameIndex];
      
      // Réinitialiser les états
      setShowFeedback(false);
      setIsCorrect(false);
      
      // Configurer le timer si nécessaire
      if (currentGame.timeLimit) {
        startTimer(currentGame.timeLimit);
      } else {
        resetTimer();
      }
    }
  }, [games, currentGameIndex, startTimer, resetTimer]);

  // Fonction pour réinitialiser l'état des jeux
  const resetGameState = useCallback(() => {
    setShowFeedback(false);
    setIsCorrect(false);
    
    // Réinitialiser le timer si nécessaire pour le jeu actuel
    if (games[currentGameIndex]?.timeLimit) {
      startTimer(games[currentGameIndex].timeLimit);
    } else {
      resetTimer();
    }
  }, [games, currentGameIndex, startTimer, resetTimer]);

  // Obtenir les fonctions de navigation
  const { goToNextGame, goToPreviousGame, resetAllGames } = useGameNavigation(
    currentGameIndex,
    setCurrentGameIndex,
    games.length,
    setShowFeedback,
    setShowResults,
    resetGameState
  );

  // Gérer la fin du temps
  function handleTimeUp() {
    checkAnswer(true);
  }

  // Vérifier la réponse
  const checkAnswer = useCallback((isTimeUp = false) => {
    if (showFeedback) return;
    
    // Arrêter le timer
    stopTimer();
    
    // Calculer le score
    // Note: cette logique est simplifiée car la vérification spécifique
    // est gérée dans les hooks de chaque type de jeu
    setShowFeedback(true);
  }, [showFeedback, stopTimer]);

  // Mise à jour du score et des résultats
  const handleGameComplete = useCallback((isSuccessful, maxPossibleScore) => {
    stopTimer();
    
    const earnedScore = isSuccessful ? maxPossibleScore : 0;
    
    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore(prevScore => prevScore + earnedScore);
    }
    
    // Mettre à jour les résultats du jeu
    setGameResults(prevResults => {
      const newResults = [...prevResults];
      newResults[currentGameIndex] = {
        score: earnedScore,
        maxScore: maxPossibleScore,
        completed: true,
      };
      return newResults;
    });
    
    // Afficher le feedback
    setIsCorrect(isSuccessful);
    setShowFeedback(true);
  }, [currentGameIndex, stopTimer]);

  // Réinitialiser tous les jeux
  const resetGames = useCallback(() => {
    resetAllGames();
    setScore(0);
    initializeGameResults(games.length);
    
    // Réinitialiser le timer pour le premier jeu
    if (games[0]?.timeLimit) {
      startTimer(games[0].timeLimit);
    }
  }, [games, resetAllGames, initializeGameResults, startTimer]);

  // Récupérer le jeu actuel
  const currentGame = games[currentGameIndex] || null;

  return {
    // États
    games,
    currentGameIndex,
    currentGame,
    showFeedback,
    showResults,
    gameResults,
    score,
    isCorrect,
    timeLeft,
    isActive,
    levelColor,
    bounceAnim,
    
    // Actions
    setCurrentGameIndex,
    checkAnswer,
    handleGameComplete,
    goToNextGame,
    goToPreviousGame,
    resetGames,
    navigation
  };
};

export default useWordGames;