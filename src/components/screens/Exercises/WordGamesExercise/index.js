import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from './style';

// Import des hooks
import useWordGames from './hooks/useWordGames';

// Import des composants
import GameHeader from './components/GameHeader';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import FeedbackMessage from './components/FeedbackMessage';
import ActionButton, { ActionContainer } from './components/ActionButton';
import ResultsScreen from './components/ResultsScreen';

// Import des composants de jeux
import AnagramGame from './components/games/AnagramGame';
import MatchingGame from './components/games/MatchingGame';
import WordSearchGame from './components/games/WordSearchGame';
import CategorizationGame from './components/games/CategorizationGame';

/**
 * Écran principal pour les exercices de jeux de mots
 */
const WordGamesExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  
  // Animation pour les effets de rebond
  const [bounceAnim] = useState(new Animated.Value(1));
  
  // Hook principal pour la gestion des jeux
  const {
    games,
    currentGameIndex,
    currentGame,
    showFeedback,
    showResults,
    gameResults,
    score,
    isCorrect,
    timeLeft,
    isActive,
    levelColor,
    checkAnswer,
    handleGameComplete,
    goToNextGame,
    resetGames
  } = useWordGames(level, navigation);

  // Afficher l'écran de chargement si les jeux ne sont pas encore chargés
  if (!currentGame) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading games...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Afficher message si aucun jeu n'est disponible
  if (games.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameHeader level={level} levelColor={levelColor} navigation={navigation} />
        <View style={styles.emptyGamesContainer}>
          <Text style={styles.emptyGamesText}>
            Aucun jeu de mots disponible pour le niveau {level}.
          </Text>
          <ActionButton 
            text="Retour"
            levelColor={levelColor}
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Afficher les résultats finaux
  if (showResults) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <GameHeader level={level} levelColor={levelColor} navigation={navigation} />
        <ResultsScreen 
          games={games}
          gameResults={gameResults}
          levelColor={levelColor}
          navigation={navigation}
          onRestart={resetGames}
        />
      </SafeAreaView>
    );
  }

  // Fonction pour rendre le jeu en fonction de son type
  const renderGameByType = () => {
    switch (currentGame.type) {
      case "anagram":
        return (
          <AnagramGame
            game={currentGame}
            onCompleted={handleGameComplete}
            levelColor={levelColor}
          />
        );
        
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
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Unknown game type: {currentGame.type}
            </Text>
          </View>
        );
    }
  };

  // Rendu principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <GameHeader level={level} levelColor={levelColor} navigation={navigation} />
      
      <ProgressBar
        currentStep={currentGameIndex}
        totalSteps={games.length}
        levelColor={levelColor}
        showFeedback={showFeedback}
      />
      
      <Timer timeLeft={timeLeft} isActive={isActive} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Animated.View
          style={[
            styles.gameCardContainer,
            {
              transform: [{ scale: bounceAnim }],
            },
          ]}
        >
          {/* Titre du jeu */}
          {currentGame.title && (
            <Text style={styles.gameTitle}>{currentGame.title}</Text>
          )}

          {/* Rendu du jeu actuel */}
          {renderGameByType()}

          {/* Feedback après vérification */}
          {showFeedback && (
            <FeedbackMessage 
              isCorrect={isCorrect}
              levelColor={levelColor}
              game={currentGame}
            />
          )}
        </Animated.View>
      </ScrollView>

      <ActionContainer>
        {!showFeedback ? (
          <ActionButton
            text={
              currentGame.type === "matching" ||
              currentGame.type === "word_search"
                ? "Find all matches"
                : "Check Answer"
            }
            levelColor={levelColor}
            onPress={() => checkAnswer()}
            disabled={
              currentGame.type === "matching" ||
              currentGame.type === "word_search"
            }
          />
        ) : (
          <ActionButton
            text={
              currentGameIndex < games.length - 1
                ? "Next Game"
                : "See Results"
            }
            levelColor={levelColor}
            onPress={goToNextGame}
          />
        )}
      </ActionContainer>
    </SafeAreaView>
  );
};

export default WordGamesExercise;