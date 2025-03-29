import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import components
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import ExerciseCard from '../../components/ExerciseCard';
import ResultsScreen from '../../components/ResultsScreen';

// Import hooks et utilities globaux
import { useExerciseState } from '../../../hooks/common';
import useExerciseType from '../../../hooks/useExerciseType';
import { getLevelColor } from '../../../utils/levelUtils';
import { EXERCISE_TYPES } from '../../../constants/exercicesTypes';
import { DEFAULT_CORRECTION_DATA } from '../../constants';

// Import styles
import styles from './styles';

/**
 * Écran de pratique pour la correction d'orthographe
 */
const CorrectionPractice = () => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  const levelColor = getLevelColor(level);
  
  // État pour les données d'exercices
  const [exercisesData, setExercisesData] = useState(null);
  const [hintState, setHintState] = useState({
    hasHint: false,
    showHint: false
  });
  
  // Utiliser le hook de type d'exercice
  const { updateExerciseProgress } = useExerciseType(EXERCISE_TYPES.SPELLING);
  
  // Charger les données d'exercices
  useEffect(() => {
    try {
      // Note: Dans une implémentation réelle, vous devriez charger les données en fonction du niveau
      let spellingCorrectionData;
      try {
        // Simulation de l'importation des données de correction pour le niveau approprié
        spellingCorrectionData = DEFAULT_CORRECTION_DATA;
      } catch (error) {
        console.warn("Erreur lors de l'importation des fichiers de correction d'orthographe");
        spellingCorrectionData = DEFAULT_CORRECTION_DATA;
      }
      
      setExercisesData(spellingCorrectionData);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setExercisesData(DEFAULT_CORRECTION_DATA);
    }
  }, [level]);
  
  // Utiliser le hook d'état d'exercice global
  const {
    currentIndex,
    currentExercise,
    showFeedback,
    isCorrect,
    userAnswer,
    completedItems,
    progress,
    setUserAnswer,
    checkAnswer,
    goToNext,
    resetExerciseState,
    canCheckAnswer,
    isLastExercise
  } = useExerciseState({
    type: EXERCISE_TYPES.SPELLING,
    level,
    exercises: exercisesData?.exercises || [],
    autoSaveProgress: true,
    // Fonction personnalisée pour vérifier la réponse
    checkAnswerFn: (answer, exercise) => {
      if (!answer || !exercise) return false;
      return answer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
    }
  });

  // Mettre à jour l'état de l'indice quand l'exercice change
  useEffect(() => {
    if (currentExercise && currentExercise.hasHint !== undefined) {
      setHintState({
        hasHint: currentExercise.hasHint,
        showHint: false
      });
    } else {
      setHintState({
        hasHint: true,
        showHint: false
      });
    }
  }, [currentIndex, currentExercise]);

  // Toggle indice
  const toggleHint = () => {
    setHintState(prev => ({
      ...prev,
      showHint: !prev.showHint
    }));
  };

  // Affiche l'écran de chargement si les données ne sont pas encore chargées
  if (!exercisesData || !exercisesData.exercises) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Loading correction exercises...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si l'exercice actuel n'existe pas
  if (!currentExercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header level={level} title="Spelling Correction" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            No correction exercises found for this level.
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: levelColor, marginTop: 20 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Affiche l'écran de résultats si tous les exercices sont terminés
  // Note: dans la version complète, vous pourriez utiliser un composant ResultsScreen séparé
  if (completedItems.length === exercisesData.exercises.length && exercisesData.exercises.length > 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ResultsScreen
          exercises={exercisesData.exercises}
          userAttempts={exercisesData.exercises.map((_, index) => ({
            input: completedItems.includes(index) ? exercisesData.exercises[index].correctAnswer : "",
            isCorrect: completedItems.includes(index),
            attempted: completedItems.includes(index)
          }))}
          score={completedItems.length}
          level={level}
          levelColor={levelColor}
          title="Spelling Correction"
          resetExercise={() => {
            resetExerciseState();
            // Enregistrer la progression
            updateExerciseProgress(
              level,
              "spelling_correction",
              completedItems.length,
              exercisesData.exercises.length
            );
          }}
        />
      </SafeAreaView>
    );
  }

  // Affiche l'exercice principal
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec niveau et titre */}
      <Header level={level} title="Spelling Correction" />

      {/* Barre de progression */}
      <ProgressBar
        currentIndex={currentIndex}
        total={exercisesData.exercises.length}
        showFeedback={showFeedback}
        color={levelColor}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Carte de l'exercice */}
        <ExerciseCard
          exercise={currentExercise}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          hasHint={hintState.hasHint}
          showHint={hintState.showHint}
          toggleHint={toggleHint}
          levelColor={levelColor}
        />
      </ScrollView>

      {/* Boutons d'action en bas */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              !canCheckAnswer()
                ? styles.disabledButton
                : [styles.enabledButton, { backgroundColor: levelColor }],
            ]}
            onPress={checkAnswer}
            disabled={!canCheckAnswer()}
          >
            <Text style={styles.actionButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.enabledButton,
              { backgroundColor: levelColor },
            ]}
            onPress={goToNext}
          >
            <Text style={styles.actionButtonText}>
              {!isLastExercise ? "Next Word" : "See Results"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CorrectionPractice;