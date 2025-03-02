import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();

  // Définir la couleur en fonction du niveau
  const getLevelColor = () => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor();

  // Liste complète des exercices
  const exercises = [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: "Learn new words and phrases",
      progress: 25,
      color: levelColor,
      icon: "📚",
    },
    {
      id: "grammar",
      title: "Grammar",
      description: "Practice grammar rules and structures",
      progress: 10,
      color: levelColor,
      icon: "📝",
    },
    {
      id: "chatbot",
      title: "Chatbot Writing",
      description: "Practice writing through simulated dialogues",
      progress: 0,
      color: levelColor,
      icon: "💬",
    },
    {
      id: "reading",
      title: "Reading",
      description: "Improve your reading comprehension",
      progress: 0,
      color: levelColor,
      icon: "📖",
    },
    {
      id: "error_correction",
      title: "Error Correction",
      description: "Identify and correct errors in texts",
      progress: 0,
      color: levelColor,
      icon: "✏️",
    },
    {
      id: "word_games",
      title: "Word Games",
      description: "Fun games based on vocabulary and grammar",
      progress: 0,
      color: levelColor,
      icon: "🎮",
    },
    {
      id: "phrases",
      title: "Phrases & Expressions",
      description: "Learn useful formulations in written context",
      progress: 0,
      color: levelColor,
      icon: "🗣️",
    },
    {
      id: "spelling",
      title: "Spelling Practice",
      description: "Work on spelling and punctuation",
      progress: 0,
      color: levelColor,
      icon: "🔤",
    },
    {
      id: "quizzes",
      title: "Quizzes & Challenges",
      description: "Test your knowledge with quizzes and challenges",
      progress: 0,
      color: levelColor,
      icon: "🏆",
    },
  ];

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
          <TouchableOpacity
            key={exercise.id}
            style={[
              styles.exerciseCard,
              {
                borderLeftWidth: 4,
                borderLeftColor: exercise.color,
                marginBottom: index === exercises.length - 1 ? 30 : 15,
              },
            ]}
            onPress={() => {
              // Navigation vers l'exercice approprié
              if (exercise.id === "vocabulary") {
                navigation.navigate("VocabularyExercise", { level });
              }
              // Ajouter d'autres navigations ici selon le type d'exercice
            }}
          >
            <View style={styles.exerciseTopSection}>
              <View
                style={[
                  styles.exerciseIconContainer,
                  { backgroundColor: `${exercise.color}15` },
                ]}
              >
                <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDescription}>
                  {exercise.description}
                </Text>
              </View>
            </View>

            {exercise.progress > 0 ? (
              <View style={styles.progressSection}>
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
                  <Text
                    style={[styles.progressText, { color: exercise.color }]}
                  >
                    {exercise.progress}%
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.newBadgeContainer}>
                <View
                  style={[
                    styles.newBadge,
                    { backgroundColor: `${exercise.color}15` },
                  ]}
                >
                  <Text
                    style={[styles.newBadgeText, { color: exercise.color }]}
                  >
                    New
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.startButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  { backgroundColor: exercise.color },
                ]}
                onPress={() => {
                  if (exercise.id === "vocabulary") {
                    navigation.navigate("VocabularyExercise", { level });
                  }
                  // Ajouter d'autres navigations ici
                }}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
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
  },
  heroSection: {
    padding: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  levelBadgeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  levelBadgeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: width * 0.8,
    lineHeight: 22,
  },
  exercisesContainer: {
    paddingHorizontal: 16,
  },
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  exerciseTopSection: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  exerciseIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  exerciseIcon: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginRight: 8,
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
    textAlign: "right",
  },
  newBadgeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  newBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  startButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  startButton: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});

export default ExerciseSelection;
