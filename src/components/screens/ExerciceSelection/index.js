// ExerciseSelection/index.js - Version avec le nouveau ExerciseCardItem
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExerciseCardItem from "./ExerciseCardItem";
import { getLevelColor, getExercises, exerciseRoutes } from "./data";
import styles from "./style";
import useProgress from "../../../hooks/useProgress";

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();
  const [exercisesWithProgress, setExercisesWithProgress] = useState([]);

  // Utiliser le hook de progression pour obtenir les données
  const { getExerciseTypeProgress } = useProgress();

  // Obtenir la couleur du niveau
  const levelColor = getLevelColor(level);

  // Mémoriser les exercices de base pour éviter de les recalculer à chaque rendu
  const baseExercises = useMemo(() => getExercises(levelColor), [levelColor]);

  // Créer une version stable de la fonction getExerciseTypeProgress
  const stableGetProgress = useCallback(
    (type, level) => {
      return getExerciseTypeProgress(type, level);
    },
    [getExerciseTypeProgress]
  );

  // Charger les exercices avec leur progression
  useEffect(() => {
    // Enrichir avec les données de progression
    const updatedExercises = baseExercises.map((exercise) => {
      // Obtenir la progression pour ce type d'exercice et ce niveau
      const progress = stableGetProgress(exercise.id, level) || 0;

      // Renvoyer l'exercice avec sa progression réelle
      return {
        ...exercise,
        progress,
      };
    });

    setExercisesWithProgress(updatedExercises);

    // Pour le débogage - vérifier si nous avons des données
    console.log("Exercises with progress:", updatedExercises);
  }, [level, baseExercises, stableGetProgress]);

  // Fonction pour naviguer vers l'exercice approprié
  const navigateToExercise = (exerciseId) => {
    const routeName = exerciseRoutes[exerciseId];

    if (routeName) {
      navigation.navigate(routeName, { level });
    } else {
      alert("Ce module n'est pas encore disponible.");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: `${levelColor}05` }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Choose an Exercise</Text>
        <Text style={styles.heroSubtitle}>
          Select an activity to improve your language skills
        </Text>
      </View>

      {/* Message de débogage pour vérifier si des exercices sont disponibles */}
      {exercisesWithProgress.length === 0 && (
        <Text style={{ textAlign: "center", padding: 20, color: "#666" }}>
          Loading exercises...
        </Text>
      )}

      <View style={styles.exercisesContainer}>
        {exercisesWithProgress.map((exercise, index) => (
          <ExerciseCardItem
            key={exercise.id}
            exercise={exercise}
            isLast={index === exercisesWithProgress.length - 1}
            onPress={() => navigateToExercise(exercise.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExerciseSelection;
