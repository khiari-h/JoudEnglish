import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

// Import components
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import ExerciseCard from "../../components/ExerciseCard";
import ResultsScreen from "../../components/ResultsScreen";

// Import hooks et utilities globaux
import { useExerciseState } from "../../../../../../hooks/common";
import useSpellingExercise from "../../hooks/useSpellingExercice";
import { getLevelColor } from "../../../../../../utils/getLevelColor";
import { EXERCISE_TYPES } from "../../../../../../constants/exercicesTypes";
import { DEFAULT_CORRECTION_DATA } from "../../constants";

// Import styles
import styles from "./styles";

/**
 * Écran de pratique pour la correction d'orthographe
 */
const CorrectionPractice = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  const levelColor = getLevelColor(level);

  // État pour les données d'exercices
  const [exercisesData, setExercisesData] = useState(null);
  const [hintState, setHintState] = useState({
    hasHint: false,
    showHint: false,
  });
  const [completedExercises, setCompletedExercises] = useState([]);

  // Utiliser le hook personnalisé pour les exercices d'orthographe
  const { updateCorrectionProgress, getCorrectionProgress } =
    useSpellingExercise();

  // Charger les données d'exercices
  useEffect(() => {
    try {
      // Note: Dans une implémentation réelle, vous devriez charger les données en fonction du niveau
      let spellingCorrectionData;
      try {
        // Simulation de l'importation des données de correction pour le niveau approprié
        spellingCorrectionData = DEFAULT_CORRECTION_DATA;
      } catch (error) {
        console.warn(
          "Erreur lors de l'importation des fichiers de correction d'orthographe"
        );
        spellingCorrectionData = DEFAULT_CORRECTION_DATA;
      }

      setExercisesData(spellingCorrectionData);

      // Vérifier s'il y a une progression existante
      const progress = getCorrectionProgress(level);
      if (progress && progress.completed > 0) {
        console.log("Progression existante:", progress);
        // Vous pourriez restaurer l'état des exercices complétés ici
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setExercisesData(DEFAULT_CORRECTION_DATA);
    }
  }, [level, getCorrectionProgress]);

  // Fonction personnalisée pour vérifier les réponses
  const checkAnswerFn = (answer, exercise) => {
    if (!answer || !exercise) return false;
    return answer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
  };

  // Utiliser le hook d'état d'exercice global
  const {
    currentIndex,
    currentExercise,
    showFeedback,
    isCorrect,
    userAnswer,
    progress,
    setUserAnswer,
    checkAnswer,
    goToNext,
    resetExerciseState,
    canCheckAnswer,
    isLastExercise,
  } = useExerciseState({
    type: EXERCISE_TYPES.SPELLING,
    level,
    exercises: exercisesData?.exercises || [],
    checkAnswerFn: checkAnswerFn,
    autoSaveProgress: false, // On va gérer la sauvegarde manuellement
  });

  // Mettre à jour l'état de l'indice quand l'exercice change
  useEffect(() => {
    if (currentExercise && currentExercise.hasHint !== undefined) {
      setHintState({
        hasHint: currentExercise.hasHint,
        showHint: false,
      });
    } else {
      setHintState({
        hasHint: true,
        showHint: false,
      });
    }
  }, [currentIndex, currentExercise]);

  // Toggle indice
  const toggleHint = () => {
    setHintState((prev) => ({
      ...prev,
      showHint: !prev.showHint,
    }));
  };

  // Mettre à jour la progression quand une réponse est correcte
  useEffect(() => {
    if (
      showFeedback &&
      isCorrect &&
      !completedExercises.includes(currentIndex)
    ) {
      const newCompletedExercises = [...completedExercises, currentIndex];
      setCompletedExercises(newCompletedExercises);

      // Mettre à jour la progression
      const totalExercises = exercisesData?.exercises?.length || 0;
      updateCorrectionProgress(
        level,
        newCompletedExercises.length,
        totalExercises
      );
    }
  }, [
    showFeedback,
    isCorrect,
    currentIndex,
    completedExercises,
    exercisesData,
    level,
    updateCorrectionProgress,
  ]);

  // Fonction personnalisée pour passer à l'exercice suivant
  // ou afficher les résultats
  const handleGoToNext = () => {
    if (isLastExercise) {
      // Mettre à jour une dernière fois la progression
      const totalExercises = exercisesData?.exercises?.length || 0;
      updateCorrectionProgress(
        level,
        completedExercises.length,
        totalExercises
      );
    }
    goToNext();
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

  // Affiche l'écran de résultats si tous les exercices sont terminés et que nous sommes au dernier exercice
  if (
    completedExercises.length === exercisesData.exercises.length &&
    isLastExercise &&
    showFeedback
  ) {
    // Mettre à jour une dernière fois la progression à 100%
    updateCorrectionProgress(
      level,
      exercisesData.exercises.length,
      exercisesData.exercises.length
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <ResultsScreen
          exercises={exercisesData.exercises}
          userAttempts={exercisesData.exercises.map((_, index) => ({
            input: completedExercises.includes(index)
              ? exercisesData.exercises[index].correctAnswer
              : "",
            isCorrect: completedExercises.includes(index),
            attempted: completedExercises.includes(index),
          }))}
          score={completedExercises.length}
          level={level}
          levelColor={levelColor}
          title="Spelling Correction"
          resetExercise={() => {
            resetExerciseState();
            setCompletedExercises([]);
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
            onPress={handleGoToNext}
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
