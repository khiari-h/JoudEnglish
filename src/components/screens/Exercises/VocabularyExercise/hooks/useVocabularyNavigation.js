import { useCallback } from 'react';

/**
 * Hook to handle vocabulary exercise navigation
 */
export const useVocabularyNavigation = (
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
) => {
  // Handle next button press
  const handleNext = useCallback(() => {
    // Mark current word as completed
    markWordAsCompleted();
    
    // Reset state for next word
    setShowTranslation(false);
    resetAnimation();

    if (currentWordIndex < totalWords - 1) {
      // Go to next word in this category
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // All words in this category are completed
      const allCompleted = categories.every((category, index) => {
        return (completedWords[index]?.length || 0) === category.words.length;
      });

      if (allCompleted) {
        // All vocabulary exercises are completed
        alert("All vocabulary exercises completed!");
        navigation.goBack();
      } else {
        // Find next category with uncompleted words
        let nextCategoryIndex = (selectedCategoryIndex + 1) % categories.length;
        
        while (
          completedWords[nextCategoryIndex]?.length === categories[nextCategoryIndex].words.length &&
          nextCategoryIndex !== selectedCategoryIndex
        ) {
          nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
        }
        
        if (nextCategoryIndex === selectedCategoryIndex) {
          // If we circle back, everything is done
          alert("All vocabulary exercises completed!");
          navigation.goBack();
        } else {
          // Ask to move to next category
          if (confirm(`You've completed this category! Move to ${categories[nextCategoryIndex].title}?`)) {
            setSelectedCategoryIndex(nextCategoryIndex);
            setCurrentWordIndex(0);
          } else {
            // Restart current category
            setCurrentWordIndex(0);
          }
        }
      }
    }
  }, [
    currentWordIndex, 
    totalWords, 
    categories, 
    selectedCategoryIndex, 
    completedWords,
    markWordAsCompleted,
    setCurrentWordIndex,
    setSelectedCategoryIndex,
    setShowTranslation,
    resetAnimation,
    navigation
  ]);

  // Handle previous button press
  const handlePrevious = useCallback(() => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
      resetAnimation();
    }
  }, [currentWordIndex, setCurrentWordIndex, setShowTranslation, resetAnimation]);

  // Handle direct word selection from indicators
  const handleWordSelection = useCallback((index) => {
    setCurrentWordIndex(index);
    setShowTranslation(false);
    resetAnimation();
  }, [setCurrentWordIndex, setShowTranslation, resetAnimation]);

  return {
    handleNext,
    handlePrevious,
    handleWordSelection
  };
};