// src/components/screens/Exercises/GrammarExercise/index.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import ExerciseHeader from './components/ExerciseHeader';
import RuleSelector from './components/RuleSelector';
import ProgressBar from './components/ProgressBar';
import RuleDisplay from './components/RuleDisplay';
import ExerciseContainer from './components/ExerciseContainer';
import FeedbackDisplay from './components/FeedbackDisplay';
import ExerciseActions from './components/ExerciseActions';

// Import des hooks personnalisés
import { useExerciseState } from '../../../hooks/common';
import { getGrammarDataByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de grammaire
 */
const GrammarExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };

  // États spécifiques à la grammaire
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);
  const [grammarData, setGrammarData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState('');

  // Charger les données de grammaire
  useEffect(() => {
    const data = getGrammarDataByLevel(level);
    setGrammarData(data);
  }, [level]);

  // Obtenir la règle et les exercices actuels
  const currentRule = grammarData[selectedRuleIndex] || { exercises: [] };

  // Fonction personnalisée pour vérifier les réponses
  const checkGrammarAnswer = (userAnswer, exercise) => {
    if (exercise.type === 'multiple_choice') {
      return userAnswer === exercise.correctOption;
    } else if (exercise.type === 'fill_blank') {
      const normalizedAnswer = userAnswer.trim().toLowerCase();
      return exercise.acceptedAnswers.some(
        answer => normalizedAnswer === answer.toLowerCase()
      );
    }
    return false;
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex: currentExerciseIndex,
    setCurrentIndex: setCurrentExerciseIndex,
    currentExercise,
    showFeedback,
    isCorrect,
    attempts,
    userAnswer,
    setUserAnswer,
    progress,
    levelColor,
    isLastExercise,
    checkAnswer,
    retryExercise,
    resetExerciseState,
    goToNext: goToNextExercise,
    goToPrevious: goToPreviousExercise,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    canCheckAnswer
  } = useExerciseState({
    type: 'grammar',
    level,
    exercises: currentRule.exercises,
    navigation,
    checkAnswerFn: checkGrammarAnswer
  });

  // Changer de règle grammaticale
  const handleRuleChange = (index) => {
    if (index !== selectedRuleIndex) {
      setSelectedRuleIndex(index);
      resetExerciseState();
      setCurrentExerciseIndex(0);
      setSelectedOption(null);
      setInputText('');
    }
  };

  // Mise à jour de la réponse utilisateur selon le type d'exercice
  useEffect(() => {
    if (currentExercise?.type === 'multiple_choice') {
      setUserAnswer(selectedOption);
    } else if (currentExercise?.type === 'fill_blank') {
      setUserAnswer(inputText);
    }
  }, [selectedOption, inputText, currentExercise, setUserAnswer]);

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
        rules={grammarData}
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
        onNext={goToNextExercise}
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