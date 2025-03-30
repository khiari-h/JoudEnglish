import { useCallback } from "react";
import { useNavigationControls } from "../../../../../hooks/common";

/**
 * Hook pour gérer la navigation dans les exercices de vocabulaire
 *
 * @param {Object} params - Paramètres du hook
 * @param {number} params.currentWordIndex - Index du mot actuel
 * @param {number} params.totalWords - Nombre total de mots
 * @param {Function} params.setCurrentWordIndex - Fonction pour changer l'index
 * @param {Function} params.setShowTranslation - Fonction pour afficher/masquer la traduction
 * @param {Function} params.resetAnimation - Fonction pour réinitialiser l'animation
 * @param {Function} params.markWordAsCompleted - Fonction pour marquer un mot comme complété
 * @param {Array} params.categories - Catégories de vocabulaire
 * @param {number} params.selectedCategoryIndex - Index de la catégorie sélectionnée
 * @param {Function} params.setSelectedCategoryIndex - Fonction pour changer la catégorie
 * @param {Object} params.completedWords - Mots complétés par catégorie
 * @param {Object} params.navigation - Objet de navigation
 * @returns {Object} Fonctions de navigation pour le vocabulaire
 */
export const useVocabularyNavigation = ({
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
  navigation,
}) => {
  // Fonction pour réinitialiser l'état avant le changement de mot
  const resetWordState = useCallback(() => {
    setShowTranslation(false);
    resetAnimation();
  }, [setShowTranslation, resetAnimation]);

  // Fonction personnalisée pour gérer le passage au mot suivant
  const handleWordComplete = useCallback(() => {
    // Marquer le mot actuel comme complété
    markWordAsCompleted();

    // Vérifier si tous les mots sont complétés
    const allCompleted = categories.every((category, index) => {
      return (completedWords[index]?.length || 0) === category.words.length;
    });

    if (allCompleted) {
      // Tous les exercices de vocabulaire sont terminés
      alert("All vocabulary exercises completed!");
      navigation.goBack();
    } else {
      // Trouver la prochaine catégorie avec des mots non complétés
      let nextCategoryIndex = (selectedCategoryIndex + 1) % categories.length;

      while (
        completedWords[nextCategoryIndex]?.length ===
          categories[nextCategoryIndex].words.length &&
        nextCategoryIndex !== selectedCategoryIndex
      ) {
        nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
      }

      if (nextCategoryIndex === selectedCategoryIndex) {
        // Si nous revenons à la même catégorie, tout est fait
        alert("All vocabulary exercises completed!");
        navigation.goBack();
      } else {
        // Demander de passer à la catégorie suivante
        if (
          confirm(
            `You've completed this category! Move to ${categories[nextCategoryIndex].title}?`
          )
        ) {
          setSelectedCategoryIndex(nextCategoryIndex);
          setCurrentWordIndex(0);
        } else {
          // Recommencer la catégorie actuelle
          setCurrentWordIndex(0);
        }
      }
    }
  }, [
    markWordAsCompleted,
    categories,
    selectedCategoryIndex,
    completedWords,
    setSelectedCategoryIndex,
    setCurrentWordIndex,
    navigation,
  ]);

  // Utiliser le hook générique pour la navigation de base
  const { goToNext, goToPrevious, handleGoBack, canGoToNext, canGoToPrevious } =
    useNavigationControls({
      navigation,
      currentIndex: currentWordIndex,
      totalItems: totalWords,
      setCurrentIndex: setCurrentWordIndex,
      resetState: resetWordState,
      onComplete: handleWordComplete,
    });

  // Fonction spécifique pour sélectionner directement un mot
  const handleWordSelection = useCallback(
    (index) => {
      setCurrentWordIndex(index);
      setShowTranslation(false);
      resetAnimation();
    },
    [setCurrentWordIndex, setShowTranslation, resetAnimation]
  );

  return {
    handleNext: goToNext,
    handlePrevious: goToPrevious,
    handleWordSelection,
    handleGoBack,
  };
};
