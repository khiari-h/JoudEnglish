import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
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
      color: "#3b82f6",
      icon: "🔤",
    },
    {
      id: "a2",
      name: "A2",
      title: "Elementary",
      description: "Simple expressions, everyday conversations",
      progress: 0,
      color: "#8b5cf6",
      icon: "💬",
    },
    {
      id: "b1",
      name: "B1",
      title: "Intermediate",
      description: "Clear communication on familiar matters",
      progress: 0,
      color: "#10b981",
      icon: "📝",
    },
    {
      id: "b2",
      name: "B2",
      title: "Upper Intermediate",
      description: "Complex communication, technical discussions",
      progress: 0,
      color: "#f59e0b",
      icon: "🗣️",
    },
    {
      id: "c1",
      name: "C1",
      title: "Advanced",
      description: "Fluent expression, complicated subject matter",
      progress: 0,
      color: "#ef4444",
      icon: "📚",
    },
    {
      id: "c2",
      name: "C2",
      title: "Proficiency",
      description: "Near-native proficiency, mastery of complex language",
      progress: 0,
      color: "#6366f1",
      icon: "🎓",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          Choose any level to start your learning journey
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levels.map((level, index) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.levelCard,
              {
                borderLeftWidth: 5,
                borderLeftColor: level.color,
              },
            ]}
            onPress={() => {
              navigation.navigate("ExerciseSelection", { level: level.name });
            }}
          >
            <View style={styles.levelContent}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${level.color}15` },
                ]}
              >
                <Text style={styles.levelIcon}>{level.icon}</Text>
              </View>

              <View style={styles.levelInfo}>
                <View style={styles.levelHeader}>
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: level.color },
                    ]}
                  >
                    <Text style={styles.levelBadgeText}>{level.name}</Text>
                  </View>
                  <Text style={styles.levelTitle}>{level.title}</Text>
                </View>

                <Text style={styles.levelDescription}>{level.description}</Text>

                {level.progress > 0 && (
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
                    <Text style={styles.progressText}>{level.progress}%</Text>
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: level.color }]}
              onPress={() => {
                navigation.navigate("ExerciseSelection", { level: level.name });
              }}
            >
              <Text style={styles.startButtonText}>Start Learning</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  levelsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  levelCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  levelContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  levelIcon: {
    fontSize: 30,
  },
  levelInfo: {
    flex: 1,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  levelBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  levelDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
    lineHeight: 20,
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
    color: "#6b7280",
    width: 35,
    textAlign: "right",
  },
  startButton: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default LevelSelection;
