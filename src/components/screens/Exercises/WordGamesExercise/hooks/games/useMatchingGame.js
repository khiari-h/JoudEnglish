import { useState, useEffect, useCallback, useRef } from 'react';
import { shuffleArray } from '../../utils/gameHelpers';

/**
 * Hook pour gérer la logique du jeu d'association
 * @param {Object} game - Configuration du jeu d'association
 * @param {Function} onCompleted - Callback lorsque le jeu est complété
 * @returns {Object} - État et fonctions pour le jeu d'association
 */
const useMatchingGame = (game, onCompleted) => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const timeoutRef = useRef(null);

  // Initialiser le jeu avec des éléments mélangés
  useEffect(() => {
    if (game && game.pairs) {
      // Créer un tableau plat avec toutes les paires
      const allItems = game.pairs.flatMap(pair => [
        { value: pair.word, pairId: pair.id },
        { value: pair.match, pairId: pair.id }
      ]);
      
      // Mélanger les éléments
      const shuffled = shuffleArray(allItems);
      
      // Attribuer un index à chaque élément pour le suivi
      setShuffledItems(shuffled.map((item, index) => ({
        ...item,
        index
      })));
      
      // Réinitialiser l'état
      setSelectedItems([]);
      setMatchedItems([]);
    }
    
    // Nettoyer le timeout si nécessaire
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [game]);

  /**
   * Gère la sélection d'un élément
   * @param {Object} item - L'élément sélectionné
   */
  const handleItemSelection = useCallback((item) => {
    // Ne rien faire si on est en train de vérifier une paire
    // ou si l'élément est déjà apparié
    if (isCheckingMatch || matchedItems.includes(item.index)) return;
    
    // Ne pas dépasser 2 sélections à la fois
    if (selectedItems.length < 2 && !selectedItems.some(i => i.index === item.index)) {
      const newSelection = [...selectedItems, item];
      setSelectedItems(newSelection);
      
      // Si deux éléments sont sélectionnés, vérifier s'ils forment une paire
      if (newSelection.length === 2) {
        checkMatch(newSelection);
      }
    }
  }, [selectedItems, matchedItems, isCheckingMatch]);

  /**
   * Vérifie si les deux éléments sélectionnés forment une paire
   * @param {Array} items - Tableau des deux éléments sélectionnés
   */
  const checkMatch = useCallback((items) => {
    // Marquer qu'on est en train de vérifier une paire
    setIsCheckingMatch(true);
    
    // Vérifier si les deux éléments ont le même ID de paire
    const isPair = items[0].pairId === items[1].pairId;
    
    // Délai avant de traiter le résultat
    timeoutRef.current = setTimeout(() => {
      if (isPair) {
        // Si c'est une paire, ajouter aux éléments appariés
        setMatchedItems(prev => [...prev, items[0].index, items[1].index]);
        
        // Vérifier si toutes les paires sont trouvées
        const newMatchedCount = matchedItems.length + 2;
        if (newMatchedCount === shuffledItems.length) {
          // Jeu terminé
          if (onCompleted) {
            onCompleted(true, game.maxScore || 10);
          }
        }
      }
      
      // Réinitialiser la sélection
      setSelectedItems([]);
      setIsCheckingMatch(false);
    }, 1000);
  }, [matchedItems, shuffledItems, game, onCompleted]);

  /**
   * Réinitialise l'état du jeu
   */
  const resetGame = useCallback(() => {
    if (game && game.pairs) {
      // Recréer et remélanger les éléments
      const allItems = game.pairs.flatMap(pair => [
        { value: pair.word, pairId: pair.id },
        { value: pair.match, pairId: pair.id }
      ]);
      const shuffled = shuffleArray(allItems);
      setShuffledItems(shuffled.map((item, index) => ({
        ...item,
        index
      })));
    }
    
    // Réinitialiser l'état
    setSelectedItems([]);
    setMatchedItems([]);
    setIsCheckingMatch(false);
    
    // Nettoyer le timeout si nécessaire
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [game]);

  // Calculer la progression
  const progress = matchedItems.length / (shuffledItems.length || 1) * 100;
  const isCompleted = shuffledItems.length > 0 && matchedItems.length === shuffledItems.length;

  return {
    shuffledItems,
    selectedItems,
    matchedItems,
    isCheckingMatch,
    progress,
    isCompleted,
    handleItemSelection,
    resetGame
  };
};

export default useMatchingGame;