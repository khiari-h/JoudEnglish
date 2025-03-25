import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../../utils/gameHelpers';

/**
 * Hook pour gérer la logique du jeu de catégorisation
 * @param {Object} game - Configuration du jeu de catégorisation
 * @param {Function} onCompleted - Callback lorsque le jeu est complété
 * @returns {Object} - État et fonctions pour le jeu de catégorisation
 */
const useCategorization = (game, onCompleted) => {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [expectedWords, setExpectedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Initialiser le jeu
  useEffect(() => {
    if (game && game.words && game.categories) {
      // Mélanger tous les mots
      const shuffled = shuffleArray([...game.words]);
      
      // Attribuer un index à chaque mot pour le suivi
      setShuffledWords(shuffled.map((word, index) => ({
        value: word,
        index
      })));
      
      // Initialiser la catégorie actuelle
      setCurrentCategory(game.currentCategory || Object.keys(game.categories)[0]);
      
      // Réinitialiser l'état
      setSelectedWords([]);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }, [game]);

  // Mettre à jour les mots attendus quand la catégorie change
  useEffect(() => {
    if (game && game.categories && currentCategory) {
      setExpectedWords(game.categories[currentCategory] || []);
    }
  }, [game, currentCategory]);

  /**
   * Gère la sélection/désélection d'un mot
   * @param {Object} word - Le mot sélectionné
   */
  const handleWordSelection = useCallback((word) => {
    if (showFeedback) return;
    
    setSelectedWords(prevSelected => {
      // Vérifier si le mot est déjà sélectionné
      const wordIndex = prevSelected.findIndex(w => w.value === word.value);
      
      if (wordIndex !== -1) {
        // Si déjà sélectionné, le retirer
        const newSelected = [...prevSelected];
        newSelected.splice(wordIndex, 1);
        return newSelected;
      } else {
        // Sinon l'ajouter à la sélection
        return [...prevSelected, word];
      }
    });
  }, [showFeedback]);

  /**
   * Vérifie si la catégorisation est correcte
   */
  const checkAnswer = useCallback(() => {
    if (showFeedback) return;
    
    // Obtenir les mots sélectionnés (valeurs uniquement)
    const selectedValues = selectedWords.map(word => word.value);
    
    // Vérifier que:
    // 1. Tous les mots sélectionnés sont dans la catégorie attendue
    // 2. Tous les mots de la catégorie attendue sont sélectionnés
    const correct = 
      selectedValues.every(word => expectedWords.includes(word)) &&
      expectedWords.every(word => selectedValues.includes(word));
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Informer du résultat via le callback
    if (onCompleted) {
      onCompleted(correct, game.maxScore || 10);
    }
  }, [game, selectedWords, expectedWords, showFeedback, onCompleted]);

  /**
   * Réinitialise l'état du jeu
   */
  const resetGame = useCallback(() => {
    if (game && game.words) {
      // Remélanger les mots
      const shuffled = shuffleArray([...game.words]);
      setShuffledWords(shuffled.map((word, index) => ({
        value: word,
        index
      })));
    }
    
    // Réinitialiser l'état
    setSelectedWords([]);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [game]);

  return {
    shuffledWords,
    selectedWords,
    currentCategory,
    expectedWords,
    isCorrect,
    showFeedback,
    handleWordSelection,
    checkAnswer,
    resetGame
  };
};

export default useCategorization;