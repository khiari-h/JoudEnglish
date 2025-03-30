// src/components/screens/Exercises/GrammarExercise/hooks/useGrammarExercise.js
import { useState, useEffect } from 'react';
import { getGrammarDataByLevel } from '../utils/dataUtils';

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
  const [grammarData, setGrammarData] = useState(null);
  const [completedExercises, setCompletedExercises] = useState({});

  // Charger les données de grammaire
  useEffect(() => {
    const data = getGrammarDataByLevel(level);
    setGrammarData(data);

    // Initialiser le suivi des exercices complétés
    if (data && data.categories && data.categories.length > 0) {
      const initialCompletedExercises = {};
      data.categories.forEach((_, index) => {
        initialCompletedExercises[index] = [];
      });
      setCompletedExercises(initialCompletedExercises);
    }
  }, [level]);

  // Obtenir la règle et les exercices actuels
  const currentRule = grammarData?.categories?.[selectedRuleIndex] || { exercises: [] };
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
    
    // Mettre à jour les exercices complétés
    if (correct) {
      updateCompletedExercises(currentExerciseIndex);
    }
  };
  
  // Mettre à jour les exercices complétés
  const updateCompletedExercises = (exerciseIndex) => {
    if (!completedExercises[selectedRuleIndex]) {
      completedExercises[selectedRuleIndex] = [];
    }

    if (!completedExercises[selectedRuleIndex].includes(exerciseIndex)) {
      const newCompletedExercises = { ...completedExercises };
      newCompletedExercises[selectedRuleIndex] = [
        ...newCompletedExercises[selectedRuleIndex],
        exerciseIndex
      ];
      setCompletedExercises(newCompletedExercises);
    }
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
  
  // Passer à l'exercice suivant
  const goToNextExercise = () => {
    if (currentExerciseIndex < currentRule.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExercise();
    }
  };
  
  // Revenir à l'exercice précédent
  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      resetExercise();
    }
  };
  
  // Changer de règle grammaticale
  const handleRuleChange = (index) => {
    if (index !== selectedRuleIndex) {
      setSelectedRuleIndex(index);
      setCurrentExerciseIndex(0);
      resetExercise();
    }
  };

  // Réinitialiser les états lorsque la règle ou le niveau change
  useEffect(() => {
    resetExercise();
    setCurrentExerciseIndex(0);
    setUserAnswers([]);
  }, [selectedRuleIndex, level]);

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
    completedExercises,
    
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
    goToNextExercise,
    goToPreviousExercise,
    handleRuleChange,
    updateCompletedExercises
  };
};

export default useGrammarExercise;