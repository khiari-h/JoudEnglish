// src/components/screens/Exercises/ErrorCorrectionExercise/index.js
import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import ExerciseHeader from './components/ExerciseHeader';
import BrowseMode from './components/BrowseMode';
import ExerciseMode from './components/ExerciseMode';
import ResultsMode from './components/ResultsMode';

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from '../../../hooks/common';
import { getErrorCorrectionDataByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de correction d'erreurs
 */
const ErrorCorrectionExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // États spécifiques à la correction d'erreurs
  const [viewMode, setViewMode] = useState('browse'); // 'browse', 'exercise', 'results'
  const [exercisesData, setExercisesData] = useState({ categories: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [correctionMode, setCorrectionMode] = useState('full'); // 'full', 'identify', 'multiple_choice'
  const [userCorrection, setUserCorrection] = useState('');
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState([]);
  
  // Animations
  const { fadeAnim, scaleAnim, animateIn, resetAnimations } = useAnimations();
  
  // Charger les données d'exercice
  useEffect(() => {
    const data = getErrorCorrectionDataByLevel(level);
    setExercisesData(data);
    if (data.categories && data.categories.length > 0) {
      setSelectedCategory(data.categories[0].id);
    }
  }, [level]);
  
  // Filtrer les exercices par catégorie
  const exercises = exercisesData.categories
    ? exercisesData.categories.find(c => c.id === selectedCategory)?.exercises || []
    : [];
  
  // Fonction personnalisée pour vérifier les réponses
  const checkErrorCorrection = (userAnswer, exercise) => {
    if (correctionMode === 'full') {
      // Normaliser et comparer les corrections
      return userAnswer.trim().toLowerCase() === exercise.correctText.toLowerCase();
    } else if (correctionMode === 'identify') {
      // Vérifier si les erreurs identifiées correspondent
      const errorIndices = exercise.errorIndices || [];
      return userAnswer.length === errorIndices.length && 
        userAnswer.every(index => errorIndices.includes(index));
    } else if (correctionMode === 'multiple_choice') {
      // Vérifier le choix sélectionné
      return userAnswer === exercise.correctChoiceIndex;
    }
    return false;
  };
  
  // Utiliser le hook générique d'exercice
  const {
    currentIndex,
    setCurrentIndex,
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
    goToNext,
    goToPrevious,
    handleGoBack,
    canGoToNext,
    canGoToPrevious,
    canCheckAnswer,
    completedItems
  } = useExerciseState({
    type: 'error_correction',
    level,
    exercises,
    navigation,
    checkAnswerFn: checkErrorCorrection,
    autoSaveProgress: viewMode === 'exercise'
  });
  
  // Mise à jour de la réponse utilisateur en fonction du mode
  useEffect(() => {
    if (correctionMode === 'full') {
      setUserAnswer(userCorrection);
    } else if (correctionMode === 'identify') {
      setUserAnswer(selectedErrorIndices);
    } else if (correctionMode === 'multiple_choice') {
      setUserAnswer(selectedChoiceIndex);
    }
  }, [correctionMode, userCorrection, selectedErrorIndices, selectedChoiceIndex, setUserAnswer]);
  
  // Démarrer un exercice
  const startExercise = (mode) => {
    setCorrectionMode(mode);
    setViewMode('exercise');
    setCurrentIndex(0);
    resetExerciseState();
    setUserCorrection('');
    setSelectedErrorIndices([]);
    setSelectedChoiceIndex(null);
    setShowHint(false);
    resetAnimations();
    animateIn();
  };
  
  // Gérer le clic sur un mot (pour l'identification d'erreurs)
  const handleWordPress = (index) => {
    if (showFeedback) return;
    
    const newIndices = [...selectedErrorIndices];
    const indexPosition = newIndices.indexOf(index);
    
    if (indexPosition === -1) {
      newIndices.push(index);
    } else {
      newIndices.splice(indexPosition, 1);
    }
    
    setSelectedErrorIndices(newIndices);
  };
  
  // Aller à l'exercice suivant ou afficher les résultats
  const handleNext = () => {
    if (isLastExercise) {
      // Finaliser et afficher les résultats
      setResults([...completedItems.map(index => ({
        exercise: exercises[index],
        isCorrect: true
      }))]);
      setViewMode('results');
    } else {
      goToNext();
      resetAnimations();
      animateIn();
      setUserCorrection('');
      setSelectedErrorIndices([]);
      setSelectedChoiceIndex(null);
      setShowHint(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <ExerciseHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title="Error Correction"
      />
      
      {/* Mode navigation */}
      {viewMode === 'browse' && (
        <BrowseMode
          exercisesData={exercisesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          exercises={exercises}
          startExercise={startExercise}
          levelColor={levelColor}
        />
      )}
      
      {/* Mode exercice */}
      {viewMode === 'exercise' && (
        <ExerciseMode
          exercises={exercises}
          currentExerciseIndex={currentIndex}
          userCorrection={userCorrection}
          setUserCorrection={setUserCorrection}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          correctionMode={correctionMode}
          selectedErrorIndices={selectedErrorIndices}
          handleWordPress={handleWordPress}
          selectedChoiceIndex={selectedChoiceIndex}
          handleChoiceSelect={setSelectedChoiceIndex}
          showHint={showHint}
          setShowHint={setShowHint}
          checkCorrection={checkAnswer}
          goToNextExercise={handleNext}
          setViewMode={setViewMode}
          levelColor={levelColor}
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
        />
      )}
      
      {/* Mode résultats */}
      {viewMode === 'results' && (
        <ResultsMode
          results={results}
          totalExercises={exercises.length}
          levelColor={levelColor}
          onStartOver={() => setViewMode('browse')}
        />
      )}
    </SafeAreaView>
  );
};

export default ErrorCorrectionExercise;