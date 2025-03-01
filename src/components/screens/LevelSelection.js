// src/components/screens/LevelSelection.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LevelSelection = () => {
  const navigation = useNavigation();

  const levels = [
    {
      id: "a1",
      name: "A1",
      title: "Beginner",
      description: "Basic communication, simple daily phrases",
      progress: 25,
      status: "current",
      color: "#3b82f6",
    },
    {
      id: "a2",
      name: "A2",
      title: "Elementary",
      description: "Simple expressions, everyday conversations",
      progress: 0,
      status: "locked",
      color: "#8b5cf6",
    },
    {
      id: "b1",
      name: "B1",
      title: "Intermediate",
      description: "Clear communication on familiar matters",
      progress: 0,
      status: "locked",
      color: "#10b981",
    },
    {
      id: "b2",
      name: "B2",
      title: "Upper Intermediate",
      description: "Complex communication, technical discussions",
      progress: 0,
      status: "locked",
      color: "#f59e0b",
    },
    {
      id: "c1",
      name: "C1",
      title: "Advanced",
      description: "Fluent expression, complicated subject matter",
      progress: 0,
      status: "locked",
      color: "#ef4444",
    },
    {
      id: "c2",
      name: "C2",
      title: "Proficiency",
      description: "Near-native proficiency, mastery of complex language",
      progress: 0,
      status: "locked",
      color: "#6366f1",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Level</Text>
        <Text style={styles.headerSubtitle}>
          Select a level to start learning
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.levelCard,
              level.status === "locked" && styles.lockedCard,
            ]}
            onPress={() => {
              if (level.status !== "locked") {
                navigation.navigate("ExerciseSelection", { level: level.name });
              }
            }}
            disabled={level.status === "locked"}
          >
            <View style={styles.levelHeader}>
              <View
                style={[
                  styles.levelBadge,
                  { backgroundColor: `${level.color}20` },
                ]}
              >
                <Text style={[styles.levelBadgeText, { color: level.color }]}>
                  {level.name}
                </Text>
              </View>

              <View style={styles.levelTitleContainer}>
                <Text style={styles.levelTitle}>{level.title}</Text>
                <Text style={styles.levelDescription}>{level.description}</Text>
              </View>

              {level.status === "locked" && (
                <View style={styles.lockIconContainer}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}
            </View>

            {level.status !== "locked" && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${level.progress}%`,
                        backgroundColor: level.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: level.color }]}>
                  {level.progress}%
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  {
                    backgroundColor:
                      level.status === "locked" ? "#d1d5db" : level.color,
                  },
                ]}
                disabled={level.status === "locked"}
                onPress={() => {
                  if (level.status !== "locked") {
                    navigation.navigate("ExerciseSelection", {
                      level: level.name,
                    });
                  }
                }}
              >
                <Text style={styles.startButtonText}>
                  {level.status === "locked" ? "Locked" : "Start Learning"}
                </Text>
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  levelsContainer: {
    padding: 16,
  },
  levelCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.7,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  levelBadgeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  levelTitleContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  lockIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  lockIcon: {
    fontSize: 18,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    width: 40,
    textAlign: "right",
  },
  buttonContainer: {
    alignItems: "center",
  },
  startButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LevelSelection;
