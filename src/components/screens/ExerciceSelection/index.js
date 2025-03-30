// ExerciseSelection/index.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExerciseCard from "./ExerciceCard";
import { getLevelColor, getExercises, exerciseRoutes } from "./data";
import styles from "./style";
import useProgress from "../../hooks/useProgress"; // Importez le hook de progression

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();
  const [exercisesWithProgress, setExercisesWithProgress] = useState([]);
  
  // Utiliser le hook de progression pour obtenir les données
  const { getExerciseTypeProgress } = useProgress();

  // Obtenir la couleur du niveau
  const levelColor = getLevelColor(level);
  
  // Charger les exercices avec leur progression
  useEffect(() => {
    // Récupérer la liste statique des exercices
    const baseExercises = getExercises(levelColor);
    
    // Enrichir avec les données de progression
    const updatedExercises = baseExercises.map(exercise => {
      // Obtenir la progression pour ce type d'exercice et ce niveau
      const progress = getExerciseTypeProgress(exercise.id, level) || 0;
      
      // Renvoyer l'exercice avec sa progression réelle
      return {
        ...exercise,
        progress
      };
    });
    
    setExercisesWithProgress(updatedExercises);
  }, [level, levelColor, getExerciseTypeProgress]);

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

      <View style={styles.exercisesContainer}>
        {exercisesWithProgress.map((exercise, index) => (
          <ExerciseCard
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