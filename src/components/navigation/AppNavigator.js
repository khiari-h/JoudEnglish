import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciceSelection";
import VocabularyExercise from "../screens/Exercises/VocabularyExercise";
import GrammarExercise from "../screens/Exercises/GrammarExercise";
import ChatbotWriting from "../screens/Exercises/ChatbotWriting";
import ErrorCorrectionExercise from "../screens/Exercises/ErrorCorrectionExercise";
import PhrasesExpressions from "../screens/Exercises/PhrasesExpressions";
import LevelAssessment from "../screens/Exercises/LevelAssessment";
import ReadingExercise from "../screens/Exercises/ReadingExercise";
import WordGamesExercise from "../screens/Exercises/WordGamesExercise";

// Importation des nouveaux composants d'orthographe refactorisés
import {
  SpellingSelectionScreen,
  SpellingRulesPractice,
  SpellingCorrectionPractice,
} from "../screens/Exercises/Spelling";

const Stack = createStackNavigator();

// Nous supprimons la fonction getLevelColor car elle est maintenant importée
// depuis utils/levelUtils.js dans les composants concernés

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
