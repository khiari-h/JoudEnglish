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
import useProgress from '../../../hooks/useProgress'; // Ajout du hook de progression
import { getPhrasesDataByLevel } from './utils/dataUtils';
import { EXERCISE_TYPES } from '../../../constants/exercicesTypes'; // Ajout des constantes de types d'exercices

// Import des styles
import styles from './style';

const PhrasesExpressions = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Utiliser le hook de progression
  const { updateProgress } = useProgress();
  
  // États spécifiques aux phrases et expressions
  const [phrasesData, setPhrasesData] = useState({ categories: [] });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [viewedPhrases, setViewedPhrases] = useState({});
  
  // Charger les données des phrases
  useEffect(() => {
    const data = getPhrasesDataByLevel(level);
    setPhrasesData(data);
    
    // Initialiser le suivi des phrases vues
    if (data && data.categories) {
      const initialViewedPhrases = {};
      data.categories.forEach((_, index) => {
        initialViewedPhrases[index] = [];
      });
      setViewedPhrases(initialViewedPhrases);
    }
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
    type: EXERCISE_TYPES.PHRASES,
    level,
    exercises: currentCategory.phrases,
    navigation,
    autoSaveProgress: false // Nous allons gérer manuellement la progression
  });
  
  // Fonction pour marquer une phrase comme vue et mettre à jour la progression
  const markPhraseAsViewed = (phraseIndex = selectedPhraseIndex) => {
    if (!viewedPhrases[selectedCategoryIndex]?.includes(phraseIndex)) {
      // Mettre à jour l'état local des phrases vues
      const newViewedPhrases = { ...viewedPhrases };
      
      if (!newViewedPhrases[selectedCategoryIndex]) {
        newViewedPhrases[selectedCategoryIndex] = [];
      }
      
      newViewedPhrases[selectedCategoryIndex].push(phraseIndex);
      setViewedPhrases(newViewedPhrases);
      
      // Mettre à jour la progression
      updatePhrasesProgress(newViewedPhrases);
    }
  };
  
  // Mettre à jour la progression des phrases et expressions
  const updatePhrasesProgress = (phrasesData = viewedPhrases) => {
    if (!phrasesData.categories) return;
    
    // Pour la catégorie actuelle
    const currentCategoryId = currentCategory.id || `category_${selectedCategoryIndex}`;
    const currentCategoryPhrasesViewed = phrasesData[selectedCategoryIndex]?.length || 0;
    const currentCategoryPhrasesTotal = currentCategory.phrases?.length || 0;
    
    // Mettre à jour la progression pour cette catégorie spécifique
    if (currentCategoryPhrasesTotal > 0) {
      updateProgress(
        `phrases_${level.toLowerCase()}_${currentCategoryId}`,
        EXERCISE_TYPES.PHRASES,
        level,
        currentCategoryPhrasesViewed,
        currentCategoryPhrasesTotal
      );
    }
    
    // Calculer la progression globale pour toutes les catégories
    let totalAllPhrases = 0;
    let viewedAllPhrases = 0;
    
    phrasesData.categories?.forEach((category, categoryIndex) => {
      if (category.phrases) {
        totalAllPhrases += category.phrases.length;
        viewedAllPhrases += phrasesData[categoryIndex]?.length || 0;
      }
    });
    
    // Mettre à jour la progression globale des phrases et expressions
    if (totalAllPhrases > 0) {
      updateProgress(
        `phrases_${level.toLowerCase()}`,
        EXERCISE_TYPES.PHRASES,
        level,
        viewedAllPhrases,
        totalAllPhrases
      );
    }
  };
  
  // Fonction personnalisée pour passer à la phrase suivante et mettre à jour la progression
  const handleNext = () => {
    // Marquer la phrase actuelle comme vue
    markPhraseAsViewed();
    
    // Passer à la phrase suivante
    goToNext();
  };
  
  // Changer de catégorie
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      // Sauvegarder la progression avant de changer de catégorie
      markPhraseAsViewed();
      
      setSelectedCategoryIndex(index);
      setSelectedPhraseIndex(0);
    }
  };
  
  // Ouvrir les détails d'une phrase et la marquer comme vue
  const openPhraseDetails = (phrase) => {
    // Marquer la phrase comme vue quand on ouvre les détails
    markPhraseAsViewed();
    
    setSelectedPhrase(phrase);
  };
  
  // Fermer les détails
  const closePhraseDetails = () => {
    setSelectedPhrase(null);
  };
  
  // Mettre à jour la progression quand la phrase change
  useEffect(() => {
    // Marquer la phrase comme vue après un court délai
    const timer = setTimeout(() => {
      markPhraseAsViewed();
    }, 2000); // Supposons qu'après 2 secondes, l'utilisateur a "vu" la phrase
    
    return () => clearTimeout(timer);
  }, [selectedPhraseIndex, selectedCategoryIndex]);

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
          isViewed={viewedPhrases[selectedCategoryIndex]?.includes(selectedPhraseIndex)}
        />
      </ScrollView>

      {/* Boutons de navigation */}
      <NavigationButtons
        onPrevious={goToPrevious}
        onNext={handleNext} // Utiliser notre fonction personnalisée
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