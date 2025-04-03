/**
 * Module principal pour les exercices d'orthographe
 * Point d'entrée pour le module Spelling qui exporte tous les écrans et composants
 */

// Écrans principaux
import SpellingSelectionScreen from "./screens/SelectionScreen";
import SpellingCorrectionPractice from "./screens/CorrectionPractice";
import SpellingRulesPractice from "./screens/RulesPractice";

// Composants pour usage externe potentiel
import Header from "../../../common/Header";
import ProgressBar from "../../../common/ProgressBar";
import ExerciseCard from "./components/ExerciseCard";
import ResultsScreen from "./components/ResultsScreen";
import FeedbackDisplay from "./components/FeedbackDisplay";

// Hooks spécifiques au module Spelling
import useExerciseType from "../../../../hooks/useExerciceType";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes";

// Custom hook pour les exercices d'orthographe
const useSpellingExercise = () => useExerciseType(EXERCISE_TYPES.SPELLING);

// Composant principal pour les exercices d'orthographe
const SpellingExercise = ({ navigation }) => {
  // ...existing code...
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <Header
        title="Spelling Exercise"
        level={level}
        levelColor={levelColor}
        onBack={handleGoBack}
      />
      {/* Barre de progression */}
      <ProgressBar progress={progress} levelColor={levelColor} />
      {/* ...existing code... */}
    </SafeAreaView>
  );
};

// Export des écrans principaux
export {
  // Écrans
  SpellingSelectionScreen,
  SpellingCorrectionPractice,
  SpellingRulesPractice,

  // Composants
  Header,
  ProgressBar,
  ExerciseCard,
  ResultsScreen,
  FeedbackDisplay,

  // Hook spécifique à l'orthographe
  useSpellingExercise,
};

// Export par défaut pour le composant principal des exercices d'orthographe
export default SpellingExercise;
