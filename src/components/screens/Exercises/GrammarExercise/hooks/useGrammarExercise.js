import { useState, useEffect } from 'react';

// Import des données de grammaire par niveau
import grammarA1 from "../../../../data/exercises/grammar/grammarA1";
// Futurs niveaux: import grammarA2 from "../../../../data/exercises/grammar/grammarA2"; etc.

/**
 * Hook personnalisé pour gérer l'état et la logique des exercices de grammaire
 * 
 * @param {string} level - Niveau de l'exercice (A1, A2, B1, etc.)
 * @returns {Object} États et fonctions pour l'exercice
 */
export const useGrammarExercise = (level) => {
  // États pour suivre la progression de l'exercice
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Récupérer les données de grammaire en fonction du niveau
  const getGrammarData = (level) => {
    switch(level) {
      case 'A1': return grammarA1;
      // Futurs niveaux: case 'A2': return grammarA2; etc.
      default: return grammarA1;
    }
  };

  const grammarData = getGrammarData(level);
  const currentRule = grammarData[selectedRuleIndex];
  const currentExercise = currentRule?.exercises?.[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (currentRule?.exercises?.length - 1);
  const progress = ((currentExerciseIndex + (showFeedback && isCorrect ? 1 : 0)) / (currentRule?.exercises?.length || 1)) * 100;

  // Réinitialiser l'exercice
  const resetExercise = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setInputText('');
    setIsCorrect(false);
    setAttempts(0);
  };

  // Déterminer si l'utilisateur peut vérifier sa réponse
  const canCheckAnswer = () => {
    if (!currentExercise) return false;
    
    if (currentExercise.type === 'fillInTheBlank' && currentExercise.options) {
      return selectedOption !== null;
    } else {
      return inputText.trim() !== '';
    }
  };

  // Gestion de la vérification des réponses
  const checkAnswer = () => {
    if (!currentExercise) return;
    
    let correct = false;
    
    if (currentExercise.type === 'fillInTheBlank' && currentExercise.options) {
      correct = selectedOption !== null && 
                (currentExercise.options[selectedOption] === currentExercise.answer || 
                 selectedOption === currentExercise.answer);
    } else if (currentExercise.type === 'fillInTheBlank') {
      correct = inputText.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    } else if (currentExercise.type === 'transformation') {
      correct = inputText.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    }

    setIsCorrect(correct);
    setAttempts(attempts + 1);

    const answer = {
      exerciseIndex: currentExerciseIndex,
      userAnswer: currentExercise.options 
        ? (selectedOption !== null ? currentExercise.options[selectedOption] : null)
        : inputText,
      isCorrect: correct,
      attempts: attempts + 1
    };

    setUserAnswers([...userAnswers, answer]);
    setShowFeedback(true);
  };

  // Retenter un exercice
  const retryExercise = () => {
    setShowFeedback(false);
    if (currentExercise.type === 'fillInTheBlank' && !currentExercise.options) {
      setInputText('');
    } else if (currentExercise.type === 'transformation') {
      setInputText('');
    } else {
      setSelectedOption(null);
    }
  };

  // Réinitialiser les états lorsque la règle ou le niveau change
  useEffect(() => {
    resetExercise();
    setCurrentExerciseIndex(0);
    setUserAnswers([]);
  }, [selectedRuleIndex, level]);

  // Pour initialiser l'entrée de texte avec le texte original pour certains exercices
  useEffect(() => {
    if (currentExercise && currentExercise.type === 'fillInTheBlank' && !showFeedback) {
      // Optionnellement, initialiser avec une valeur par défaut si nécessaire
    }
  }, [currentExerciseIndex, currentExercise]);

  return {
    // États
    selectedRuleIndex,
    setSelectedRuleIndex,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    selectedOption,
    setSelectedOption,
    userAnswers,
    setUserAnswers,
    showFeedback,
    setShowFeedback,
    inputText,
    setInputText,
    isCorrect,
    attempts,
    
    // Données
    grammarData,
    currentRule,
    currentExercise,
    isLastExercise,
    progress,
    
    // Fonctions
    resetExercise,
    checkAnswer,
    retryExercise,
    canCheckAnswer,
  };
};

export default useGrammarExercise;