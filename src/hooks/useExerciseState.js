import { useState, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import useExerciseStore from '../stores/exerciseStore';
import useProgress from './useProgress';

const useExerciseState = ({ type, level, exercises, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [userAnswers, setUserAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const { updateProgress } = useProgress();
  const store = useExerciseStore();
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleAnswer = useCallback((answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }));
    
    const progress = Object.keys(userAnswers).length / exercises.length * 100;
    store.setProgress(`${type}_${level}`, progress);
  }, [currentIndex, exercises.length, store, type, level, userAnswers]);

  useEffect(() => {
    if (Object.keys(userAnswers).length === exercises.length) {
      setIsComplete(true);
      updateProgress(type, level, exercises.length, exercises.length);
    }
  }, [userAnswers, exercises.length, type, level, updateProgress]);

  return {
    currentIndex,
    setCurrentIndex,
    handleAnswer,
    userAnswers,
    isComplete,
    fadeAnim,
  };
};

export default useExerciseState;
