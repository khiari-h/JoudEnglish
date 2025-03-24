import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import des hooks
import usePhrases from "./hooks/usePhrases";
import usePhraseNavigation from "./hooks/usePhraseNavigation";

// Import des composants
import PhraseHeader from "./components/PhraseHeader";
import CategorySelector from "./components/CategorySelector";
import ProgressBar from "./components/ProgressBar";
import PhraseCard from "./components/PhraseCard";
import NavigationButtons from "./components/NavigationButtons";
import PhraseDetailModal from "./components/PhraseDetailModal";

// Import des utilitaires
import { getLevelColor } from "./utils/levelUtils";

// Import des styles
import styles from "./style";

const PhrasesExpressions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Obtenir la couleur du niveau
  const levelColor = getLevelColor(level);

  // Utiliser les hooks personnalisés
  const {
    phrasesData,
    selectedCategoryIndex,
    selectedPhraseIndex,
    selectedPhrase,
    currentCategory,
    currentPhrases,
    currentPhrase,
    setSelectedCategoryIndex,
    setSelectedPhraseIndex,
    setSelectedPhrase,
  } = usePhrases(level);

  const {
    handleGoBack,
    goToPreviousPhrase,
    goToNextPhrase,
    canGoToPrevious,
    canGoToNext,
    openPhraseDetails,
    closePhraseDetails,
  } = usePhraseNavigation({
    navigation,
    selectedPhraseIndex,
    setSelectedPhraseIndex,
    currentPhrases,
    setSelectedPhrase,
  });

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
        onSelectCategory={(index) => {
          setSelectedCategoryIndex(index);
          setSelectedPhraseIndex(0);
        }}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <ProgressBar
        currentIndex={selectedPhraseIndex}
        totalCount={currentPhrases.length}
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
        onPrevious={goToPreviousPhrase}
        onNext={goToNextPhrase}
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