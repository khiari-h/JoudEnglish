import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import des écrans principaux
import Dashboard from '../components/screens/Dashboard';
import LevelSelection from '../components/screens/LevelSelection';
import ExerciseSelection from '../screens/ExerciseSelection';

// Import des exercices
import {
  VocabularyExercise,
  GrammarExercise,
  ReadingExercise,
  WordGamesExercise,
  PhrasesExpressions,
  ErrorCorrectionExercise,
  SpellingExercise,
  ChatbotWriting,
  LevelAssessment
} from '../screens/Exercises';

// Import des écrans des résultats
import ExerciseResults from '../screens/ExerciseResults';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8FAFC' }
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="LevelSelection" component={LevelSelection} />
      <Stack.Screen name="ExerciseSelection" component={ExerciseSelection} />
      
      {/* Routes des exercices */}
      <Stack.Screen name="VocabularyExercise" component={VocabularyExercise} />
      <Stack.Screen name="GrammarExercise" component={GrammarExercise} />
      <Stack.Screen name="ReadingExercise" component={ReadingExercise} />
      <Stack.Screen name="WordGamesExercise" component={WordGamesExercise} />
      <Stack.Screen name="PhrasesExpressions" component={PhrasesExpressions} />
      <Stack.Screen name="ErrorCorrectionExercise" component={ErrorCorrectionExercise} />
      <Stack.Screen name="ChatbotWriting" component={ChatbotWriting} />
      <Stack.Screen name="SpellingExercise" component={SpellingExercise} />
      <Stack.Screen name="LevelAssessment" component={LevelAssessment} />

      {/* Routes des résultats */}
      <Stack.Screen name="ExerciseResults" component={ExerciseResults} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
