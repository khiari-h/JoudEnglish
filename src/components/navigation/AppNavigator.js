// src/components/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import LevelSelection from "../screens/LevelSelection";
import ExerciseSelection from "../screens/ExerciseSelection";
import VocabularyExercise from "../screens/exercises/VocabularyExercise";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3b82f6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "JOUD - Learn English" }}
      />
      <Stack.Screen
        name="LevelSelection"
        component={LevelSelection}
        options={{ title: "Select Level" }}
      />
      <Stack.Screen
        name="ExerciseSelection"
        component={ExerciseSelection}
        options={({ route }) => ({
          title: `Level ${route.params.level} Exercises`,
        })}
      />
      <Stack.Screen
        name="VocabularyExercise"
        component={VocabularyExercise}
        options={{ title: "Vocabulary Practice" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
