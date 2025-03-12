import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Platform } from "react-native";
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";
import VocabularyExercise from "../screens/exercises/VocabularyExercise";
import GrammarExercise from "../screens/exercises/GrammarExercise";
import ChatbotWriting from "../screens/exercises/ChatbotWriting";
import ErrorCorrectionExercise from "../screens/exercises/ErrorCorrectionExercise";
import PhrasesExpressions from "../screens/exercises/PhrasesExpressions";
import QuizzesChallenges from "../screens/exercises/QuizzesChallenges";
import ReadingExercise from "../screens/exercises/ReadingExercise";
import SpellingPractice from "../screens/exercises/SpellingPractice";
import WordGamesExercise from "../screens/exercises/WordGamesExercise";

const Stack = createStackNavigator();

// Header réutilisable pour tous les écrans
const CustomHeader = ({ title, subtitle, color = "#4361EE" }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <View
          style={[
            styles.headerBg,
            {
              borderColor: `rgba(${color
                .replace("#", "")
                .match(/../g)
                .map((h) => parseInt(h, 16))
                .join(", ")}, 0.15)`,
            },
          ]}
        >
          <Text style={[styles.headerTitle, { color }]}>{title}</Text>
        </View>
        <View style={[styles.titleDivider, { backgroundColor: color }]} />
      </View>
      {subtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

// Fonction pour obtenir la couleur selon le niveau
const getLevelColor = (level) => {
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

const AppNavigator = () => {
  const userProfile = {
    name: "Alex Rodriguez",
    streak: 7,
  };

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          height: 80, // Réduit pour un header plus compact
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(229, 231, 235, 0.8)",
        },
        headerTintColor: "#4361EE",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
          color: "#1F2937",
        },
        headerTransparent: false,
        headerShadowVisible: true,
        cardStyle: {
          backgroundColor: "#F4F4F6",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={userProfile}
        options={{
          headerTitle: () => <CustomHeader title="Dashboard" />,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="LevelSelection"
        component={LevelSelection}
        options={{
          headerTitle: () => <CustomHeader title="Language Levels" />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ExerciseSelection"
        component={ExerciseSelection}
        options={({ route }) => {
          const levelColor = getLevelColor(route.params.level);
          return {
            headerTitle: () => (
              <CustomHeader
                title={`Level ${route.params.level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />
      <Stack.Screen
        name="VocabularyExercise"
        component={VocabularyExercise}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Vocabulary"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />
      <Stack.Screen
        name="GrammarExercise"
        component={GrammarExercise}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Grammar"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />
      <Stack.Screen
        name="ChatbotWriting"
        component={ChatbotWriting}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Chatbot"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      {/* Ajout des routes manquantes */}
      <Stack.Screen
        name="ErrorCorrectionExercise"
        component={ErrorCorrectionExercise}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Error Correction"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      <Stack.Screen
        name="PhrasesExpressions"
        component={PhrasesExpressions}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Phrases & Expressions"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      <Stack.Screen
        name="QuizzesChallenges"
        component={QuizzesChallenges}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Quizzes & Challenges"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      <Stack.Screen
        name="ReadingExercise"
        component={ReadingExercise}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Reading"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      <Stack.Screen
        name="SpellingPractice"
        component={SpellingPractice}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Spelling Practice"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />

      <Stack.Screen
        name="WordGamesExercise"
        component={WordGamesExercise}
        options={({ route }) => {
          const { level } = route.params;
          const levelColor = getLevelColor(level);
          return {
            headerTitle: () => (
              <CustomHeader
                title="Word Games"
                subtitle={`Level ${level}`}
                color={levelColor}
              />
            ),
            headerBackTitleVisible: false,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerBg: {
    backgroundColor: "rgba(67, 97, 238, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(67, 97, 238, 0.15)",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(67, 97, 238, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4361EE",
    letterSpacing: 0.5,
  },
  titleDivider: {
    width: 40,
    height: 3,
    backgroundColor: "#4361EE",
    borderRadius: 2,
    marginLeft: 16,
  },
  subtitleContainer: {
    marginLeft: 16,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
});

export default AppNavigator;
