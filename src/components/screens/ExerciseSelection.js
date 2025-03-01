// src/components/screens/ExerciseSelection.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();

  // Exemple de modules d'exercices
  const exercises = [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: "Learn new words and phrases",
      progress: 25,
      color: "#3b82f6",
    },
    {
      id: "grammar",
      title: "Grammar",
      description: "Practice grammar rules and structures",
      progress: 10,
      color: "#10b981",
    },
    {
      id: "reading",
      title: "Reading",
      description: "Improve your reading comprehension",
      progress: 0,
      color: "#f59e0b",
    },
    // ... autres exercices
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.levelBadge}>Level {level}</Text>
        <Text style={styles.subtitle}>Select an exercise to begin</Text>
      </View>

      <View style={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => {
              if (exercise.id === "vocabulary") {
                navigation.navigate("VocabularyExercise", { level });
              }
              // Navigation vers d'autres exercices...
            }}
          >
            <View
              style={[
                styles.exerciseIcon,
                { backgroundColor: `${exercise.color}20` },
              ]}
            >
              <View
                style={[styles.iconInner, { backgroundColor: exercise.color }]}
              />
            </View>

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>
                {exercise.description}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${exercise.progress}%`,
                        backgroundColor: exercise.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{exercise.progress}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  levelBadge: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3b82f6",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
  },
  exercisesContainer: {
    padding: 15,
  },
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  iconInner: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    width: 35,
  },
});

export default ExerciseSelection;
