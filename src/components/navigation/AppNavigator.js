import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";
import VocabularyExercise from "../screens/exercises/VocabularyExercise";
import GrammarExercise from "../screens/exercises/GrammarExercise";
import ChatbotWriting from "../screens/exercises/ChatbotWriting";
import ErrorCorrectionExercise from "../screens/exercises/ErrorCorrectionExercise";
import PhrasesExpressions from "../screens/exercises/PhrasesExpressions";
import LevelAssessment from "../screens/exercises/LevelAssessment";
import ReadingExercise from "../screens/exercises/ReadingExercise";
import WordGamesExercise from "../screens/exercises/WordGamesExercise";

// Importation des nouveaux composants d'orthographe
import SpellingSelectionScreen from "../screens/exercises/spelling/spellingSelectionScreen";
import SpellingRulesPractice from "../screens/exercises/spelling/SpellingRulesPractice";
import SpellingCorrectionPractice from "../screens/exercises/spelling/spellingCorrectionPractice";

const Stack = createStackNavigator();

// Fonction pour obtenir la couleur selon le niveau (nous la gardons car elle pourrait être utilisée dans les écrans)
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
    name: "Hamdane Khiari",
    streak: 7,
  };

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0, // Pour Android
          shadowOpacity: 0, // Pour iOS
        },
        headerTintColor: "#5E60CE", // Couleur de la flèche et du texte de retour
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerBackTitleVisible: false, // Cache le texte "Retour"
        cardStyle: {
          backgroundColor: "#F4F4F6",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={userProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LevelSelection"
        component={LevelSelection}
        options={{
          title: "Language Levels",
        }}
      />
      <Stack.Screen
        name="ExerciseSelection"
        component={ExerciseSelection}
        options={{
          title: "Exercise Selection",
        }}
      />
      <Stack.Screen
        name="VocabularyExercise"
        component={VocabularyExercise}
        options={{
          title: "Vocabulary Exercise",
        }}
      />
      <Stack.Screen
        name="GrammarExercise"
        component={GrammarExercise}
        options={{
          title: "Grammar Exercise",
        }}
      />
      <Stack.Screen
        name="ChatbotWriting"
        component={ChatbotWriting}
        options={{
          title: "Chatbot Writing",
        }}
      />
      <Stack.Screen
        name="ErrorCorrectionExercise"
        component={ErrorCorrectionExercise}
        options={{
          title: "Error Correction",
        }}
      />
      <Stack.Screen
        name="PhrasesExpressions"
        component={PhrasesExpressions}
        options={{
          title: "Phrases & Expressions",
        }}
      />
      <Stack.Screen
        name="Evaluation"
        component={LevelAssessment}
        options={{
          title: "Level Assessment",
        }}
      />
      <Stack.Screen
        name="ReadingExercise"
        component={ReadingExercise}
        options={{
          title: "Reading Exercise",
        }}
      />
      <Stack.Screen
        name="SpellingPractice"
        component={SpellingSelectionScreen}
        options={{
          title: "Spelling Practice",
        }}
      />
      <Stack.Screen
        name="SpellingRulesPractice"
        component={SpellingRulesPractice}
        options={{
          title: "Spelling Rules",
        }}
      />
      <Stack.Screen
        name="SpellingCorrectionPractice"
        component={SpellingCorrectionPractice}
        options={{
          title: "Spelling Correction",
        }}
      />
      <Stack.Screen
        name="WordGamesExercise"
        component={WordGamesExercise}
        options={{
          title: "Word Games",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
