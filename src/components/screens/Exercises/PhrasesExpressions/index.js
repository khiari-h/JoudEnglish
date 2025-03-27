// src/components/screens/Exercises/PhrasesExpressions/index.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import PhraseHeader from './components/PhraseHeader';
import CategorySelector from './components/CategorySelector';
import ProgressBar from './components/ProgressBar';
import PhraseCard from './components/PhraseCard';
import NavigationButtons from './components/NavigationButtons';
import PhraseDetailModal from './components/PhraseDetailModal';

// Import des hooks personnalisés
import { useExerciseState } from '../../../hooks/common';
import { getPhrasesDataByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

const PhrasesExpressions = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // États spécifiques aux phrases et expressions
  const [phrasesData, setPhrasesData] = useState({ categories: [] });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  
  // Charger les données des phrases
  useEffect(() => {
    const data = getPhrasesDataByLevel(level);
    setPhrasesData(data);
  }, [level]);
  
  // Catégorie et phrases actuelles
  const currentCategory = phrasesData.categories[selectedCategoryIndex] || { phrases: [] };
  
  // Utiliser le hook générique d'exercice
  const {
    currentIndex: selectedPhraseIndex,
    setCurrentIndex: setSelectedPhraseIndex,
    currentExercise: currentPhrase,
    progress,
    levelColor,
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    isLastExercise: isLastPhrase
  } = useExerciseState({
    type: 'phrases',
    level,
    exercises: currentCategory.phrases,
    navigation
  });
  
  // Changer de catégorie
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setSelectedPhraseIndex(0);
    }
  };
  
  // Ouvrir les détails d'une phrase
  const openPhraseDetails = (phrase) => {
    setSelectedPhrase(phrase);
  };
  
  // Fermer les détails
  const closePhraseDetails = () => {
    setSelectedPhrase(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <PhraseHeader
        level={level}
        levelColor={levelColor}
        onGoBack={handleGoBack}
      />

      {/* Sélecteur de catégories */}
      <CategorySelector
        categories={phrasesData.categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <ProgressBar
        currentIndex={selectedPhraseIndex}
        totalCount={currentCategory.phrases.length}
        levelColor={levelColor}
      />

      {/* Contenu principal */}
      <ScrollView
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Phrase courante */}
        <PhraseCard
          categoryName={currentCategory.name}
          phrase={currentPhrase}
          onShowDetails={() => openPhraseDetails(currentPhrase)}
        />
      </ScrollView>

      {/* Boutons de navigation */}
      <NavigationButtons
        onPrevious={goToPrevious}
        onNext={goToNext}
        canGoToPrevious={canGoToPrevious}
        canGoToNext={canGoToNext}
        levelColor={levelColor}
      />

      {/* Modal de détails */}
      <PhraseDetailModal
        phrase={selectedPhrase}
        visible={!!selectedPhrase}
        onClose={closePhraseDetails}
      />
    </SafeAreaView>
  );
};

export default PhrasesExpressions;