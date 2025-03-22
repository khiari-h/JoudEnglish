import useProgress from './useProgress';

/**
 * Hook pour gérer un type d'exercice spécifique
 * @param {string} type - Type d'exercice (vocabulary, grammar, etc.)
 * @returns {Object} Fonctions spécifiques au type d'exercice
 */
const useExerciseType = (type) => {
  const { 
    getExerciseTypeProgress, 
    getExerciseProgress, 
    updateProgress 
  } = useProgress();

  /**
   * Récupère la progression pour un niveau
   * @param {string} level - Niveau (A1, A2, etc.)
   * @returns {number} Pourcentage de progression
   */
  const getProgressByLevel = (level) => {
    return getExerciseTypeProgress(type, level);
  };

  /**
   * Récupère la progression pour un exercice spécifique
   * @param {string} level - Niveau (A1, A2, etc.)
   * @param {string} topic - Sujet/thème de l'exercice
   * @returns {Object|null} Progression de l'exercice ou null
   */
  const getExerciseByTopic = (level, topic) => {
    const exerciseId = `${type}_${level.toLowerCase()}_${topic.replace(/\s+/g, '_').toLowerCase()}`;
    return getExerciseProgress(exerciseId);
  };

  /**
   * Met à jour la progression d'un exercice
   * @param {string} level - Niveau (A1, A2, etc.)
   * @param {string} topic - Sujet/thème de l'exercice
   * @param {number} completed - Nombre d'éléments complétés
   * @param {number} total - Nombre total d'éléments
   */
  const updateExerciseProgress = (level, topic, completed, total) => {
    const exerciseId = `${type}_${level.toLowerCase()}_${topic.replace(/\s+/g, '_').toLowerCase()}`;
    updateProgress(exerciseId, type, level, completed, total);
  };

  /**
   * Génère un identifiant d'exercice
   * @param {string} level - Niveau (A1, A2, etc.)
   * @param {string} topic - Sujet/thème de l'exercice
   * @returns {string} Identifiant de l'exercice
   */
  const generateExerciseId = (level, topic) => {
    return `${type}_${level.toLowerCase()}_${topic.replace(/\s+/g, '_').toLowerCase()}`;
  };

  return {
    type,
    getProgressByLevel,
    getExerciseByTopic,
    updateExerciseProgress,
    generateExerciseId
  };
};

export default useExerciseType;