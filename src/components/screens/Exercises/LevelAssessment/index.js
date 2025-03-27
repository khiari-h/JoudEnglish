// src/components/screens/Exercises/LevelAssessment/index.js
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import AssessmentHeader from './components/AssessmentHeader';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import AnswerOptions from './components/AnswerOptions';
import FeedbackDisplay from './components/FeedbackDisplay';
import ActionButtons from './components/ActionButtons';
import ResultsScreen from './components/ResultsScreen';

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from '../../../hooks/common';
import { getAssessmentDataByLevel } from './utils/levelUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour l'évaluation de niveau
 */
const LevelAssessment = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
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
  const currentSectionData = assessmentData.sections[currentSection] || { questions: [] };
  
  // Fonction personnalisée pour vérifier les réponses
  const checkAssessmentAnswer = (userAnswer, question) => {
    return userAnswer === question.correctAnswer;
  };
  
  // Fonction pour passer à la section suivante
  const handleSectionComplete = () => {
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
    canCheckAnswer
  } = useExerciseState({
    type: 'assessment',
    level,
    exercises: currentSectionData.questions,
    navigation,
    checkAnswerFn: checkAssessmentAnswer,
    onComplete: handleSectionComplete
  });
  
  // Mettre à jour le score quand une réponse est correcte
  useEffect(() => {
    if (showFeedback && isCorrect) {
      setScores(prevScores => {
        const sectionScores = prevScores[currentSection] || [];
        sectionScores[currentQuestionIndex] = true;
        return {
          ...prevScores,
          [currentSection]: sectionScores
        };
      });
    }
  }, [showFeedback, isCorrect, currentSection, currentQuestionIndex]);
  
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
    
    Object.values(scores).forEach(sectionScores => {
      correct += sectionScores.filter(Boolean).length;
      total += sectionScores.length;
    });
    
    return {
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  };
  
  // Si on affiche les résultats
  if (showResults) {
    return (
      <ResultsScreen
        level={level}
        levelColor={levelColor}
        score={calculateTotalScore()}
        navigation={navigation}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <AssessmentHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title={`${currentSectionData.title || "Assessment"}`}
      />
      
      {/* Barre de progression */}
      <ProgressBar
        progress={progress}
        currentSection={currentSection + 1}
        totalSections={assessmentData.sections.length}
        levelColor={levelColor}
      />
      
      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Question actuelle */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            levelColor={levelColor}
          />
        )}
        
        {/* Options de réponse */}
        {currentQuestion && (
          <AnswerOptions
            options={currentQuestion.options}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            correctAnswer={currentQuestion.correctAnswer}
            levelColor={levelColor}
          />
        )}
        
        {/* Feedback */}
        {showFeedback && (
          <FeedbackDisplay
            isCorrect={isCorrect}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
          />
        )}
      </ScrollView>
      
      {/* Boutons d'action */}
      <ActionButtons
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        selectedAnswer={selectedAnswer}
        onCheck={checkAnswer}
        onNext={goToNext}
        onRetry={retryExercise}
        canCheck={canCheckAnswer()}
        levelColor={levelColor}
        style={styles.actionButtons}
      />
    </SafeAreaView>
  );
};

export default LevelAssessment;