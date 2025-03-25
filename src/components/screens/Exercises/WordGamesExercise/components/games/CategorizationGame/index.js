import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCategorization from '../../../hooks/games/useCategorization';
import styles from './style';

/**
 * Composant pour le jeu de catégorisation
 */
const CategorizationGame = ({ game, onCompleted, levelColor }) => {
  const {
    shuffledWords,
    selectedWords,
    currentCategory,
    expectedWords,
    isCorrect,
    showFeedback,
    handleWordSelection,
    checkAnswer
  } = useCategorization(game, onCompleted);

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{game.instructions}</Text>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Category:{" "}
          <Text style={{ color: levelColor }}>
            {currentCategory}
          </Text>
        </Text>
        <Text style={styles.categorySubtitle}>
          Select all words that belong to this category:
        </Text>
      </View>

      <View style={styles.wordsContainer}>
        {shuffledWords.map((word) => {
          const isSelected = selectedWords.some((item) => item.value === word.value);

          return (
            <TouchableOpacity
              key={`word-${word.index}`}
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
              onPress={() => handleWordSelection(word)}
              disabled={showFeedback}
            >
              <Text
                style={[
                  styles.wordTileText,
                  isSelected && { color: levelColor },
                ]}
              >
                {word.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Statistiques sur la sélection */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Selected: {selectedWords.length} words
        </Text>
      </View>

      {/* Indice si disponible */}
      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
      
      {/* Le bouton de vérification est géré par le composant parent */}
    </View>
  );
};

export default CategorizationGame;