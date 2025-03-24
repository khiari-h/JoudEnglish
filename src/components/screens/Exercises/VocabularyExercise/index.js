import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import styles from './style';

// Import custom hook for exercise logic
import { useVocabularyExercise } from './hooks/useVocabularyExercise';

// Import components
import VocabularyHeader from './components/VocabularyHeader';
import CategorySelector from './components/CategorySelector';
import LearningTip from './components/LearningTip';
import ProgressBar from './components/ProgressBar';
import WordCard from './components/WordCard';
import CardIndicators from './components/CardIndicators';
import NavigationButtons from './components/NavigationButtons';

/**
 * Vocabulary exercise screen component
 */
const VocabularyExercise = ({ route, navigation }) => {
  const { level } = route.params || { level: 'A1' };
  
  // Get all state and handlers from the main hook
  const {
    // State
    levelColor,
    selectedCategoryIndex,
    currentWordIndex,
    showTranslation,
    completedWords,
    showTip,
    
    // Animations
    fadeAnim,
    slideAnim,
    tipFadeAnim,
    
    // Data
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
  } = useVocabularyExercise(level, navigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with level badge and exercise title */}
        <VocabularyHeader 
          level={level} 
          levelColor={levelColor} 
          navigation={navigation} 
        />

        {/* Category selector */}
        <CategorySelector 
          categories={categories}
          selectedCategoryIndex={selectedCategoryIndex}
          handleCategoryChange={handleCategoryChange}
          levelColor={levelColor}
        />

        {/* Learning tip (shown only on first load) */}
        {showTip && (
          <LearningTip 
            tipFadeAnim={tipFadeAnim}
            dismissTip={dismissTip}
          />
        )}

        {/* Progress bar */}
        <ProgressBar 
          progress={progress}
          completed={completedWords[selectedCategoryIndex]?.length || 0}
          total={totalWords}
          levelColor={levelColor}
        />

        {/* Main word card */}
        <WordCard 
          currentWord={currentWord}
          showTranslation={showTranslation}
          toggleTranslation={toggleTranslation}
          levelColor={levelColor}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
        />

        {/* Word navigation indicators */}
        <CardIndicators 
          words={currentCategory?.words || []}
          currentWordIndex={currentWordIndex}
          completedWords={completedWords}
          selectedCategoryIndex={selectedCategoryIndex}
          handleWordSelection={handleWordSelection}
          levelColor={levelColor}
        />

        {/* Previous/Next buttons */}
        <NavigationButtons 
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          levelColor={levelColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VocabularyExercise;