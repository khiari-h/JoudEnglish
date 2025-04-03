// src/components/screens/Exercises/WordGamesExercise/index.js
import React from 'react';
import BaseExercise from '../../../common/BaseExercise';
import { NavigationButton, IconButton } from '../../../common/Navigation';
import { AnimatedFeedback, ExerciseFeedback } from '../../../common/Feedback';
import GameCard from './components/GameCard';
import { useRoute } from "@react-navigation/native";

// Import des hooks personnalisés
import { useExerciseState, useAnimations } from "../../../../hooks/common";
import useProgress from "../../../../hooks/useProgress";
import useGameTimer from "./hooks/useGameTimer";
import { getWordGamesDataByLevel } from "./utils/dataUtils";
import { EXERCISE_TYPES } from "../../../../constants/exercicesTypes";

const WordGamesExercise = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // États spécifiques aux jeux de mots
  const [gamesData, setGamesData] = React.useState({ games: [] });
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameResults, setGameResults] = React.useState([]);

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
  React.useEffect(() => {
    const data = getWordGamesDataByLevel(level);
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
    return true;
  };

  // Utiliser le hook générique d'exercice
  const {
    currentIndex: currentGameIndex,
    setCurrentIndex: setCurrentGameIndex,
    currentExercise: currentGame,
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
    autoSaveProgress: false,
  });

  // Quand le jeu change, configurer le timer si nécessaire
  React.useEffect(() => {
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

    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    setGameResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[currentGameIndex] = {
        score: earnedScore,
        maxScore: maxPossibleScore,
        completed: true,
      };

      const completedGames = newResults.filter(
        (result) => result.completed
      ).length;
      const totalGames = gamesData.games?.length || 0;

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

  React.useEffect(() => {
    if (showResults) {
      const completedGames = gameResults.filter(
        (result) => result.completed
      ).length;
      const totalGames = gamesData.games?.length || 0;

      updateProgress(
        `word_games_${level.toLowerCase()}`,
        EXERCISE_TYPES.WORD_GAMES,
        level,
        completedGames,
        totalGames
      );
    }
  }, [showResults, gameResults, gamesData.games, level, updateProgress]);

  const handleNext = () => {
    if (isLastGame) {
      setShowResults(true);
    } else {
      goToNext();
    }
  };

  const handlePrevious = () => {
    goToPrevious();
  };

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

  const renderActions = () => (
    <NavigationButtons
      onNext={handleNext}
      onPrevious={handlePrevious}
      isLastGame={isLastGame}
      levelColor={levelColor}
    />
  );

  return (
    <BaseExercise
      title="Word Games"
      level={level}
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
      renderActions={renderActions}
    >
      <GameCard
        game={currentGame}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        levelColor={levelColor}
      />
    </BaseExercise>
  );
};

export default WordGamesExercise;
