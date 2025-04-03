// src/components/screens/Exercises/GrammarExercise/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import { NavigationButton, IconButton } from '../../../common/Navigation';
import { AnimatedFeedback, ExerciseFeedback } from '../../../common/Feedback';

// Import des hooks personnalisés
import useGrammarExercise from "./hooks/useGrammarExercise";
import useProgress from "../../../../hooks/useProgress";
import { getLevelColor } from "./utils/levelUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes";

/**
 * Composant principal pour les exercices de grammaire
 */
const GrammarExercise = ({ navigation }) => {
  const { level } = useRoute().params || { level: "A1" };
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderActions = () => (
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
  );

  // Si les données ne sont pas encore chargées
  if (!grammarData) {
    return null;
  }

  return (
    <BaseExercise
      title="Grammar Exercise"
      level={level}
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
      renderActions={renderActions}
    >
      <RuleSelector
        rules={grammarData.categories}
        selectedRuleIndex={selectedRuleIndex}
        onRuleChange={handleRuleChange}
        levelColor={levelColor}
      />
      <ExerciseContainer
        exercise={currentExercise}
        userAnswer={inputText}
        setUserAnswer={setInputText}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        levelColor={levelColor}
      />
    </BaseExercise>
  );
};

export default GrammarExercise;