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
import useProgress from '../../../hooks/useProgress'; // Ajout du hook de progression
import { getGrammarDataByLevel } from './utils/dataUtils';
import { EXERCISE_TYPES } from '../../../constants/exercicesTypes'; // Ajout des constantes de types d'exercices

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de grammaire
 */
const GrammarExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };

  // Utiliser le hook de progression
  const { updateProgress } = useProgress();

  // États spécifiques à la grammaire
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);
  const [grammarData, setGrammarData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputText, setInputText] = useState('');
  const [completedExercises, setCompletedExercises] = useState({});

  // Charger les données de grammaire
  useEffect(() => {
    const data = getGrammarDataByLevel(level);
    setGrammarData(data);
    
    // Initialiser le suivi des exercices complétés
    if (data && data.length > 0) {
      const initialCompletedExercises = {};
      data.forEach((_, index) => {
        initialCompletedExercises[index] = [];
      });
      setCompletedExercises(initialCompletedExercises);
    }
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
    canCheckAnswer,
    completedItems
  } = useExerciseState({
    type: EXERCISE_TYPES.GRAMMAR,
    level,
    exercises: currentRule.exercises,
    navigation,
    checkAnswerFn: checkGrammarAnswer,
    autoSaveProgress: false // Nous allons gérer manuellement la progression
  });

  // Mettre à jour la progression quand une réponse est correcte
  useEffect(() => {
    if (showFeedback && isCorrect) {
      // Mettre à jour l'état local des exercices complétés
      if (!completedExercises[selectedRuleIndex]) {
        completedExercises[selectedRuleIndex] = [];
      }
      
      if (!completedExercises[selectedRuleIndex].includes(currentExerciseIndex)) {
        const newCompletedExercises = { ...completedExercises };
        newCompletedExercises[selectedRuleIndex] = [
          ...newCompletedExercises[selectedRuleIndex],
          currentExerciseIndex
        ];
        setCompletedExercises(newCompletedExercises);
        
        // Mettre à jour la progression
        updateGrammarProgress(newCompletedExercises);
      }
    }
  }, [showFeedback, isCorrect, currentExerciseIndex, selectedRuleIndex]);
  
  // Fonction pour mettre à jour la progression de grammaire
  const updateGrammarProgress = (exercisesData = completedExercises) => {
    if (!grammarData || grammarData.length === 0) return;
    
    // Pour la règle actuelle
    const currentRuleId = currentRule.id || `rule_${selectedRuleIndex}`;
    const currentRuleExercisesCompleted = exercisesData[selectedRuleIndex]?.length || 0;
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
    
    grammarData.forEach((rule, ruleIndex) => {
      if (rule.exercises) {
        totalAllExercises += rule.exercises.length;
        completedAllExercises += exercisesData[ruleIndex]?.length || 0;
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

  // Changer de règle grammaticale
  const handleRuleChange = (index) => {
    if (index !== selectedRuleIndex) {
      // Sauvegarder la progression avant de changer de règle
      updateGrammarProgress();
      
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
  
  // Fonction personnalisée pour aller à l'exercice suivant avec mise à jour de la progression
  const handleNextExercise = () => {
    // Si c'est le dernier exercice de cette règle, mettre à jour la progression
    if (isLastExercise) {
      updateGrammarProgress();
    }
    goToNextExercise();
  };

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