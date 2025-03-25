import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useMatchingGame from '../../../hooks/games/useMatchingGame';
import styles from './style';

/**
 * Composant pour le jeu d'association
 */
const MatchingGame = ({ game, onCompleted, levelColor }) => {
  const {
    shuffledItems,
    selectedItems,
    matchedItems,
    isCheckingMatch,
    progress,
    isCompleted,
    handleItemSelection,
    resetGame
  } = useMatchingGame(game, onCompleted);

  // Jeu complété automatiquement sans besoin de bouton de vérification
  
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{game.instructions}</Text>

      <View style={styles.matchingContainer}>
        {shuffledItems.map((item) => {
          const isMatched = matchedItems.includes(item.index);
          const isSelected = selectedItems.some(
            (selected) => selected.index === item.index
          );

          return (
            <TouchableOpacity
              key={`matching-${item.index}`}
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
              onPress={() => handleItemSelection(item)}
              disabled={isMatched || isCheckingMatch}
            >
              <Text
                style={[
                  styles.matchingText,
                  isMatched && { color: levelColor },
                ]}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Afficher la progression du jeu */}
      <View style={styles.progressInfoContainer}>
        <View style={styles.progressTracker}>
          <View 
            style={[
              styles.progressIndicator, 
              { width: `${progress}%`, backgroundColor: levelColor }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.floor(matchedItems.length / 2)}/{Math.floor(shuffledItems.length / 2)} pairs found
        </Text>
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

export default MatchingGame;