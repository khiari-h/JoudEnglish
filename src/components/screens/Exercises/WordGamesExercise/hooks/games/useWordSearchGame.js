import { useState, useEffect, useCallback } from 'react';
import { isAdjacent, lettersToWord } from '../../utils/gameHelpers';

/**
 * Hook pour gérer la logique du jeu de recherche de mots
 * @param {Object} game - Configuration du jeu de recherche de mots
 * @param {Function} onCompleted - Callback lorsque le jeu est complété
 * @returns {Object} - État et fonctions pour le jeu de recherche de mots
 */
const useWordSearchGame = (game, onCompleted) => {
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [gridWidth, setGridWidth] = useState(0);

  // Initialiser le jeu
  useEffect(() => {
    if (game && game.grid) {
      // Transformer la grille en structure utilisable
      const formattedGrid = game.grid.map((row, rowIndex) => 
        row.map((letter, colIndex) => ({
          value: letter,
          index: rowIndex * row.length + colIndex,
          rowIndex,
          colIndex
        }))
      );
      
      setGrid(formattedGrid);
      setGridWidth(game.grid[0]?.length || 0);
      setFoundWords([]);
      setSelectedCells([]);
    }
  }, [game]);

  /**
   * Gère la sélection d'une cellule dans la grille
   * @param {Object} cell - La cellule sélectionnée
   */
  const handleCellSelection = useCallback((cell) => {
    setSelectedCells(prevSelected => {
      // Vérifier si la cellule est déjà sélectionnée
      const cellIndex = prevSelected.findIndex(c => c.index === cell.index);
      
      if (cellIndex !== -1) {
        // Si déjà sélectionnée, retirer toutes les cellules suivantes
        return prevSelected.slice(0, cellIndex + 1);
      } else if (
        prevSelected.length === 0 || 
        isAdjacent(prevSelected[prevSelected.length - 1].index, cell.index, gridWidth)
      ) {
        // Ajouter la cellule si c'est la première ou si elle est adjacente à la dernière sélectionnée
        return [...prevSelected, cell];
      }
      
      return prevSelected;
    });
  }, [gridWidth]);

  /**
   * Vérifie si le mot sélectionné est valide
   */
  const checkSelectedWord = useCallback(() => {
    if (selectedCells.length < 2) return;
    
    // Obtenir le mot formé par les cellules sélectionnées
    const selectedWord = lettersToWord(selectedCells);
    
    // Vérifier si ce mot est dans la liste des mots à trouver
    if (
      game.words.includes(selectedWord.toLowerCase()) &&
      !foundWords.includes(selectedWord.toLowerCase())
    ) {
      // Mot trouvé!
      const newFoundWords = [...foundWords, selectedWord.toLowerCase()];
      setFoundWords(newFoundWords);
      
      // Vérifier si tous les mots ont été trouvés
      if (newFoundWords.length === game.words.length) {
        if (onCompleted) {
          onCompleted(true, game.maxScore || 10);
        }
      }
    }
    
    // Réinitialiser la sélection
    setSelectedCells([]);
  }, [selectedCells, foundWords, game, onCompleted]);

  // Vérifier le mot automatiquement quand une sélection est faite
  useEffect(() => {
    if (selectedCells.length >= 2) {
      checkSelectedWord();
    }
  }, [selectedCells, checkSelectedWord]);

  /**
   * Réinitialise l'état du jeu
   */
  const resetGame = useCallback(() => {
    setFoundWords([]);
    setSelectedCells([]);
  }, []);

  // Calculer la progression
  const progress = foundWords.length / (game.words?.length || 1) * 100;
  const isCompleted = game.words && foundWords.length === game.words.length;

  // Transformer la grille en tableau plat pour faciliter l'affichage
  const flatGrid = grid.flat();

  return {
    grid,
    flatGrid,
    selectedCells,
    foundWords,
    progress,
    isCompleted,
    handleCellSelection,
    resetGame
  };
};

export default useWordSearchGame;