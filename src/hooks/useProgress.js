import { useProgressContext } from "../contexts/ProgressContext";
import { useNavigation } from "@react-navigation/native";
import { EXERCISE_ROUTES } from "../constants/exercicesTypes";
import { useCallback } from "react";

export const useProgress = () => {
  const { progressData, isLoading, updateExerciseProgress } =
    useProgressContext();
  const navigation = useNavigation();

  // Mémoriser les fonctions pour qu'elles conservent la même référence
  const getLastActivity = useCallback(() => {
    return progressData?.lastActivity;
  }, [progressData?.lastActivity]);

  const getLevelProgress = useCallback(
    (level) => {
      return progressData?.levelProgress?.[level] || 0;
    },
    [progressData?.levelProgress]
  );

  const getAllLevelProgress = useCallback(() => {
    return progressData?.levelProgress || {};
  }, [progressData?.levelProgress]);

  const getExerciseTypeProgress = useCallback(
    (type, level) => {
      return progressData?.exerciseTypeProgress?.[level]?.[type] || 0;
    },
    [progressData?.exerciseTypeProgress]
  );

  const getExerciseProgress = useCallback(
    (exerciseId) => {
      return progressData?.exerciseProgress?.[exerciseId] || null;
    },
    [progressData?.exerciseProgress]
  );

  // Fonction pour reprendre la dernière activité
  const resumeLastActivity = useCallback(() => {
    const activity = getLastActivity();
    if (!activity) return;

    // Utilisation du mapping EXERCISE_ROUTES pour éviter la duplication
    const route = EXERCISE_ROUTES[activity.type];

    if (route) {
      navigation.navigate(route, {
        level: activity.level,
        exerciseId: activity.id,
      });
    }
  }, [getLastActivity, navigation]);

  // Fonction pour mettre à jour la progression
  const updateProgress = useCallback(
    (exerciseId, type, level, completed, total) => {
      if (typeof updateExerciseProgress === "function") {
        updateExerciseProgress(exerciseId, type, level, completed, total);
      } else {
        console.warn("updateExerciseProgress is not available");
      }
    },
    [updateExerciseProgress]
  );

  return {
    isLoading,
    getLastActivity,
    getLevelProgress,
    getAllLevelProgress,
    getExerciseTypeProgress,
    getExerciseProgress,
    updateProgress,
    resumeLastActivity,
  };
};

export default useProgress;
