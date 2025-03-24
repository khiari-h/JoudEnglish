import { useState, useEffect } from 'react';

// Import des données de phrases
import phrasesA1Data from "../../../../data/exercises/phrases/phrasesA1";
// Futurs niveaux: import phrasesA2Data from "../../../../data/exercises/phrases/phrasesA2"; etc.

/**
 * Hook personnalisé pour gérer les phrases et expressions
 * 
 * @param {string} level - Niveau (A1, A2, etc.)
 * @returns {Object} - États et fonctions liés aux phrases
 */
const usePhrases = (level) => {
  // États
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  
  // Récupérer les données de phrases en fonction du niveau
  const getPhrasesData = (level) => {
    switch (level) {
      case "A1":
        return phrasesA1Data;
      // Futurs niveaux: case "A2": return phrasesA2Data; etc.
      default:
        return phrasesA1Data;
    }
  };
  
  // Données des phrases pour le niveau actuel
  const phrasesData = getPhrasesData(level);
  
  // Catégorie actuellement sélectionnée
  const currentCategory = phrasesData.categories[selectedCategoryIndex];
  
  // Phrases filtrées par catégorie
  const currentPhrases = phrasesData.phrases.filter(
    (phrase) => phrase.categoryId === currentCategory.id
  );
  
  // Phrase actuellement sélectionnée
  const currentPhrase = currentPhrases[selectedPhraseIndex];
  
  // Réinitialiser les indices lorsque le niveau change
  useEffect(() => {
    setSelectedCategoryIndex(0);
    setSelectedPhraseIndex(0);
    setSelectedPhrase(null);
  }, [level]);
  
  // Réinitialiser l'index de phrase lorsque la catégorie change
  useEffect(() => {
    setSelectedPhraseIndex(0);
  }, [selectedCategoryIndex]);
  
  return {
    // États
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    selectedPhraseIndex,
    setSelectedPhraseIndex,
    selectedPhrase,
    setSelectedPhrase,
    
    // Données
    phrasesData,
    currentCategory,
    currentPhrases,
    currentPhrase,
  };
};

export default usePhrases;