import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useWordSearchGame from '../../../hooks/games/useWordSearchGame';
import styles from './style';

/**
 * Composant pour le jeu de recherche de mots
 */
const WordSearchGame = ({ game, onCompleted, levelColor }) => {
  const {
    grid,
    flatGrid,
    selectedCells,
    foundWords,
    progress,
    isCompleted,
    handleCellSelection
  } = useWordSearchGame(game, onCompleted);

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{game.instructions}</Text>

      {/* Grille de recherche de mots */}
      <View style={styles.wordSearchGrid}>
        {game.grid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.gridRow}>
            {row.map((letter, colIndex) => {
              const index = rowIndex * row.length + colIndex;
              const isSelected = selectedCells.some(
                (cell) => cell.index === index
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
                  onPress={() => handleCellSelection({ 
                    value: letter, 
                    index,
                    rowIndex,
                    colIndex
                  })}
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

      {/* Progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTracker}>
          <View 
            style={[
              styles.progressIndicator, 
              { width: `${progress}%`, backgroundColor: levelColor }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {foundWords.length}/{game.words.length} words found
        </Text>
      </View>

      {/* Liste des mots à trouver */}
      <View style={styles.wordsToFindContainer}>
        <Text style={styles.wordsToFindTitle}>Words to find:</Text>
        <View style={styles.wordsToFindList}>
          {game.words.map((word, index) => (
            <Text
              key={`word-${index}`}
              style={[
                styles.wordToFind,
                foundWords.includes(word) && [
                  styles.foundWord,
                  { color: levelColor },
                ],
              ]}
            >
              {word} {foundWords.includes(word) && "✓"}
            </Text>
          ))}
        </View>
      </View>

      {/* Indice si disponible */}
      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
    </View>
  );
};

export default WordSearchGame;