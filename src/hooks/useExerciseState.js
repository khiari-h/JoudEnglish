import { useState, useCallback, useRef } from 'react';
import { Animated } from 'react-native';

const useExerciseState = ({
  exercises,
  checkAnswerFn,
  onComplete,
  levelColor
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [score, setScore] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const resetExercise = useCallback(() => {
    setCurrentIndex(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setAttempts([]);
    setScore(0);
    setCompletedItems([]);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = {
      total: exercises.length,
      correct: score,
      percentage: Math.round((score / exercises.length) * 100)
    };
    onComplete?.(finalScore);
  }, [exercises.length, score, onComplete]);

  const checkAnswer = useCallback(async (answer) => {
    try {
      const result = await checkAnswerFn(answer, exercises[currentIndex]);
      setIsCorrect(result);
    } catch (error) {
      console.error('Error checking answer:', error);
      handleError(error);
    }
  }, [checkAnswerFn, exercises, currentIndex, handleError]);

  const animate = useCallback((toValue, duration = 200) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const goToNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      animate(0, 200);
      setCurrentIndex(prev => prev + 1);
      setShowFeedback(false);
      animate(1, 200);
    } else {
      handleComplete();
    }
  }, [currentIndex, exercises.length, handleComplete, animate]);

  const getCurrentExercise = useCallback(() => {
    if (!exercises || currentIndex >= exercises.length) {
      return null;
    }
    return exercises[currentIndex];
  }, [exercises, currentIndex]);

  return {
    currentIndex,
    showFeedback,
    isCorrect,
    attempts,
    fadeAnim,
    animate,
    checkAnswer,
    goToNext,
    setCurrentIndex,
    levelColor,
    score,
    completedItems,
    resetExercise,
    handleComplete,
    getCurrentExercise
  };
};

export default useExerciseState;
