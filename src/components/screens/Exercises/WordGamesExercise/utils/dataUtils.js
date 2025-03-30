// src/components/screens/Exercises/WordGamesExercise/utils/dataUtils.js
import wordGamesA1 from "../../../../../data/exercises/wordGames/wordGamesA1";
// Importer d'autres niveaux quand ils seront disponibles
// import wordGamesA2 from '../../../../../data/exercises/wordGames/wordGamesA2';
// import wordGamesB1 from '../../../../../data/exercises/wordGames/wordGamesB1';

/**
 * Récupère et formate les données de jeux de mots selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant WordGamesExercise
 */
export const getWordGamesByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let wordGamesData;
  switch (level.toUpperCase()) {
    case "A1":
      wordGamesData = wordGamesA1;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   wordGamesData = wordGamesA2;
    //   break;
    // case 'B1':
    //   wordGamesData = wordGamesB1;
    //   break;
    default:
      wordGamesData = wordGamesA1; // Par défaut, utiliser A1
  }

  // Organiser les jeux par type
  const gamesByType = {
    anagram: [],
    matching: [],
    word_search: [],
    categorization: [],
  };

  // Ajouter des IDs uniques aux jeux et les organiser par type
  const games = wordGamesData.games.map((game, index) => {
    const gameWithId = {
      ...game,
      id: `game_${level.toLowerCase()}_${game.type}_${index}`,
    };

    // Ajouter le jeu au tableau correspondant à son type
    if (gamesByType[game.type]) {
      gamesByType[game.type].push(gameWithId);
    }

    return gameWithId;
  });

  // Conseils pour les jeux de mots
  const tips = [
    "Pour les anagrammes, essayez de repérer d'abord les combinaisons de lettres courantes.",
    "Dans les jeux d'association, éliminez d'abord les paires évidentes.",
    "Pour les mots cachés, cherchez les débuts de mots dans les premières lettres des rangées et colonnes.",
    "Dans les jeux de catégorisation, pensez aux caractéristiques communes des mots d'une même catégorie.",
    "N'oubliez pas d'utiliser les indices si vous êtes bloqué(e).",
  ];

  return {
    level: wordGamesData.level,
    description: wordGamesData.description,
    games,
    gamesByType,
    tips,
  };
};

/**
 * Récupère un jeu spécifique par son ID
 * @param {string} gameId - L'ID du jeu
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} Le jeu correspondant ou null
 */
export const getGameById = (gameId, level) => {
  const { games } = getWordGamesByLevel(level);
  return games.find((game) => game.id === gameId) || null;
};

/**
 * Récupère tous les jeux d'un type spécifique
 * @param {string} gameType - Le type de jeu (anagram, matching, word_search, categorization)
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des jeux du type spécifié
 */
export const getGamesByType = (gameType, level) => {
  const { gamesByType } = getWordGamesByLevel(level);
  return gamesByType[gameType] || [];
};

/**
 * Vérifie la réponse de l'utilisateur pour un jeu d'anagramme
 * @param {string} gameId - L'ID du jeu
 * @param {string} userAnswer - La réponse de l'utilisateur
 * @param {string} level - Le niveau de langue
 * @returns {Object} Résultat de la vérification
 */
export const checkAnagramAnswer = (gameId, userAnswer, level) => {
  const game = getGameById(gameId, level);

  if (!game || game.type !== "anagram") {
    return { isCorrect: false, message: "Invalid game" };
  }

  const isCorrect = userAnswer.trim().toLowerCase() === game.word.toLowerCase();
  const message = isCorrect
    ? game.successMessage || `Correct! '${game.word}' is the answer!`
    : `Try again. The correct answer is '${game.word}'.`;

  return { isCorrect, message };
};

/**
 * Calcule le score pour un jeu de mots
 * @param {string} gameId - L'ID du jeu
 * @param {number} timeSpent - Temps passé en secondes (pour les jeux chronométrés)
 * @param {number} mistakes - Nombre d'erreurs commises
 * @param {string} level - Le niveau de langue
 * @returns {number} Score calculé
 */
export const calculateGameScore = (
  gameId,
  timeSpent = 0,
  mistakes = 0,
  level
) => {
  const game = getGameById(gameId, level);

  if (!game) {
    return 0;
  }

  const maxScore = game.maxScore || 10;

  // Pour les jeux chronométrés
  if (game.timeLimit && timeSpent > 0) {
    // Réduction du score basée sur le temps passé par rapport à la limite
    const timeRatio = Math.min(1, game.timeLimit / timeSpent);
    return Math.max(0, Math.round(maxScore * timeRatio * (1 - mistakes * 0.1)));
  }

  // Pour les jeux sans minuterie
  return Math.max(0, maxScore - mistakes);
};
