import { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

// Import hooks and utilities
import { useWordCardAnimation } from './useWordCardAnimation';
import { useVocabularyNavigation } from './useVocabularyNavigation';
import { getLevelColor } from '../utils/levelUtils';
import { getVocabularyDataByLevel } from '../utils/dataUtils';

/**
 * Main hook for vocabulary exercise functionality
 * 
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @param {Object} navigation - Objet de navigation React Navigation
 * @returns {Object} Données, états et fonctions pour l'exercice de vocabulaire
 */
export const useVocabularyExercise = (level, navigation) => {
  // States
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState({});
  const [showTip, setShowTip] = useState(true);
  const [tipFadeAnim] = useState(new Animated.Value(1));

  // Animation hooks
  const { fadeAnim, slideAnim, animateCard, resetAnimation } = useWordCardAnimation();
  
  // Get color based on level
  const levelColor = getLevelColor(level);

  // Get vocabulary data for the current level (utilisant dataUtils)
  const vocabularyData = getVocabularyDataByLevel(level);
  const categories = vocabularyData.categories || [];
  const currentCategory = categories[selectedCategoryIndex] || { words: [] };
  const currentWord = currentCategory.words?.[currentWordIndex];
  const totalWords = currentCategory.words?.length || 0;
  
  // Initialize tracking for completed words
  useEffect(() => {
    const initialCompletedWords = {};
    categories.forEach((_, categoryIndex) => {
      initialCompletedWords[categoryIndex] = [];
    });
    
    // Don't reset if already initialized
    if (Object.keys(completedWords).length === 0) {
      setCompletedWords(initialCompletedWords);
    }
  }, [categories]);

  // Animate card when word changes
  useEffect(() => {
    animateCard();
  }, [currentWordIndex, selectedCategoryIndex, animateCard]);

  // Check if current word is completed
  const isCurrentWordCompleted = useCallback(() => {
    return completedWords[selectedCategoryIndex]?.includes(currentWordIndex);
  }, [completedWords, selectedCategoryIndex, currentWordIndex]);

  // Mark the current word as completed
  const markWordAsCompleted = useCallback(() => {
    if (!isCurrentWordCompleted()) {
      const updatedCompletedWords = { ...completedWords };
      if (!updatedCompletedWords[selectedCategoryIndex]) {
        updatedCompletedWords[selectedCategoryIndex] = [];
      }
      updatedCompletedWords[selectedCategoryIndex].push(currentWordIndex);
      setCompletedWords(updatedCompletedWords);
    }
  }, [completedWords, selectedCategoryIndex, currentWordIndex, isCurrentWordCompleted]);

  // Calculate progress percentage
  const calculateProgress = useCallback(() => {
    const completed = completedWords[selectedCategoryIndex]?.length || 0;
    return (completed / totalWords) * 100;
  }, [completedWords, selectedCategoryIndex, totalWords]);

  // Toggle translation visibility
  const toggleTranslation = useCallback(() => {
    setShowTranslation(!showTranslation);
  }, [showTranslation]);

  // Handle tip dismissal
  const dismissTip = useCallback(() => {
    Animated.timing(tipFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowTip(false);
    });
  }, [tipFadeAnim]);

  // Handle category selection
  const handleCategoryChange = useCallback((index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setCurrentWordIndex(0);
      setShowTranslation(false);
      resetAnimation();
    }
  }, [selectedCategoryIndex, resetAnimation]);

  // Get navigation handlers
  const { 
    handleNext, 
    handlePrevious, 
    handleWordSelection 
  } = useVocabularyNavigation({
    currentWordIndex,
    totalWords,
    setCurrentWordIndex,
    setShowTranslation,
    resetAnimation,
    markWordAsCompleted,
    categories,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    completedWords,
    navigation
  });

  // Calculate progress
  const progress = calculateProgress();

  return {
    // State
    selectedCategoryIndex,
    currentWordIndex,
    showTranslation,
    completedWords,
    showTip,
    levelColor,
    
    // Animations
    fadeAnim,
    slideAnim,
    tipFadeAnim,
    
    // Data
    vocabularyData,
    categories,
    currentCategory,
    currentWord,
    totalWords,
    progress,
    
    // Actions
    toggleTranslation,
    dismissTip,
    handleCategoryChange,
    handleWordSelection,
    handleNext,
    handlePrevious,
    isCurrentWordCompleted,
    
    // Navigation
    navigation
  };
};