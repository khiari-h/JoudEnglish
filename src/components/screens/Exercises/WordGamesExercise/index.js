// src/components/screens/Exercises/WordGamesExercise/index.js
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Animated, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

// Import des composants
import GameHeader from "./components/GameHeader";
import ProgressBar from "./components/ProgressBar";
import Timer from "./components/Timer";
import FeedbackMessage from "./components/FeedbackMessage";
import ActionButton from "./components/ActionButton";
import ResultsScreen from "./components/ResultsScreen";

// Import des composants de jeux
import MatchingGame from "./components/games/MatchingGame";
import WordSearchGame from "./components/games/WordSearchGame";
import AnagramGame from "./components/games/AnagramGame";
import CategorizationGame from "./components/games/CategorizationGame";

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from "../../../../hooks/common";
import useProgress from "../../../../hooks/useProgress"; // Ajout du hook de progression
import useGameTimer from "./hooks/useGameTimer";
import { exercises } from "../../../../data/exercises";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes"; // Ajout des constantes de types d'exercices

// Import des styles
import styles from "./style";

/**
 * Composant principal pour les jeux de mots
 */
const WordGamesExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // États spécifiques aux jeux de mots
  const [gamesData, setGamesData] = useState({ games: [] });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);

  // Utiliser le hook de progression pour mettre à jour l'avancement
  const { updateProgress } = useProgress();

  // Animations
  const { bounceAnim, pulse } = useAnimations({
    initialValues: { scale: 1 },
  });

  // Timer pour les jeux chronométrés
  const { timeLeft, isActive, startTimer, stopTimer, resetTimer } =
    useGameTimer(handleTimeUp);

  // Charger les données de jeux
  useEffect(() => {
    const data = exercises.wordGames[level] || { games: [] };
    setGamesData(data);

    // Initialiser les résultats
    if (data.games) {
      setGameResults(
        Array(data.games.length).fill({
          score: 0,
          maxScore: 0,
          completed: false,
        })
      );
    }
  }, [level]);

  // Fonction personnalisée pour vérifier les réponses de jeu
  const checkGameAnswer = () => {
    // Les jeux ont leur propre logique de vérification
    // Cette fonction est un placeholder
    return true;
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex: currentGameIndex,
    setCurrentIndex: setCurrentGameIndex,
    currentExercise, // Renommer cette variable
    showFeedback,
    isCorrect,
    progress,
    levelColor,
    resetExerciseState,
    goToNext,
    goToPrevious,
    handleGoBack,
    isLastExercise: isLastGame,
  } = useExerciseState({
    type: EXERCISE_TYPES.WORD_GAMES,
    level,
    exercises: gamesData.games || [],
    navigation,
    checkAnswerFn: checkGameAnswer,
    autoSaveProgress: false, // On va gérer la progression manuellement
  });

  // Sécuriser l'accès aux données de jeux
  if (!gamesData || !gamesData.games || gamesData.games.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <GameHeader
          level={level}
          levelColor={levelColor}
          navigation={navigation}
          title="Word Games"
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No games available</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Utiliser currentExercise au lieu de redéclarer currentGame
  const currentGame = gamesData.games[currentGameIndex];

  // Quand le jeu change, configurer le timer si nécessaire
  useEffect(() => {
    if (currentGame?.timeLimit) {
      startTimer(currentGame.timeLimit);
    } else {
      resetTimer();
    }

    return () => stopTimer();
  }, [currentGameIndex, currentGame, startTimer, resetTimer, stopTimer]);

  // Gérer la fin du temps
  function handleTimeUp() {
    // Logique pour gérer la fin du temps
  }

  // Gérer la complétion d'un jeu et mettre à jour la progression
  const handleGameComplete = (isSuccessful, earnedScore, maxPossibleScore) => {
    stopTimer();

    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    // Mettre à jour les résultats du jeu
    setGameResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[currentGameIndex] = {
        score: earnedScore,
        maxScore: maxPossibleScore,
        completed: true,
      };

      // Calculer et mettre à jour la progression globale
      const completedGames = newResults.filter(
        (result) => result.completed
      ).length;
      const totalGames = gamesData.games?.length || 0;

      // Mettre à jour la progression dans le système global
      updateProgress(
        `word_games_${level.toLowerCase()}`,
        EXERCISE_TYPES.WORD_GAMES,
        level,
        completedGames,
        totalGames
      );

      return newResults;
    });
  };

  // Mettre à jour la progression lorsque tous les jeux sont terminés
  useEffect(() => {
    if (showResults) {
      const completedGames = gameResults.filter(
        (result) => result.completed
      ).length;
      const totalGames = gamesData.games?.length || 0;

      // Mettre à jour la progression finale
      updateProgress(
        `word_games_${level.toLowerCase()}`,
        EXERCISE_TYPES.WORD_GAMES,
        level,
        completedGames,
        totalGames
      );
    }
  }, [showResults, gameResults, gamesData.games, level, updateProgress]);

  // Aller au jeu suivant ou afficher les résultats
  const handleNext = () => {
    if (isLastGame) {
      setShowResults(true);
    } else {
      goToNext();
    }
  };

  // Réinitialiser tous les jeux
  const resetGames = () => {
    setCurrentGameIndex(0);
    setScore(0);
    setShowResults(false);
    resetExerciseState();
    setGameResults(
      Array(gamesData.games?.length || 0).fill({
        score: 0,
        maxScore: 0,
        completed: false,
      })
    );
  };

  // Rendre le jeu actuel en fonction de son type
  const renderGame = () => {
    if (!currentGame) return null;

    switch (currentGame.type) {
      case "matching":
        return (
          <MatchingGame
            game={currentGame}
            onCompleted={handleGameComplete}
            levelColor={levelColor}
          />
        );
      case "word_search":
        return (
          <WordSearchGame
            game={currentGame}
            onCompleted={handleGameComplete}
            levelColor={levelColor}
            timeLeft={timeLeft}
          />
        );
      case "anagram":
        return (
          <AnagramGame
            game={currentGame}
            onCompleted={handleGameComplete}
            levelColor={levelColor}
            timeLeft={timeLeft}
          />
        );
      case "categorization":
        return (
          <CategorizationGame
            game={currentGame}
            onCompleted={handleGameComplete}
            levelColor={levelColor}
          />
        );
      default:
        return null;
    }
  };

  // Afficher les résultats si terminé
  if (showResults) {
    return (
      <ResultsScreen
        level={level}
        levelColor={levelColor}
        score={score}
        gameResults={gameResults}
        games={gamesData.games || []}
        onPlayAgain={resetGames}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête du jeu */}
      <GameHeader
        level={level}
        levelColor={levelColor}
        navigation={navigation}
        title={currentGame?.title || "Word Games"}
        score={score}
      />

      {/* Barre de progression */}
      <ProgressBar
        currentIndex={currentGameIndex}
        totalGames={gamesData.games?.length || 0}
        progress={progress}
        levelColor={levelColor}
      />

      {/* Timer si nécessaire */}
      {currentGame?.timeLimit && (
        <Timer
          timeLeft={timeLeft}
          isActive={isActive}
          levelColor={levelColor}
        />
      )}

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Jeu actuel */}
        {renderGame()}

        {/* Feedback */}
        {showFeedback && (
          <FeedbackMessage
            isCorrect={isCorrect}
            message={currentGame?.feedback}
            correctAnswer={currentGame?.correctAnswer}
          />
        )}
      </ScrollView>

      {/* Boutons d'action */}
      <View style={styles.actionButtonsContainer}>
        {currentGameIndex > 0 && (
          <ActionButton
            title="Previous Game"
            onPress={goToPrevious}
            variant="outlined"
            color={levelColor}
            style={styles.prevButton}
          />
        )}

        <ActionButton
          title={isLastGame ? "See Results" : "Next Game"}
          onPress={handleNext}
          color={levelColor}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default WordGamesExercise;
