// src/components/screens/Exercises/LevelAssessment/index.js
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

// Import des composants
import BaseExercise from "../../../common/BaseExercise";
import AssessmentContent from "./components/AssessmentContent";
import AssessmentActions from "./components/AssessmentActions";
import { NavigationButton, IconButton } from '../../../common/Navigation';
import { AnimatedFeedback, ExerciseFeedback } from '../../../common/Feedback';

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from "../../../../hooks/common";
import useProgress from "../../../../hooks/useProgress"; // Ajout du hook de progression
import { getAssessmentDataByLevel } from "./utils/levelUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes"; // Ajout des constantes de types d'exercices

/**
 * Composant principal pour l'évaluation de niveau
 */
const LevelAssessment = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  // États spécifiques à l'évaluation
  const [assessmentData, setAssessmentData] = useState({ sections: [] });
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scores, setScores] = useState({});

  // Animations
  const { fadeAnim, animateIn, resetAnimations } = useAnimations();

  // Charger les données d'évaluation
  useEffect(() => {
    const data = getAssessmentDataByLevel(level);
    setAssessmentData(data);
  }, [level]);

  // Obtenir les questions de la section actuelle
  const currentSectionData = assessmentData.sections[currentSection] || {
    questions: [],
  };

  // Fonction personnalisée pour vérifier les réponses
  const checkAssessmentAnswer = (userAnswer, question) => {
    return userAnswer === question.correctAnswer;
  };

  // Fonction pour mettre à jour la progression
  const updateAssessmentProgress = () => {
    if (!assessmentData || !assessmentData.sections) return;

    // Calculer le nombre total de questions et de réponses correctes
    let totalQuestions = 0;
    let correctAnswers = 0;

    assessmentData.sections.forEach((section, sectionIndex) => {
      if (section.questions) {
        totalQuestions += section.questions.length;

        // Ajouter les réponses correctes de cette section
        if (scores[sectionIndex]) {
          correctAnswers += scores[sectionIndex].filter(Boolean).length;
        }
      }
    });

    // Calculer le pourcentage de progression pour cette section
    const sectionTitle =
      currentSectionData.title || `section_${currentSection}`;

    // Mettre à jour la progression pour la section actuelle
    updateProgress(
      `assessment_${level.toLowerCase()}_${sectionTitle
        .toLowerCase()
        .replace(/\s+/g, "_")}`,
      EXERCISE_TYPES.EVALUATION,
      level,
      scores[currentSection]?.filter(Boolean).length || 0,
      currentSectionData.questions?.length || 0
    );

    // Mettre à jour la progression globale de l'évaluation
    updateProgress(
      `assessment_${level.toLowerCase()}`,
      EXERCISE_TYPES.EVALUATION,
      level,
      correctAnswers,
      totalQuestions
    );
  };

  // Fonction pour passer à la section suivante
  const handleSectionComplete = () => {
    // Mettre à jour la progression avant de passer à la section suivante
    updateAssessmentProgress();

    if (currentSection < assessmentData.sections.length - 1) {
      // Passer à la section suivante
      setCurrentSection(currentSection + 1);
      setCurrentQuestionIndex(0);
      resetExerciseState();
      setSelectedAnswer(null);
    } else {
      // Toutes les sections sont terminées, afficher les résultats
      setShowResults(true);
    }
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex: currentQuestionIndex,
    setCurrentIndex: setCurrentQuestionIndex,
    currentExercise: currentQuestion,
    showFeedback,
    isCorrect,
    attempts,
    userAnswer: storedUserAnswer,
    setUserAnswer,
    completedItems,
    progress,
    levelColor,
    isLastExercise: isLastQuestion,
    checkAnswer,
    retryExercise,
    resetExerciseState,
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    canCheckAnswer,
  } = useExerciseState({
    type: EXERCISE_TYPES.EVALUATION,
    level,
    exercises: currentSectionData.questions,
    navigation,
    checkAnswerFn: checkAssessmentAnswer,
    onComplete: handleSectionComplete,
    autoSaveProgress: false, // Nous allons gérer manuellement la progression
  });

  // Mettre à jour le score quand une réponse est correcte
  useEffect(() => {
    if (showFeedback && isCorrect) {
      setScores((prevScores) => {
        const sectionScores = prevScores[currentSection] || [];
        sectionScores[currentQuestionIndex] = true;

        const newScores = {
          ...prevScores,
          [currentSection]: sectionScores,
        };

        return newScores;
      });
    }
  }, [showFeedback, isCorrect, currentSection, currentQuestionIndex]);

  // Mettre à jour la progression lorsque le score change
  useEffect(() => {
    if (Object.keys(scores).length > 0) {
      updateAssessmentProgress();
    }
  }, [scores]);

  // Mettre à jour la réponse utilisateur
  useEffect(() => {
    setUserAnswer(selectedAnswer);
  }, [selectedAnswer, setUserAnswer]);

  // Réinitialiser l'animation quand la question change
  useEffect(() => {
    resetAnimations();
    animateIn();
    setSelectedAnswer(null);
  }, [currentQuestionIndex, currentSection, resetAnimations, animateIn]);

  // Calculer le score total
  const calculateTotalScore = () => {
    let correct = 0;
    let total = 0;

    Object.values(scores).forEach((sectionScores) => {
      correct += sectionScores.filter(Boolean).length;
      total += sectionScores.length;
    });

    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  };

  // Si on affiche les résultats
  if (showResults) {
    // Mettre à jour une dernière fois la progression
    const score = calculateTotalScore();

    // Mettre à jour la progression globale avec le score total
    updateProgress(
      `assessment_${level.toLowerCase()}_final`,
      EXERCISE_TYPES.EVALUATION,
      level,
      score.correct,
      score.total
    );

    return (
      <ResultsScreen
        level={level}
        levelColor={levelColor}
        score={score}
        navigation={navigation}
      />
    );
  }

  const renderActions = () => (
    <AssessmentActions
      onNext={goToNext}
      onSubmit={checkAnswer}
      levelColor={levelColor}
    />
  );

  return (
    <BaseExercise
      title="Level Assessment"
      level={level}
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
      renderActions={renderActions}
      showProgressBar={false}
    >
      <AssessmentContent />
    </BaseExercise>
  );
};

export default LevelAssessment;
