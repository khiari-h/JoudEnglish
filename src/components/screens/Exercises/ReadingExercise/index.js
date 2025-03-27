// src/components/screens/Exercises/ReadingExercise/index.js
import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ScrollView, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import ReadingHeader from './components/ReadingHeader';
import TextSelector from './components/TextSelector';
import ProgressBar from './components/ProgressBar';
import ReadingText from './components/ReadingText';
import QuestionCard from './components/QuestionCard';
import QuestionIndicators from './components/QuestionIndicators';
import ActionButtons from './components/ActionButtons';

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from '../../../hooks/common';
import useReadingTextInteraction from './hooks/useReadingTextInteraction';
import { getReadingDataByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de lecture
 */
const ReadingExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Références pour les ScrollViews
  const scrollViewRef = useRef(null);
  const textsScrollViewRef = useRef(null);
  
  // États spécifiques à la lecture
  const [readingData, setReadingData] = useState([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Animations
  const { fadeAnim, slideAnim, animateIn, resetAnimations } = useAnimations();
  
  // Charger les données de lecture
  useEffect(() => {
    const data = getReadingDataByLevel(level);
    setReadingData(data);
  }, [level]);
  
  // Obtenir l'exercice de lecture actuel
  const currentExercise = readingData[selectedExerciseIndex] || { questions: [] };
  
  // Interactions avec le texte de lecture
  const {
    textExpanded,
    highlightedWord,
    toggleTextExpansion,
    handleWordPress,
    closeVocabularyPopup,
    wordHasDefinition
  } = useReadingTextInteraction({
    scrollViewRef,
    currentExercise
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
    canCheckAnswer
  } = useExerciseState({
    type: 'reading',
    level,
    exercises: currentExercise.questions,
    navigation,
    checkAnswerFn: checkReadingAnswer
  });
  
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
              transform: [{ translateY: slideAnim }]
            }
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
          completedQuestions={[]}
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
        onNext={goToNextQuestion}
        onPrevious={goToPreviousQuestion}
        onRetry={retryExercise}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default ReadingExercise;