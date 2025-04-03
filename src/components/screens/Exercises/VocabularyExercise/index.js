// src/components/screens/Exercises/VocabularyExercise/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import { NavigationButton, IconButton } from '../../../common/Navigation';
import { AnimatedFeedback, ExerciseFeedback } from '../../../common/Feedback';

// Import des composants
import CategorySelector from "./components/CategorySelector";
import WordCard from "./components/WordCard";
import NavigationButtons from "./components/NavigationButtons";

// Import du hook principal
import { useVocabularyExercise } from "./hooks/useVocabularyExercise";

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de vocabulaire
 * Version simplifiée utilisant le hook useVocabularyExercise
 */
const VocabularyExercise = ({ navigation }) => {
  const {
    // État
    selectedCategoryIndex,
    currentWordIndex,
    showTranslation,
    levelColor,

    // Animations
    fadeAnim,
    slideAnim,

    // Données
    vocabularyData,
    currentWord,
    progress,

    // Actions
    toggleTranslation,
    handleCategoryChange,
    handleNext,
    handlePrevious,
    isCurrentWordCompleted,
    handleGoBack,
  } = useVocabularyExercise("A1", navigation);

  const renderActions = () => (
    <NavigationButtons
      currentWordIndex={currentWordIndex}
      totalWords={vocabularyData?.totalWords || 0}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      levelColor={levelColor}
    />
  );

  return (
    <BaseExercise
      title="Vocabulary Exercise"
      level="A1"
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
      renderActions={renderActions}
    >
      <CategorySelector
        categories={vocabularyData?.categories || []}
        selectedCategoryIndex={selectedCategoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />
      {currentWord && (
        <WordCard
          word={currentWord}
          showTranslation={showTranslation}
          onToggleTranslation={toggleTranslation}
          isCompleted={isCurrentWordCompleted()}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          levelColor={levelColor}
        />
      )}
    </BaseExercise>
  );
};

export default VocabularyExercise;