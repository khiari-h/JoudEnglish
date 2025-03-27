// src/components/screens/Exercises/VocabularyExercise/index.js
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import VocabularyHeader from './components/VocabularyHeader';
import CategorySelector from './components/CategorySelector';
import WordCard from './components/WordCard';
import CardIndicators from './components/CardIndicators';
import NavigationButtons from './components/NavigationButtons';
import LearningTip from './components/LearningTip';

// Import des hooks personnalisés
import { useAnimations, useExerciseState } from '../../../hooks/common';
import { getVocabularyDataByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de vocabulaire
 */
const VocabularyExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };

  // États spécifiques au vocabulaire
  const [vocabularyData, setVocabularyData] = useState({ categories: [] });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  
  // Animation pour la carte de vocabulaire
  const { fadeAnim, slideAnim, animateIn, resetAnimations } = useAnimations({
    initialValues: { fade: 0, slide: 50, scale: 1 }
  });

  // Charger les données de vocabulaire
  useEffect(() => {
    const data = getVocabularyDataByLevel(level);
    setVocabularyData(data);
  }, [level]);

  // Obtenir la catégorie et les mots actuels
  const currentCategory = vocabularyData.categories[selectedCategoryIndex] || { words: [] };
  
  // Fonction personnalisée pour marquer un mot comme appris
  const markWordAsLearned = (word) => {
    // Logique pour marquer un mot comme appris
    return true;
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex: currentWordIndex,
    setCurrentIndex: setCurrentWordIndex,
    currentExercise: currentWord,
    progress,
    levelColor,
    isLastExercise: isLastWord,
    goToNext: goToNextWord,
    goToPrevious: goToPreviousWord,
    handleGoBack,
    canGoToNext,
    canGoToPrevious
  } = useExerciseState({
    type: 'vocabulary',
    level,
    exercises: currentCategory.words,
    navigation
  });

  // Réinitialiser l'animation quand le mot change
  useEffect(() => {
    resetAnimations();
    animateIn();
    setShowTranslation(false);
  }, [currentWordIndex, resetAnimations, animateIn]);

  // Changer de catégorie
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setCurrentWordIndex(0);
      setShowTranslation(false);
      resetAnimations();
      animateIn();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <VocabularyHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title={`Vocabulary: ${currentCategory.title || ""}`}
      />

      {/* Sélecteur de catégorie */}
      <CategorySelector
        categories={vocabularyData.categories}
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
          totalWords={currentCategory.words.length}
          currentIndex={currentWordIndex}
          levelColor={levelColor}
          onSelectWord={setCurrentWordIndex}
        />

        {/* Carte de vocabulaire */}
        {currentWord && (
          <WordCard
            word={currentWord}
            showTranslation={showTranslation}
            onToggleTranslation={() => setShowTranslation(!showTranslation)}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            levelColor={levelColor}
          />
        )}

        {/* Conseil d'apprentissage */}
        <LearningTip tip={vocabularyData.tips?.[currentWordIndex % vocabularyData.tips.length]} />
      </ScrollView>

      {/* Boutons de navigation */}
      <NavigationButtons
        currentWordIndex={currentWordIndex}
        totalWords={currentCategory.words.length}
        handlePrevious={goToPreviousWord}
        handleNext={goToNextWord}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default VocabularyExercise;