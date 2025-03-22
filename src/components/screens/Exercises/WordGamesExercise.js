// src/components/screens/exercises/WordGamesExercise.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  FlatList,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import des données fictives pour les jeux de mots par niveau
import wordGamesA1Data from "../../../data/exercises/wordGames/wordGamesA1";
import wordGamesA2Data from "../../../data/exercises/wordGames/wordGamesA2";
import wordGamesB1Data from "../../../data/exercises/wordGames/wordGamesB1";
import wordGamesB2Data from "../../../data/exercises/wordGames/wordGamesB2";
import wordGamesC1Data from "../../../data/exercises/wordGames/wordGamesC1";
import wordGamesC2Data from "../../../data/exercises/wordGames/wordGamesC2";

const WordGamesExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // États pour gérer le jeu
  const [games, setGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const timerRef = useRef(null);

  // Détermine la couleur en fonction du niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Récupère les données en fonction du niveau
  const getWordGamesData = (level) => {
    const dataMap = {
      A1: wordGamesA1Data,
      A2: wordGamesA2Data,
      B1: wordGamesB1Data,
      B2: wordGamesB2Data,
      C1: wordGamesC1Data,
      C2: wordGamesC2Data,
    };
    return dataMap[level] || wordGamesA1Data;
  };

  // Initialise les jeux en fonction du niveau
  useEffect(() => {
    const data = getWordGamesData(level);
    if (data && data.games) {
      setGames(data.games);
      initializeGameResults(data.games.length);
    }
  }, [level]);

  // Initialise les résultats des jeux
  const initializeGameResults = (length) => {
    setGameResults(
      Array(length).fill({ score: 0, maxScore: 0, completed: false })
    );
  };

  // Configure le jeu actuel
  useEffect(() => {
    if (games.length > 0 && currentGameIndex < games.length) {
      const currentGame = games[currentGameIndex];

      // Réinitialise les états pour le jeu actuel
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);

      // Configure le timer si nécessaire
      if (currentGame.timeLimit) {
        setTimeLeft(currentGame.timeLimit);
        setTimerActive(true);
      } else {
        setTimeLeft(0);
        setTimerActive(false);
      }

      // Mélange les options si nécessaire
      if (
        currentGame.type === "anagram" ||
        currentGame.type === "matching" ||
        currentGame.type === "categorization"
      ) {
        shuffleGameOptions(currentGame);
      }
    }
  }, [games, currentGameIndex]);

  // Gestion du timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      // Le temps est écoulé, traiter comme une réponse
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerActive, timeLeft]);

  // Gestion du temps écoulé
  const handleTimeUp = () => {
    setTimerActive(false);
    checkAnswer(true);
  };

  // Mélange les options du jeu
  const shuffleGameOptions = (game) => {
    let optionsToShuffle = [];

    if (game.type === "anagram") {
      // Pour les anagrammes, mélanger les lettres
      optionsToShuffle = game.word.split("").sort(() => Math.random() - 0.5);
    } else if (game.type === "matching") {
      // Pour le matching, mélanger les paires
      const allItems = [
        ...game.pairs.flatMap((pair) => [pair.word, pair.match]),
      ];
      optionsToShuffle = allItems.sort(() => Math.random() - 0.5);
    } else if (game.type === "categorization") {
      // Pour la catégorisation, mélanger les mots à classer
      optionsToShuffle = game.words.sort(() => Math.random() - 0.5);
    }

    setShuffledOptions(optionsToShuffle);
  };

  // Le jeu actuel
  const currentGame = games[currentGameIndex] || null;

  // Gestion de la sélection d'un item
  const handleSelectItem = (item, index) => {
    if (showFeedback) return;

    // Animation de rebond au clic
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    let newSelectedItems = [...selectedItems];

    if (currentGame.type === "anagram") {
      // Pour les anagrammes, ajouter/supprimer les lettres
      const itemIndex = newSelectedItems.findIndex((i) => i.index === index);

      if (itemIndex !== -1) {
        // Si déjà sélectionné, le retirer
        newSelectedItems.splice(itemIndex, 1);
      } else {
        // Sinon l'ajouter
        newSelectedItems.push({ value: item, index });
      }
    } else if (currentGame.type === "matching") {
      // Pour le matching, sélectionner deux items à la fois
      if (newSelectedItems.length < 2) {
        newSelectedItems.push({ value: item, index });

        // Si deux items sont sélectionnés, vérifier s'ils forment une paire
        if (newSelectedItems.length === 2) {
          checkMatchingPair(newSelectedItems);
        }
      }
    } else if (currentGame.type === "categorization") {
      // Pour la catégorisation, toggle la sélection
      const itemIndex = newSelectedItems.findIndex((i) => i.value === item);

      if (itemIndex !== -1) {
        newSelectedItems.splice(itemIndex, 1);
      } else {
        newSelectedItems.push({ value: item, index });
      }
    } else if (currentGame.type === "word_search") {
      // Pour la recherche de mots, sélectionner des lettres consécutives
      // (Simplifié pour cet exemple)
      const itemIndex = newSelectedItems.findIndex((i) => i.index === index);

      if (itemIndex !== -1) {
        // Si déjà sélectionné, retirer tous les suivants
        newSelectedItems = newSelectedItems.slice(0, itemIndex);
      } else if (
        newSelectedItems.length === 0 ||
        isAdjacent(
          newSelectedItems[newSelectedItems.length - 1].index,
          index,
          currentGame.grid[0].length
        )
      ) {
        // Ajouter si adjacent au dernier sélectionné ou si c'est le premier
        newSelectedItems.push({ value: item, index });
      }
    }

    setSelectedItems(newSelectedItems);
  };

  // Vérifie si deux indices sont adjacents dans une grille
  const isAdjacent = (index1, index2, gridWidth) => {
    const row1 = Math.floor(index1 / gridWidth);
    const col1 = index1 % gridWidth;
    const row2 = Math.floor(index2 / gridWidth);
    const col2 = index2 % gridWidth;

    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
  };

  // Vérifie si deux items sélectionnés forment une paire
  const checkMatchingPair = (items) => {
    const isPair = currentGame.pairs.some(
      (pair) =>
        (items[0].value === pair.word && items[1].value === pair.match) ||
        (items[0].value === pair.match && items[1].value === pair.word)
    );

    if (isPair) {
      // Marquer la paire comme trouvée
      setMatchedItems([...matchedItems, items[0].value, items[1].value]);

      // Animation pour une paire correcte
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Réinitialiser la sélection
      setTimeout(() => {
        setSelectedItems([]);

        // Si toutes les paires sont trouvées
        if (matchedItems.length + 2 === currentGame.pairs.length * 2) {
          handleGameComplete(true);
        }
      }, 500);
    } else {
      // Animation pour une paire incorrecte
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Réinitialiser la sélection après un court délai
      setTimeout(() => {
        setSelectedItems([]);
      }, 1000);
    }
  };

  // Vérifie la réponse de l'utilisateur
  const checkAnswer = (isTimeUp = false) => {
    if (showFeedback) return;

    let isCorrect = false;
    let earnedScore = 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    if (currentGame.type === "anagram") {
      // Pour les anagrammes, vérifier si le mot formé est correct
      const userWord = selectedItems.map((item) => item.value).join("");
      isCorrect = userWord.toLowerCase() === currentGame.word.toLowerCase();
      earnedScore = isCorrect ? maxPossibleScore : 0;
    } else if (currentGame.type === "word_search") {
      // Pour la recherche de mots, vérifier si le mot sélectionné est dans la liste
      const selectedWord = selectedItems.map((item) => item.value).join("");
      isCorrect = currentGame.words.includes(selectedWord.toLowerCase());

      if (isCorrect) {
        // Ajouter le mot trouvé aux mots correspondants
        setMatchedItems([...matchedItems, selectedWord.toLowerCase()]);
        earnedScore = Math.floor(maxPossibleScore / currentGame.words.length);

        // Réinitialiser la sélection pour le prochain mot
        setSelectedItems([]);

        // Si tous les mots sont trouvés
        if (matchedItems.length + 1 === currentGame.words.length) {
          handleGameComplete(true);
          return;
        }

        return; // Ne pas montrer de feedback, continuer le jeu
      }
    } else if (currentGame.type === "categorization") {
      // Pour la catégorisation, vérifier si les mots sont dans la bonne catégorie
      const selectedWords = selectedItems.map((item) => item.value);
      const expectedWords = currentGame.categories[currentGame.currentCategory];

      // Vérifier que tous les mots sélectionnés sont dans la catégorie
      // et que tous les mots de la catégorie sont sélectionnés
      isCorrect =
        selectedWords.every((word) => expectedWords.includes(word)) &&
        expectedWords.every((word) => selectedWords.includes(word));

      earnedScore = isCorrect ? maxPossibleScore : 0;
    }

    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    // Mettre à jour les résultats du jeu
    const newGameResults = [...gameResults];
    newGameResults[currentGameIndex] = {
      score: earnedScore,
      maxScore: maxPossibleScore,
      completed: true,
    };
    setGameResults(newGameResults);

    // Montrer le feedback
    setIsCorrect(isCorrect);
    setShowFeedback(true);

    // Animation pour le feedback
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Gestion de la fin d'un jeu
  const handleGameComplete = (isSuccessful) => {
    setTimerActive(false);

    const earnedScore = isSuccessful ? currentGame.maxScore || 10 : 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    // Mettre à jour les résultats du jeu
    const newGameResults = [...gameResults];
    newGameResults[currentGameIndex] = {
      score: earnedScore,
      maxScore: maxPossibleScore,
      completed: true,
    };
    setGameResults(newGameResults);

    // Montrer le feedback
    setIsCorrect(isSuccessful);
    setShowFeedback(true);
  };

  // Passe au jeu suivant
  const handleNextGame = () => {
    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setShowResults(true);
    }
  };

  // Réinitialise tous les jeux
  const resetGames = () => {
    setCurrentGameIndex(0);
    setSelectedItems([]);
    setMatchedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setScore(0);
    initializeGameResults(games.length);

    // Si le jeu actuel a un timer, le réinitialiser
    if (games[0] && games[0].timeLimit) {
      setTimeLeft(games[0].timeLimit);
      setTimerActive(true);
    }

    // Mélanger les options du premier jeu si nécessaire
    if (games[0]) {
      shuffleGameOptions(games[0]);
    }
  };

  // Rendu d'un jeu d'anagramme
  const renderAnagramGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{currentGame.instructions}</Text>

      {/* Zone de réponse de l'utilisateur */}
      <View style={styles.answerContainer}>
        {selectedItems.map((item, index) => (
          <TouchableOpacity
            key={`selected-${index}`}
            style={[styles.letterTile, { backgroundColor: `${levelColor}20` }]}
            onPress={() => handleSelectItem(item.value, item.index)}
          >
            <Text style={[styles.letterText, { color: levelColor }]}>
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lettres disponibles */}
      <View style={styles.lettersContainer}>
        {shuffledOptions.map((letter, index) => {
          const isSelected = selectedItems.some((item) => item.index === index);
          return (
            <TouchableOpacity
              key={`letter-${index}`}
              style={[styles.letterTile, isSelected && styles.selectedTile]}
              onPress={() => handleSelectItem(letter, index)}
              disabled={isSelected || showFeedback}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {currentGame.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {currentGame.hint}</Text>
        </View>
      )}
    </View>
  );

  // Rendu d'un jeu de matching
  const renderMatchingGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{currentGame.instructions}</Text>

      <View style={styles.matchingContainer}>
        {shuffledOptions.map((item, index) => {
          const isMatched = matchedItems.includes(item);
          const isSelected = selectedItems.some(
            (selected) => selected.index === index
          );

          return (
            <TouchableOpacity
              key={`matching-${index}`}
              style={[
                styles.matchingTile,
                isSelected && [
                  styles.selectedMatchingTile,
                  { borderColor: levelColor },
                ],
                isMatched && [
                  styles.matchedTile,
                  { backgroundColor: `${levelColor}20` },
                ],
              ]}
              onPress={() => handleSelectItem(item, index)}
              disabled={isMatched || showFeedback}
            >
              <Text
                style={[
                  styles.matchingText,
                  isMatched && { color: levelColor },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {currentGame.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {currentGame.hint}</Text>
        </View>
      )}
    </View>
  );

  // Rendu d'un jeu de recherche de mots
  const renderWordSearchGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{currentGame.instructions}</Text>

      {/* Grille de recherche de mots */}
      <View style={styles.wordSearchGrid}>
        {currentGame.grid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.gridRow}>
            {row.map((letter, colIndex) => {
              const index = rowIndex * row.length + colIndex;
              const isSelected = selectedItems.some(
                (item) => item.index === index
              );

              return (
                <TouchableOpacity
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={[
                    styles.gridCell,
                    isSelected && [
                      styles.selectedCell,
                      { backgroundColor: `${levelColor}30` },
                    ],
                  ]}
                  onPress={() => handleSelectItem(letter, index)}
                  disabled={showFeedback}
                >
                  <Text
                    style={[
                      styles.gridCellText,
                      isSelected && { color: levelColor, fontWeight: "bold" },
                    ]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Liste des mots à trouver */}
      <View style={styles.wordsToFindContainer}>
        <Text style={styles.wordsToFindTitle}>Words to find:</Text>
        <View style={styles.wordsToFindList}>
          {currentGame.words.map((word, index) => (
            <Text
              key={`word-${index}`}
              style={[
                styles.wordToFind,
                matchedItems.includes(word) && [
                  styles.foundWord,
                  { color: levelColor },
                ],
              ]}
            >
              {word} {matchedItems.includes(word) && "✓"}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );

  // Rendu d'un jeu de catégorisation
  const renderCategorizationGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{currentGame.instructions}</Text>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Category:{" "}
          <Text style={{ color: levelColor }}>
            {currentGame.currentCategory}
          </Text>
        </Text>
        <Text style={styles.categorySubtitle}>
          Select all words that belong to this category:
        </Text>
      </View>

      <View style={styles.wordsContainer}>
        {shuffledOptions.map((word, index) => {
          const isSelected = selectedItems.some((item) => item.value === word);

          return (
            <TouchableOpacity
              key={`word-${index}`}
              style={[
                styles.wordTile,
                isSelected && [
                  styles.selectedWordTile,
                  {
                    backgroundColor: `${levelColor}30`,
                    borderColor: levelColor,
                  },
                ],
              ]}
              onPress={() => handleSelectItem(word, index)}
              disabled={showFeedback}
            >
              <Text
                style={[
                  styles.wordTileText,
                  isSelected && { color: levelColor },
                ]}
              >
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Rendu en fonction du type de jeu
  const renderGameByType = () => {
    switch (currentGame.type) {
      case "anagram":
        return renderAnagramGame();
      case "matching":
        return renderMatchingGame();
      case "word_search":
        return renderWordSearchGame();
      case "categorization":
        return renderCategorizationGame();
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

  // Affiche l'écran de chargement si les jeux ne sont pas encore chargés
  if (!currentGame) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading games...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Nouvelle vérification pour un tableau de jeux vide
  if (games.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.levelBadge,
              { backgroundColor: getLevelColor(level) },
            ]}
          >
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.headerTitle}>Word Games</Text>
        </View>
        <View style={styles.emptyGamesContainer}>
          <Text style={styles.emptyGamesText}>
            Aucun jeu de mots disponible pour le niveau {level}.
          </Text>
          <TouchableOpacity
            style={[
              styles.emptyGamesButton,
              { backgroundColor: getLevelColor(level) },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyGamesButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Affiche les résultats finaux
  if (showResults) {
    const totalScore = gameResults.reduce(
      (sum, result) => sum + result.score,
      0
    );
    const totalMaxScore = gameResults.reduce(
      (sum, result) => sum + result.maxScore,
      0
    );
    const percentage = Math.round((totalScore / totalMaxScore) * 100) || 0;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.headerTitle}>Word Games</Text>
        </View>

        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
        >
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Games Complete!</Text>

            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
              <Text style={styles.scoreText}>
                {totalScore}/{totalMaxScore}
              </Text>
            </View>

            <Text style={styles.resultsFeedback}>
              {percentage >= 80
                ? "Excellent! You have great word skills."
                : percentage >= 60
                ? "Good job! Keep practicing to improve your vocabulary."
                : "Keep working on your word skills. Practice makes perfect!"}
            </Text>

            <View style={styles.gamesReview}>
              <Text style={styles.reviewTitle}>Games Review:</Text>

              {games.map((game, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewGameType}>
                      {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                    </Text>
                    <Text style={styles.reviewScore}>
                      {gameResults[index].score}/{gameResults[index].maxScore}
                    </Text>
                  </View>
                  {game.title && (
                    <Text style={styles.reviewGameTitle}>{game.title}</Text>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.resultsButtons}>
              <TouchableOpacity
                style={[styles.resultsButton, { backgroundColor: levelColor }]}
                onPress={resetGames}
              >
                <Text style={styles.resultsButtonText}>Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.resultsButton,
                  styles.secondaryButton,
                  { borderColor: levelColor },
                ]}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.resultsButtonText, { color: levelColor }]}>
                  Exit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Rendu principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.headerTitle}>Word Games</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  ((currentGameIndex + (showFeedback ? 1 : 0)) / games.length) *
                  100
                }%`,
                backgroundColor: levelColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentGameIndex + 1}/{games.length}
        </Text>
      </View>

      {timeLeft > 0 && (
        <View style={styles.timerContainer}>
          <Text
            style={[styles.timerText, timeLeft <= 10 && styles.timerWarning]}
          >
            Time: {timeLeft}s
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Animated.View
          style={[
            styles.gameCardContainer,
            {
              opacity: fadeAnim,
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
            <View
              style={[
                styles.feedbackContainer,
                isCorrect
                  ? [styles.correctFeedback, { borderLeftColor: levelColor }]
                  : styles.incorrectFeedback,
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {isCorrect ? "Great job!" : "Try again!"}
              </Text>
              <Text style={styles.feedbackText}>
                {isCorrect
                  ? currentGame.successMessage ||
                    "You've successfully completed this game!"
                  : currentGame.failureMessage ||
                    "Don't worry, you can try another word game."}
              </Text>
              {!isCorrect && currentGame.correctAnswer && (
                <Text style={styles.correctAnswerText}>
                  Correct answer:{" "}
                  <Text style={styles.answerHighlight}>
                    {currentGame.correctAnswer}
                  </Text>
                </Text>
              )}
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentGame.type === "matching" ||
              currentGame.type === "word_search"
                ? styles.disabledButton
                : [styles.enabledButton, { backgroundColor: levelColor }],
            ]}
            onPress={() => checkAnswer()}
            disabled={
              currentGame.type === "matching" ||
              currentGame.type === "word_search"
            }
          >
            <Text style={styles.actionButtonText}>
              {currentGame.type === "matching" ||
              currentGame.type === "word_search"
                ? "Find all matches"
                : "Check Answer"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.enabledButton,
              { backgroundColor: levelColor },
            ]}
            onPress={handleNextGame}
          >
            <Text style={styles.actionButtonText}>
              {currentGameIndex < games.length - 1
                ? "Next Game"
                : "See Results"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#475569",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  timerContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  timerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },
  timerWarning: {
    color: "#ef4444",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#64748b",
  },
  gameCardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  gameContainer: {
    width: "100%",
  },
  gameInstructions: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
    lineHeight: 22,
  },
  // Styles pour les jeux d'anagramme
  answerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  lettersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  letterTile: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTile: {
    opacity: 0.5,
  },
  letterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
  },
  // Styles pour les jeux de matching
  matchingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  matchingTile: {
    width: "48%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  selectedMatchingTile: {
    borderWidth: 2,
    backgroundColor: "#f8fafc",
  },
  matchedTile: {
    opacity: 0.7,
  },
  matchingText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
  },
  // Styles pour la recherche de mots
  wordSearchGrid: {
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gridCell: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCell: {
    borderWidth: 2,
  },
  gridCellText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  wordsToFindContainer: {
    marginBottom: 16,
  },
  wordsToFindTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  wordsToFindList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordToFind: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 10,
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
  },
  foundWord: {
    textDecorationLine: "line-through",
  },
  // Styles pour la catégorisation
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: "#475569",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  wordTile: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  selectedWordTile: {
    borderWidth: 2,
  },
  wordTileText: {
    fontSize: 16,
    color: "#334155",
  },
  // Styles pour les indices
  hintContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },
  // Styles pour les feedbacks
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  correctFeedback: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#10b981",
  },
  incorrectFeedback: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  correctAnswerText: {
    fontSize: 15,
    color: "#475569",
    marginTop: 8,
  },
  answerHighlight: {
    fontWeight: "600",
    color: "#334155",
  },
  // Styles pour les erreurs
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
  },
  // Styles pour les boutons d'action
  actionContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  enabledButton: {
    backgroundColor: "#3b82f6",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // Styles pour les résultats
  resultsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f1f5f9",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  scoreText: {
    fontSize: 16,
    color: "#64748b",
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  gamesReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewGameType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },
  reviewScore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  reviewGameTitle: {
    fontSize: 14,
    color: "#64748b",
  },
  resultsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 6,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
  },
  resultsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  emptyGamesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  emptyGamesText: {
    fontSize: 18,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyGamesButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyGamesButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default WordGamesExercise;
