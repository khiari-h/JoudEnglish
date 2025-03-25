import { useState, useEffect, useCallback } from 'react';
import { shuffleArray, lettersToWord } from '../../utils/gameHelpers';

/**
 * Hook pour gérer la logique du jeu d'anagramme
 * @param {Object} game - Configuration du jeu d'anagramme
 * @param {Function} onCompleted - Callback lorsque le jeu est complété
 * @returns {Object} - État et fonctions pour le jeu d'anagramme
 */
const useAnagramGame = (game, onCompleted) => {
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialiser le jeu avec des lettres mélangées
  useEffect(() => {
    if (game && game.word) {
      // Transformer le mot en tableau de lettres puis mélanger
      const letters = game.word.split('');
      const shuffled = shuffleArray(letters);
      
      // Attribuer un index à chaque lettre pour le suivi
      setShuffledLetters(shuffled.map((letter, index) => ({
        value: letter,
        index
      })));
      
      // Réinitialiser l'état
      setSelectedLetters([]);
      setIsCorrect(false);
      setShowFeedback(false);
    }
  }, [game]);

  /**
   * Gère la sélection/désélection d'une lettre
   * @param {Object} letter - La lettre sélectionnée
   */
  const handleLetterSelection = useCallback((letter) => {
    if (showFeedback) return;
    
    setSelectedLetters(prevSelected => {
      // Vérifier si la lettre est déjà sélectionnée
      const letterIndex = prevSelected.findIndex(l => l.index === letter.index);
      
      if (letterIndex !== -1) {
        // Si déjà sélectionnée, la retirer
        const newSelected = [...prevSelected];
        newSelected.splice(letterIndex, 1);
        return newSelected;
      } else {
        // Sinon l'ajouter à la sélection
        return [...prevSelected, letter];
      }
    });
  }, [showFeedback]);

  /**
   * Vérifie si la solution proposée est correcte
   */
  const checkAnswer = useCallback(() => {
    if (showFeedback || selectedLetters.length === 0) return;
    
    // Obtenir le mot formé par les lettres sélectionnées
    const userWord = lettersToWord(selectedLetters);
    
    // Vérifier si c'est la bonne réponse
    const correct = userWord.toLowerCase() === game.word.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Informer du résultat via le callback
    if (onCompleted) {
      onCompleted(correct, game.maxScore || 10);
    }
  }, [game, selectedLetters, showFeedback, onCompleted]);

  /**
   * Réinitialise l'état du jeu
   */
  const resetGame = useCallback(() => {
    // Remélanger les lettres
    if (game && game.word) {
      const letters = game.word.split('');
      const shuffled = shuffleArray(letters);
      setShuffledLetters(shuffled.map((letter, index) => ({
        value: letter,
        index
      })));
    }
    
    // Réinitialiser l'état
    setSelectedLetters([]);
    setIsCorrect(false);
    setShowFeedback(false);
  }, [game]);

  return {
    shuffledLetters,
    selectedLetters,
    isCorrect,
    showFeedback,
    handleLetterSelection,
    checkAnswer,
    resetGame
  };
};

export default useAnagramGame;