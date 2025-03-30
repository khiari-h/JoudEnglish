// src/components/screens/Exercises/VocabularyExercise/index.js
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Import des composants
import VocabularyHeader from "./components/VocabularyHeader";
import CategorySelector from "./components/CategorySelector";
import WordCard from "./components/WordCard";
import CardIndicators from "./components/CardIndicators";
import NavigationButtons from "./components/NavigationButtons";
import LearningTip from "./components/LearningTip";

// Import du hook principal
import { useVocabularyExercise } from "./hooks/useVocabularyExercise";

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de vocabulaire
 * Version simplifiée utilisant le hook useVocabularyExercise
 */
const VocabularyExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Utiliser le hook principal qui centralise toute la logique
  const {
    // État
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
    
    // Données
    vocabularyData,
    currentCategory,
    currentWord,
    totalWords,
    
    // Actions
    toggleTranslation,
    dismissTip,
    handleCategoryChange,
    handleWordSelection,
    handleNext,
    handlePrevious,
    isCurrentWordCompleted
  } = useVocabularyExercise(level, navigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <VocabularyHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title={`Vocabulary: ${currentCategory?.title || ""}`}
      />

      {/* Sélecteur de catégorie */}
      <CategorySelector
        categories={vocabularyData?.categories || []}
        selectedCategoryIndex={selectedCategoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Indicateurs de mots */}
        <CardIndicators
          totalWords={totalWords}
          currentIndex={currentWordIndex}
          completedWords={completedWords[selectedCategoryIndex] || []}
          levelColor={levelColor}
          onSelectWord={handleWordSelection}
        />

        {/* Carte de vocabulaire */}
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

        {/* Conseil d'apprentissage */}
        {showTip && (
          <LearningTip
            tipFadeAnim={tipFadeAnim}
            dismissTip={dismissTip}
            tip={vocabularyData?.tips?.[currentWordIndex % (vocabularyData?.tips?.length || 1)]}
          />
        )}
      </ScrollView>

      {/* Boutons de navigation */}
      <NavigationButtons
        currentWordIndex={currentWordIndex}
        totalWords={totalWords}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default VocabularyExercise;