import { useProgressContext } from '../contexts/ProgressContext';
import { useNavigation } from '@react-navigation/native';
import { EXERCISE_ROUTES } from '../constants/exercicesTypes';

/**
 * Hook principal pour accéder et manipuler les données de progression
 * @returns {Object} Fonctions et données pour gérer la progression
 */
export const useProgress = () => {
  const { progressData, isLoading, updateExerciseProgress } = useProgressContext();
  const navigation = useNavigation();

  /**
   * Récupère la dernière activité de l'utilisateur
   * @returns {Object|null} Dernière activité ou null
   */
  const getLastActivity = () => {
    return progressData.lastActivity;
  };

  /**
   * Récupère la progression d'un niveau spécifique
   * @param {string} level - Le niveau (A1, A2, etc.)
   * @returns {number} Pourcentage de progression
   */
  const getLevelProgress = (level) => {
    return progressData.levelProgress[level] || 0;
  };

  /**
   * Récupère la progression de tous les niveaux
   * @returns {Object} Progression par niveau
   */
  const getAllLevelProgress = () => {
    return progressData.levelProgress;
  };

  /**
   * Récupère la progression d'un type d'exercice dans un niveau
   * @param {string} type - Type d'exercice (vocabulary, grammar, etc.)
   * @param {string} level - Niveau (A1, A2, etc.)
   * @returns {number} Pourcentage de progression
   */
  const getExerciseTypeProgress = (type, level) => {
    return progressData.exerciseTypeProgress[level]?.[type] || 0;
  };

  /**
   * Récupère la progression d'un exercice spécifique
   * @param {string} exerciseId - Identifiant de l'exercice
   * @returns {Object|null} Données de progression ou null
   */
  const getExerciseProgress = (exerciseId) => {
    return progressData.exerciseProgress[exerciseId] || null;
  };

  /**
   * Reprend la dernière activité
   */
  const resumeLastActivity = () => {
    const activity = getLastActivity();
    if (!activity) return;

    // Utilisation du mapping EXERCISE_ROUTES pour éviter la duplication
    const route = EXERCISE_ROUTES[activity.type];
    
    if (route) {
      navigation.navigate(route, { 
        level: activity.level, 
        exerciseId: activity.id
      });
    }
  };

  /**
   * Met à jour la progression d'un exercice
   * @param {string} exerciseId - Identifiant de l'exercice
   * @param {string} type - Type d'exercice
   * @param {string} level - Niveau
   * @param {number} completed - Nombre d'éléments complétés
   * @param {number} total - Nombre total d'éléments
   */
  const updateProgress = (exerciseId, type, level, completed, total) => {
    updateExerciseProgress(exerciseId, type, level, completed, total);
  };

  return {
    isLoading,
    getLastActivity,
    getLevelProgress,
    getAllLevelProgress,
    getExerciseTypeProgress,
    getExerciseProgress,
    updateProgress,
    resumeLastActivity
  };
};

export default useProgress;