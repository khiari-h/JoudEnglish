// src/hooks/useSpellingExercise.js
import useExerciseType from "../../../../../hooks/useExerciceType";
import { EXERCISE_TYPES } from "../../../../../constants/exercicesTypes";

/**
 * Hook personnalisé pour les exercices d'orthographe
 * Fournit des méthodes spécifiques pour les exercices d'orthographe
 *
 * @returns {Object} Méthodes et propriétés pour les exercices d'orthographe
 */
const useSpellingExercise = () => {
  // Utiliser le hook de base avec le type "spelling"
  const baseHook = useExerciseType(EXERCISE_TYPES.SPELLING);

  /**
   * Récupère la progression pour les règles d'orthographe d'un niveau spécifique
   * @param {string} level - Niveau (A1, A2, etc.)
   * @returns {Object|null} Données de progression ou null
   */
  const getRulesProgress = (level) => {
    const exerciseId = `spelling_rules_${level.toLowerCase()}`;
    return baseHook.getExerciseByTopic(level, "rules");
  };

  /**
   * Récupère la progression pour les exercices de correction d'un niveau spécifique
   * @param {string} level - Niveau (A1, A2, etc.)
   * @returns {Object|null} Données de progression ou null
   */
  const getCorrectionProgress = (level) => {
    const exerciseId = `spelling_correction_${level.toLowerCase()}`;
    return baseHook.getExerciseByTopic(level, "correction");
  };

  /**
   * Met à jour la progression des règles d'orthographe
   * @param {string} level - Niveau (A1, A2, etc.)
   * @param {number} completed - Nombre d'exercices complétés
   * @param {number} total - Nombre total d'exercices
   */
  const updateRulesProgress = (level, completed, total) => {
    const exerciseId = `spelling_rules_${level.toLowerCase()}`;
    baseHook.updateExerciseProgress(level, "rules", completed, total);

    // Mettre également à jour la progression globale d'orthographe
    updateGlobalSpellingProgress(level);
  };

  /**
   * Met à jour la progression des exercices de correction
   * @param {string} level - Niveau (A1, A2, etc.)
   * @param {number} completed - Nombre d'exercices complétés
   * @param {number} total - Nombre total d'exercices
   */
  const updateCorrectionProgress = (level, completed, total) => {
    const exerciseId = `spelling_correction_${level.toLowerCase()}`;
    baseHook.updateExerciseProgress(level, "correction", completed, total);

    // Mettre également à jour la progression globale d'orthographe
    updateGlobalSpellingProgress(level);
  };

  /**
   * Met à jour la progression globale de l'orthographe pour un niveau
   * en combinant les progressions des règles et de la correction
   * @param {string} level - Niveau (A1, A2, etc.)
   */
  const updateGlobalSpellingProgress = (level) => {
    // Récupérer les progressions des deux types d'exercices
    const rulesProgress = getRulesProgress(level);
    const correctionProgress = getCorrectionProgress(level);

    let totalCompleted = 0;
    let totalExercises = 0;

    // Additionner les exercices de règles
    if (rulesProgress) {
      totalCompleted += rulesProgress.completed || 0;
      totalExercises += rulesProgress.total || 0;
    }

    // Additionner les exercices de correction
    if (correctionProgress) {
      totalCompleted += correctionProgress.completed || 0;
      totalExercises += correctionProgress.total || 0;
    }

    // Mettre à jour la progression globale si des données sont disponibles
    if (totalExercises > 0) {
      const exerciseId = `spelling_${level.toLowerCase()}`;
      baseHook.updateProgress(
        exerciseId,
        EXERCISE_TYPES.SPELLING,
        level,
        totalCompleted,
        totalExercises
      );
    }
  };

  /**
   * Récupère la progression globale de l'orthographe pour un niveau
   * @param {string} level - Niveau (A1, A2, etc.)
   * @returns {number} Pourcentage de progression (0-100)
   */
  const getSpellingProgress = (level) => {
    return baseHook.getProgressByLevel(level);
  };

  return {
    ...baseHook, // Inclure toutes les méthodes du hook de base
    getRulesProgress,
    getCorrectionProgress,
    updateRulesProgress,
    updateCorrectionProgress,
    updateGlobalSpellingProgress,
    getSpellingProgress,
  };
};

export default useSpellingExercise;
