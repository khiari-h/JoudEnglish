// src/components/screens/Exercises/GrammarExercise/index.js
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";

// Import des composants
import ExerciseHeader from "./components/ExerciceHeader";
import RuleSelector from "./components/RuleSelector";
import ProgressBar from "./components/ProgressBar";
import RuleDisplay from "./components/RuleDisplay";
import ExerciseContainer from "./components/ExerciseContainer";
import FeedbackDisplay from "./components/FeedbackDisplay";
import ExerciseActions from "./components/ExerciceActions";

// Import des hooks personnalisés
import useGrammarExercise from "./hooks/useGrammarExercise";
import useProgress from "../../../../hooks/useProgress";
import { getLevelColor } from "./utils/levelUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes";

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de grammaire
 */
const GrammarExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  const levelColor = getLevelColor(level);

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  // Utiliser le hook personnalisé pour les exercices de grammaire
  const {
    selectedRuleIndex,
    currentExerciseIndex,
    selectedOption,
    setSelectedOption,
    showFeedback,
    inputText,
    setInputText,
    isCorrect,
    attempts,
    completedExercises,
    grammarData,
    currentRule,
    currentExercise,
    isLastExercise,
    progress,
    resetExercise,
    checkAnswer,
    retryExercise,
    canCheckAnswer,
    goToNextExercise,
    goToPreviousExercise,
    handleRuleChange
  } = useGrammarExercise(level);

  // Mettre à jour la progression globale de grammaire
  const updateGrammarProgress = () => {
    if (!grammarData || !grammarData.categories || grammarData.categories.length === 0) return;

    // Pour la règle actuelle
    const currentRuleId = currentRule.id || `rule_${selectedRuleIndex}`;
    const currentRuleExercisesCompleted = completedExercises[selectedRuleIndex]?.length || 0;
    const currentRuleExercisesTotal = currentRule.exercises?.length || 0;

    // Mettre à jour la progression pour cette règle spécifique
    if (currentRuleExercisesTotal > 0) {
      updateProgress(
        `grammar_${level.toLowerCase()}_${currentRuleId}`,
        EXERCISE_TYPES.GRAMMAR,
        level,
        currentRuleExercisesCompleted,
        currentRuleExercisesTotal
      );
    }

    // Calculer la progression globale pour toutes les règles
    let totalAllExercises = 0;
    let completedAllExercises = 0;

    grammarData.categories.forEach((rule, ruleIndex) => {
      if (rule.exercises) {
        totalAllExercises += rule.exercises.length;
        completedAllExercises += completedExercises[ruleIndex]?.length || 0;
      }
    });

    // Mettre à jour la progression globale de grammaire
    if (totalAllExercises > 0) {
      updateProgress(
        `grammar_${level.toLowerCase()}`,
        EXERCISE_TYPES.GRAMMAR,
        level,
        completedAllExercises,
        totalAllExercises
      );
    }
  };

  // Fonction personnalisée pour aller à l'exercice suivant avec mise à jour de la progression
  const handleNextExercise = () => {
    // Si c'est le dernier exercice de cette règle, mettre à jour la progression
    if (isLastExercise) {
      updateGrammarProgress();
    }
    goToNextExercise();
  };

  // Si les données ne sont pas encore chargées
  if (!grammarData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec badge de niveau et titre */}
      <ExerciseHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
      />

      {/* Sélecteur de règle grammaticale */}
      <RuleSelector
        rules={grammarData.categories}
        selectedRuleIndex={selectedRuleIndex}
        onRuleChange={handleRuleChange}
        levelColor={levelColor}
      />

      {/* Barre de progression */}
      <ProgressBar
        currentIndex={currentExerciseIndex}
        totalCount={currentRule?.exercises?.length || 0}
        progress={progress}
        levelColor={levelColor}
      />

      {/* Contenu principal */}
      <ScrollView
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Affichage de la règle */}
        <RuleDisplay rule={currentRule} />

        {/* Exercice en cours */}
        {currentExercise && (
          <ExerciseContainer
            exercise={currentExercise}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            inputText={inputText}
            setInputText={setInputText}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            levelColor={levelColor}
          />
        )}

        {/* Feedback après réponse */}
        {showFeedback && (
          <FeedbackDisplay
            isCorrect={isCorrect}
            exercise={currentExercise}
            attempts={attempts}
            levelColor={levelColor}
          />
        )}
      </ScrollView>

      {/* Boutons d'action */}
      <ExerciseActions
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        attempts={attempts}
        onCheck={checkAnswer}
        onNext={handleNextExercise}
        onPrevious={goToPreviousExercise}
        onRetry={retryExercise}
        isLastExercise={isLastExercise}
        canCheck={canCheckAnswer()}
        currentExerciseIndex={currentExerciseIndex}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default GrammarExercise;