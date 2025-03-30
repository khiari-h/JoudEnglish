// src/components/screens/Exercises/ReadingExercise/index.js
import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, ScrollView, Animated } from "react-native";
import { useRoute } from "@react-navigation/native";

// Import des composants
import ReadingHeader from "./components/ReadingHeader";
import TextSelector from "./components/TextSelector";
import ProgressBar from "./components/ProgressBar";
import ReadingText from "./components/ReadingText";
import QuestionCard from "./components/QuestionCard";
import QuestionIndicators from "./components/QuestionIndicators";
import ActionButtons from "./components/ActionButtons";

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from "../../../../hooks/common";
import useProgress from "../../../../hooks/useProgress"; // Ajout du hook de progression
import useReadingTextInteraction from "./hooks/useReadingTextInteraction";
import { getReadingDataByLevel } from "./utils/dataUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes"; // Ajout des constantes de types d'exercices

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les exercices de lecture
 */
const ReadingExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  // Références pour les ScrollViews
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);

  // États spécifiques à la lecture
  const [readingData, setReadingData] = useState([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState({});

  // Animations
  const { fadeAnim, slideAnim, animateIn, resetAnimations } = useAnimations();

  // Charger les données de lecture
  useEffect(() => {
    const data = getReadingDataByLevel(level);
    setReadingData(data);

    // Initialiser le suivi des questions complétées
    if (data && data.length > 0) {
      const initialCompletedQuestions = {};
      data.forEach((_, index) => {
        initialCompletedQuestions[index] = [];
      });
      setCompletedQuestions(initialCompletedQuestions);
    }
  }, [level]);

  // Obtenir l'exercice de lecture actuel
  const currentExercise = readingData[selectedExerciseIndex] || {
    questions: [],
  };

  // Interactions avec le texte de lecture
  const {
    textExpanded,
    highlightedWord,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    wordHasDefinition,
  } = useReadingTextInteraction({
    scrollViewRef,
    currentExercise,
  });

  // Fonction personnalisée pour vérifier les réponses
  const checkReadingAnswer = (userAnswer, question) => {
    return userAnswer === question.correctAnswer;
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
    progress,
    levelColor,
    isLastExercise: isLastQuestion,
    checkAnswer,
    retryExercise,
    resetExerciseState,
    goToNext: goToNextQuestion,
    goToPrevious: goToPreviousQuestion,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    canCheckAnswer,
    completedItems,
  } = useExerciseState({
    type: EXERCISE_TYPES.READING,
    level,
    exercises: currentExercise.questions,
    navigation,
    checkAnswerFn: checkReadingAnswer,
    autoSaveProgress: false, // Nous allons gérer manuellement la progression
  });

  // Mettre à jour la progression quand une réponse est correcte
  useEffect(() => {
    if (showFeedback && isCorrect) {
      // Mettre à jour l'état local des questions complétées
      const newCompletedQuestions = { ...completedQuestions };

      if (!newCompletedQuestions[selectedExerciseIndex]) {
        newCompletedQuestions[selectedExerciseIndex] = [];
      }

      if (
        !newCompletedQuestions[selectedExerciseIndex].includes(
          currentQuestionIndex
        )
      ) {
        newCompletedQuestions[selectedExerciseIndex].push(currentQuestionIndex);
        setCompletedQuestions(newCompletedQuestions);

        // Mettre à jour la progression
        updateReadingProgress(newCompletedQuestions);
      }
    }
  }, [showFeedback, isCorrect, currentQuestionIndex, selectedExerciseIndex]);

  // Fonction pour mettre à jour la progression de lecture
  const updateReadingProgress = (questionsData = completedQuestions) => {
    if (!readingData || readingData.length === 0) return;

    // Pour le texte actuel
    const currentTextId = currentExercise.id || `text_${selectedExerciseIndex}`;
    const currentTextQuestionsCompleted =
      questionsData[selectedExerciseIndex]?.length || 0;
    const currentTextQuestionsTotal = currentExercise.questions?.length || 0;

    // Mettre à jour la progression pour ce texte spécifique
    if (currentTextQuestionsTotal > 0) {
      updateProgress(
        `reading_${level.toLowerCase()}_${currentTextId}`,
        EXERCISE_TYPES.READING,
        level,
        currentTextQuestionsCompleted,
        currentTextQuestionsTotal
      );
    }

    // Calculer la progression globale pour tous les textes
    let totalAllQuestions = 0;
    let completedAllQuestions = 0;

    readingData.forEach((text, textIndex) => {
      if (text.questions) {
        totalAllQuestions += text.questions.length;
        completedAllQuestions += questionsData[textIndex]?.length || 0;
      }
    });

    // Mettre à jour la progression globale de lecture
    if (totalAllQuestions > 0) {
      updateProgress(
        `reading_${level.toLowerCase()}`,
        EXERCISE_TYPES.READING,
        level,
        completedAllQuestions,
        totalAllQuestions
      );
    }
  };

  // Réinitialiser l'animation quand la question change
  useEffect(() => {
    resetAnimations();
    animateIn();
    setSelectedAnswer(null);
  }, [currentQuestionIndex, selectedExerciseIndex, resetAnimations, animateIn]);

  // Mise à jour de la réponse utilisateur
  useEffect(() => {
    setUserAnswer(selectedAnswer);
  }, [selectedAnswer, setUserAnswer]);

  // Changer de texte de lecture
  const handleTextChange = (index) => {
    if (index !== selectedExerciseIndex) {
      // Sauvegarder la progression avant de changer de texte
      updateReadingProgress();

      setSelectedExerciseIndex(index);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      resetExerciseState();

      if (textsScrollViewRef.current) {
        textsScrollViewRef.current.scrollTo({
          x: index * 110, // Approximation de la largeur de chaque bouton
          animated: true,
        });
      }
    }
  };

  // Fonction personnalisée pour aller à la question suivante avec mise à jour
  const handleNextQuestion = () => {
    // Si c'est la dernière question, mettre à jour la progression
    if (isLastQuestion) {
      updateReadingProgress();
    }
    goToNextQuestion();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <ReadingHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title={currentExercise.title || "Reading Exercise"}
      />

      {/* Sélecteur de textes */}
      <TextSelector
        texts={readingData}
        selectedIndex={selectedExerciseIndex}
        onSelectText={handleTextChange}
        levelColor={levelColor}
        scrollViewRef={textsScrollViewRef}
      />

      {/* Barre de progression */}
      <ProgressBar
        progress={progress}
        completedQuestions={currentQuestionIndex}
        totalQuestions={currentExercise.questions?.length || 0}
        levelColor={levelColor}
      />

      {/* Contenu principal */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Texte de lecture */}
        <ReadingText
          text={currentExercise.text}
          expanded={textExpanded}
          onToggleExpansion={toggleTextExpansion}
          onWordPress={handleWordPress}
          wordHasDefinition={wordHasDefinition}
          highlightedWord={highlightedWord}
          onCloseVocabularyPopup={closeVocabularyPopup}
          levelColor={levelColor}
        />

        {/* Question actuelle */}
        <Animated.View
          style={[
            styles.questionWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={setSelectedAnswer}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              levelColor={levelColor}
            />
          )}
        </Animated.View>

        {/* Indicateurs de questions */}
        <QuestionIndicators
          totalQuestions={currentExercise.questions?.length || 0}
          currentIndex={currentQuestionIndex}
          completedQuestions={completedQuestions[selectedExerciseIndex] || []}
          onSelectQuestion={setCurrentQuestionIndex}
          levelColor={levelColor}
        />
      </ScrollView>

      {/* Boutons d'action */}
      <ActionButtons
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        attempts={attempts}
        canGoPrevious={canGoToPrevious}
        isLastQuestion={isLastQuestion}
        onSubmit={checkAnswer}
        onNext={handleNextQuestion} // Utiliser notre fonction personnalisée
        onPrevious={goToPreviousQuestion}
        onRetry={retryExercise}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default ReadingExercise;
