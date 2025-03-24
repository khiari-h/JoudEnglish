import React, { useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import des hooks personnalisés
import useReadingExercise from "./hooks/useReadingExercise";
import useReadingNavigation from "./hooks/useReadingNavigation";
import useReadingTextInteraction from "./hooks/useReadingTextInteraction";

// Import des composants
import ReadingHeader from "./components/ReadingHeader";
import TextSelector from "./components/TextSelector";
import ProgressBar from "./components/ProgressBar";
import ReadingText from "./components/ReadingText";
import QuestionCard from "./components/QuestionCard";
import QuestionIndicators from "./components/QuestionIndicators";
import ActionButtons from "./components/ActionButtons";
import VocabularyPopup from "./components/VocabularyPopup";

// Import des utilitaires
import { getLevelColor } from "./utils/levelUtils";

// Import des styles
import styles from "./style";

const ReadingExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  
  // Références pour le scroll
  const scrollViewRef = useRef();
  const textsScrollViewRef = useRef();
  
  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Couleur basée sur le niveau
  const levelColor = getLevelColor(level);
  
  // État et logique des exercices via hooks personnalisés
  const {
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    completedQuestions,
    showFeedback,
    attempts,
    isCorrectAnswer,
    currentQuestion,
    loading,
    setSelectedAnswer,
    calculateProgress,
    handleSelectAnswer,
    handleSubmitAnswer,
    retryExercise,
    isCurrentQuestionCompleted,
  } = useReadingExercise(level);
  
  // Logique de navigation
  const {
    handleGoBack,
    handleTextChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleQuestionSelect,
    canGoPrevious,
    isLastQuestion,
  } = useReadingNavigation({
    navigation,
    fadeAnim,
    slideAnim,
    scrollViewRef,
    textsScrollViewRef,
    selectedExerciseIndex,
    currentExerciseIndex: currentQuestionIndex,
    allExercises,
    completedQuestions,
    isCorrectAnswer
  });
  
  // Interactions avec le texte
  const {
    textExpanded,
    toggleTextExpansion,
    highlightedWord,
    handleWordPress,
    closeVocabularyPopup,
  } = useReadingTextInteraction({
    scrollViewRef,
    currentExercise
  });
  
  // Affichage de chargement
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Calcul de la progression
  const progress = calculateProgress();
  const totalQuestions = currentExercise?.questions.length || 0;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <ReadingHeader
        level={level}
        levelColor={levelColor}
        onGoBack={handleGoBack}
      />
      
      {/* Sélecteur de textes */}
      <TextSelector
        exercises={allExercises}
        selectedExerciseIndex={selectedExerciseIndex}
        onSelectText={handleTextChange}
        scrollViewRef={textsScrollViewRef}
        levelColor={levelColor}
      />
      
      {/* Barre de progression */}
      <ProgressBar
        progress={progress}
        completedQuestions={completedQuestions[selectedExerciseIndex]?.length || 0}
        totalQuestions={totalQuestions}
        levelColor={levelColor}
      />
      
      {/* Contenu principal */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Section du texte */}
        <ReadingText
          exercise={currentExercise}
          expanded={textExpanded}
          onToggleExpand={toggleTextExpansion}
          onWordPress={handleWordPress}
          levelColor={levelColor}
        />
        
        {/* Section de question */}
        <QuestionCard
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrectAnswer}
          attempts={attempts}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
        />
        
        {/* Indicateurs de questions */}
        <QuestionIndicators
          totalQuestions={totalQuestions}
          currentIndex={currentQuestionIndex}
          completedQuestions={completedQuestions[selectedExerciseIndex] || []}
          onSelectQuestion={handleQuestionSelect}
          levelColor={levelColor}
        />
      </ScrollView>
      
      {/* Boutons d'action */}
      <ActionButtons
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrectAnswer}
        attempts={attempts}
        canGoPrevious={canGoPrevious}
        isLastQuestion={isLastQuestion}
        onSubmit={handleSubmitAnswer}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        onRetry={retryExercise}
        levelColor={levelColor}
      />
      
      {/* Popup de vocabulaire */}
      <VocabularyPopup
        word={highlightedWord}
        onClose={closeVocabularyPopup}
      />
    </SafeAreaView>
  );
};

export default ReadingExercise;