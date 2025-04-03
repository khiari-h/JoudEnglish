import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import des écrans principaux
import Dashboard from "../screens/dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciceSelection";

// Import des exercices restructurés
import GrammarExercise from "../screens/Exercises/GrammarExercise";
import VocabularyExercise from "../screens/Exercises/VocabularyExercise";
import ChatbotWriting from "../screens/Exercises/ChatbotWriting";
import ErrorCorrectionExercise from "../screens/Exercises/ErrorCorrectionExercise";
import PhrasesExpressions from "../screens/Exercises/PhrasesExpressions";
import ReadingExercise from "../screens/Exercises/ReadingExercise";
import ListeningExercise from "../screens/Exercises/ListeningExercise";
import SpellingExercise from "../screens/Exercises/SpellingExercise";
import WordGamesExercise from "../screens/Exercises/WordGamesExercise";
import LevelAssessment from "../screens/Exercises/LevelAssessment";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#5E60CE",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: "#F4F4F6",
        },
      }}
    >
      {/* Écrans principaux */}
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LevelSelection"
        component={LevelSelection}
        options={{ title: "Language Levels" }}
      />
      <Stack.Screen
        name="ExerciseSelection"
        component={ExerciseSelection}
        options={{ title: "Exercise Selection" }}
      />

      {/* Exercices de langue */}
      <Stack.Screen
        name="GrammarExercise"
        component={GrammarExercise}
        options={{ title: "Grammar Exercise" }}
      />
      <Stack.Screen
        name="Vocabulary"
        component={VocabularyExercise}
        options={{ title: "Vocabulary" }}
      />
      <Stack.Screen
        name="Chatbot"
        component={ChatbotWriting}
        options={{ title: "Conversation Practice" }}
      />
      <Stack.Screen
        name="ErrorCorrection"
        component={ErrorCorrectionExercise}
        options={{ title: "Error Correction" }}
      />
      <Stack.Screen
        name="Phrases"
        component={PhrasesExpressions}
        options={{ title: "Phrases & Expressions" }}
      />
      <Stack.Screen
        name="Reading"
        component={ReadingExercise}
        options={{ title: "Reading" }}
      />
      <Stack.Screen
        name="Listening"
        component={ListeningExercise}
        options={{ title: "Listening" }}
      />
      <Stack.Screen
        name="Spelling"
        component={SpellingExercise}
        options={{ title: "Spelling" }}
      />
      <Stack.Screen
        name="WordGames"
        component={WordGamesExercise}
        options={{ title: "Word Games" }}
      />
      <Stack.Screen
        name="Assessment"
        component={LevelAssessment}
        options={{ title: "Level Assessment" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
