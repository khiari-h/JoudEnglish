import { useState, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer les interactions avec le texte de lecture
 * 
 * @param {Object} params - Paramètres du hook
 * @param {Object} params.scrollViewRef - Référence au ScrollView principal
 * @param {Object} params.currentExercise - Exercice actuel
 * @returns {Object} - États et fonctions pour l'interaction avec le texte
 */
const useReadingTextInteraction = ({
  scrollViewRef,
  currentExercise
}) => {
  // États
  const [textExpanded, setTextExpanded] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(null);
  
  // Toggle l'expansion du texte
  const toggleTextExpansion = useCallback(() => {
    setTextExpanded(prevExpanded => !prevExpanded);
    
    // Si on développe le texte, scroller vers le haut
    if (!textExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [textExpanded, scrollViewRef]);
  
  // Gestion du clic sur un mot
  const handleWordPress = useCallback((word) => {
    if (
      currentExercise &&
      currentExercise.vocabulary &&
      currentExercise.vocabulary[word]
    ) {
      setHighlightedWord({
        word,
        definition: currentExercise.vocabulary[word],
      });
    }
  }, [currentExercise]);
  
  // Fermer le popup de vocabulaire
  const closeVocabularyPopup = useCallback(() => {
    setHighlightedWord(null);
  }, []);
  
  // Vérifier si un mot a une définition
  const wordHasDefinition = useCallback((word) => {
    if (!word || !currentExercise || !currentExercise.vocabulary) return false;
    
    // Nettoyer le mot de la ponctuation
    const cleanWord = word.replace(/[.,!?;:""]/g, "");
    return !!currentExercise.vocabulary[cleanWord];
  }, [currentExercise]);
  
  return {
    textExpanded,
    highlightedWord,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    wordHasDefinition
  };
};

export default useReadingTextInteraction;