// ExerciseSelection/index.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExerciseCard from "./ExerciceCard";
import { getLevelColor, getExercises, exerciseRoutes } from "./data";
import styles from "./style";

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();

  // Obtenir la couleur du niveau et la liste des exercices
  const levelColor = getLevelColor(level);
  const exercises = getExercises(levelColor);

  // Fonction pour naviguer vers l'exercice approprié
  const navigateToExercise = (exerciseId) => {
    const routeName = exerciseRoutes[exerciseId];

    if (routeName) {
      navigation.navigate(routeName, { level });
    } else {
      // Fallback au cas où l'ID ne correspond à aucun exercice connu
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
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isLast={index === exercises.length - 1}
            onPress={() => navigateToExercise(exercise.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExerciseSelection;
