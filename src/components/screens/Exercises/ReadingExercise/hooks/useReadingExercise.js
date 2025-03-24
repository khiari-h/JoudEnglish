import { useState, useEffect } from 'react';

// Import dynamique des données en fonction du niveau
import readingA1Data from "../../../../data/exercises/reading/readingA1";
import readingA2Data from "../../../../data/exercises/reading/readingA2";
import readingB1Data from "../../../../data/exercises/reading/readingB1";
import readingB2Data from "../../../../data/exercises/reading/readingB2";
import readingC1Data from "../../../../data/exercises/reading/readingC1";
import readingC2Data from "../../../../data/exercises/reading/readingC2";

/**
 * Hook personnalisé pour gérer l'état et la logique des exercices de lecture
 * 
 * @param {string} level - Niveau (A1, A2, etc.)
 * @returns {Object} - États et fonctions pour les exercices de lecture
 */
const useReadingExercise = (level) => {
  // États pour gérer l'exercice
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Function to get data based on level
  const getReadingData = (level) => {
    const dataMap = {
      A1: readingA1Data,
      A2: readingA2Data,
      B1: readingB1Data,
      B2: readingB2Data,
      C1: readingC1Data,
      C2: readingC2Data,
    };
    return dataMap[level] || readingA1Data;
  };
  
  // Get current exercise and question
  const currentExercise = allExercises[selectedExerciseIndex];
  const currentQuestion = currentExercise?.questions?.[currentQuestionIndex];
  const isCorrectAnswer = selectedAnswer === currentQuestion?.correctAnswer;
  
  // Initialize with the appropriate data based on level
  useEffect(() => {
    setLoading(true);
    const exerciseData = getReadingData(level);
    
    if (exerciseData.exercises && exerciseData.exercises.length > 0) {
      setAllExercises(exerciseData.exercises);
      
      // Initialize completed questions for all exercises
      const initialCompletedQuestions = {};
      
      exerciseData.exercises.forEach((exercise, index) => {
        initialCompletedQuestions[index] = [];
      });
      
      // Only initialize if not already set
      if (Object.keys(completedQuestions).length === 0) {
        setCompletedQuestions(initialCompletedQuestions);
      }
    }
    setLoading(false);
  }, [level]);
  
  // Reset question state when changing the selected exercise
  useEffect(() => {
    if (currentExercise) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAttempts(0);
    }
  }, [selectedExerciseIndex]);
  
  // Reset attempts when changing question
  useEffect(() => {
    setAttempts(0);
  }, [currentQuestionIndex]);
  
  // Verify if the current question is completed
  const isCurrentQuestionCompleted = () => {
    return completedQuestions[selectedExerciseIndex]?.includes(
      currentQuestionIndex
    );
  };
  
  // Calculate progress for the current exercise
  const calculateProgress = () => {
    const completed = completedQuestions[selectedExerciseIndex]?.length || 0;
    const total = currentExercise?.questions?.length || 0;
    return (completed / total) * 100;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };
  
  // Handle submission of answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentExercise) return;
    
    // Increment attempts counter
    setAttempts(attempts + 1);
    
    // Show feedback
    setShowFeedback(true);
  };
  
  // Retry the current exercise
  const retryExercise = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
  };
  
  // Mark current question as completed
  const markQuestionCompleted = () => {
    if (!isCurrentQuestionCompleted()) {
      const updatedCompletedQuestions = { ...completedQuestions };
      if (!updatedCompletedQuestions[selectedExerciseIndex]) {
        updatedCompletedQuestions[selectedExerciseIndex] = [];
      }
      updatedCompletedQuestions[selectedExerciseIndex].push(currentQuestionIndex);
      setCompletedQuestions(updatedCompletedQuestions);
    }
  };
  
  // Check if all exercises are completed
  const areAllExercisesCompleted = () => {
    return allExercises.every((exercise, index) => {
      return (
        (completedQuestions[index]?.length || 0) === exercise.questions?.length
      );
    });
  };
  
  return {
    // États
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    completedQuestions,
    showFeedback,
    attempts,
    isCorrectAnswer,
    currentQuestion,
    loading,
    
    // Setters
    setSelectedExerciseIndex,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    setShowFeedback,
    setCompletedQuestions,
    setAttempts,
    
    // Fonctions
    calculateProgress,
    isCurrentQuestionCompleted,
    handleSelectAnswer,
    handleSubmitAnswer,
    retryExercise,
    markQuestionCompleted,
    areAllExercisesCompleted,
  };
};

export default useReadingExercise;