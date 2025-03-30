// src/components/screens/Exercises/VocabularyExercise/index.js
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Import des composants
import VocabularyHeader from "./components/VocabularyHeader";
import CategorySelector from "./components/CategorySelector";
import WordCard from "./components/WordCard";
import CardIndicators from "./components/CardIndicators";
import NavigationButtons from "./components/NavigationButtons";
import LearningTip from "./components/LearningTip";

// Import des hooks personnalisés
import { useAnimations, useExerciseState } from "../../../../hooks/common";
import useProgress from "../../../../hooks/useProgress";
import { getVocabularyDataByLevel } from "./utils/dataUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes"; // Ajout des constantes de types d'exercices

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de vocabulaire
 */
const VocabularyExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  // États spécifiques au vocabulaire
  const [vocabularyData, setVocabularyData] = useState({ categories: [] });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState({});

  // Animation pour la carte de vocabulaire
  const { fadeAnim, slideAnim, animateIn, resetAnimations } = useAnimations({
    initialValues: { fade: 0, slide: 50, scale: 1 },
  });

  // Charger les données de vocabulaire
  useEffect(() => {
    const data = getVocabularyDataByLevel(level);
    setVocabularyData(data);

    // Initialiser le suivi des mots complétés
    if (data && data.categories) {
      const initialCompletedWords = {};
      data.categories.forEach((_, index) => {
        initialCompletedWords[index] = [];
      });
      setCompletedWords(initialCompletedWords);
    }
  }, [level]);

  // Obtenir la catégorie et les mots actuels
  const currentCategory = vocabularyData.categories[selectedCategoryIndex] || {
    words: [],
  };

  // Fonction personnalisée pour marquer un mot comme appris
  const markWordAsLearned = (wordIndex) => {
    if (!completedWords[selectedCategoryIndex]?.includes(wordIndex)) {
      const newCompletedWords = { ...completedWords };

      if (!newCompletedWords[selectedCategoryIndex]) {
        newCompletedWords[selectedCategoryIndex] = [];
      }

      newCompletedWords[selectedCategoryIndex].push(wordIndex);
      setCompletedWords(newCompletedWords);

      // Mettre à jour la progression
      updateVocabularyProgress(newCompletedWords);

      return true;
    }
    return false;
  };

  // Mettre à jour la progression dans le système global
  const updateVocabularyProgress = (wordsData = completedWords) => {
    if (!vocabularyData || !vocabularyData.categories) return;

    let totalWords = 0;
    let completedWordsCount = 0;

    // Calculer le total et le nombre de mots complétés pour toutes les catégories
    vocabularyData.categories.forEach((category, categoryIndex) => {
      if (category.words) {
        totalWords += category.words.length;
        completedWordsCount += wordsData[categoryIndex]?.length || 0;
      }
    });

    // Mettre à jour la progression pour la catégorie actuelle
    const currentCategoryId =
      currentCategory.id || `category_${selectedCategoryIndex}`;
    updateProgress(
      `vocabulary_${level.toLowerCase()}_${currentCategoryId}`,
      EXERCISE_TYPES.VOCABULARY,
      level,
      wordsData[selectedCategoryIndex]?.length || 0,
      currentCategory.words?.length || 0
    );

    // Mettre à jour la progression globale pour le vocabulaire
    updateProgress(
      `vocabulary_${level.toLowerCase()}`,
      EXERCISE_TYPES.VOCABULARY,
      level,
      completedWordsCount,
      totalWords
    );
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
    canGoToPrevious,
  } = useExerciseState({
    type: EXERCISE_TYPES.VOCABULARY,
    level,
    exercises: currentCategory.words,
    navigation,
    autoSaveProgress: false, // Nous allons gérer manuellement la progression
  });

  // Réinitialiser l'animation quand le mot change
  useEffect(() => {
    resetAnimations();
    animateIn();
    setShowTranslation(false);
  }, [currentWordIndex, resetAnimations, animateIn]);

  // Fonction personnalisée pour passer au mot suivant et marquer le courant comme appris
  const handleNextWithProgress = () => {
    // Marquer le mot actuel comme appris
    markWordAsLearned(currentWordIndex);

    // Passer au mot suivant
    goToNextWord();
  };

  // Changer de catégorie
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      // Sauvegarder la progression avant de changer de catégorie
      updateVocabularyProgress();

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
          completedWords={completedWords[selectedCategoryIndex] || []}
          levelColor={levelColor}
          onSelectWord={setCurrentWordIndex}
        />

        {/* Carte de vocabulaire */}
        {currentWord && (
          <WordCard
            word={currentWord}
            showTranslation={showTranslation}
            onToggleTranslation={() => setShowTranslation(!showTranslation)}
            isCompleted={completedWords[selectedCategoryIndex]?.includes(
              currentWordIndex
            )}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            levelColor={levelColor}
          />
        )}

        {/* Conseil d'apprentissage */}
        <LearningTip
          tip={
            vocabularyData.tips?.[
              currentWordIndex % vocabularyData.tips?.length
            ]
          }
        />
      </ScrollView>

      {/* Boutons de navigation */}
      <NavigationButtons
        currentWordIndex={currentWordIndex}
        totalWords={currentCategory.words.length}
        handlePrevious={goToPreviousWord}
        handleNext={handleNextWithProgress}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default VocabularyExercise;
