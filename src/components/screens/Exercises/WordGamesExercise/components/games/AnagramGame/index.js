import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useAnagramGame from '../../../hooks/games/useAnagramGame';
import styles from './style';

/**
 * Composant pour le jeu d'anagramme
 */
const AnagramGame = ({ game, onCompleted, levelColor }) => {
  const {
    shuffledLetters,
    selectedLetters,
    isCorrect,
    showFeedback,
    handleLetterSelection,
    checkAnswer,
    resetGame
  } = useAnagramGame(game, onCompleted);

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.gameInstructions}>{game.instructions}</Text>

      {/* Zone de réponse de l'utilisateur */}
      <View style={styles.answerContainer}>
        {selectedLetters.map((item, index) => (
          <TouchableOpacity
            key={`selected-${index}`}
            style={[styles.letterTile, { backgroundColor: `${levelColor}20` }]}
            onPress={() => handleLetterSelection(item)}
          >
            <Text style={[styles.letterText, { color: levelColor }]}>
              {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lettres disponibles */}
      <View style={styles.lettersContainer}>
        {shuffledLetters.map((letter) => {
          const isSelected = selectedLetters.some(
            (item) => item.index === letter.index
          );
          return (
            <TouchableOpacity
              key={`letter-${letter.index}`}
              style={[
                styles.letterTile,
                isSelected && styles.selectedTile
              ]}
              onPress={() => handleLetterSelection(letter)}
              disabled={isSelected || showFeedback}
            >
              <Text style={styles.letterText}>{letter.value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Indice si disponible */}
      {game.hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {game.hint}</Text>
        </View>
      )}
      
      {/* Bouton de vérification - affiché mais géré par le parent */}
      {/* 
      <TouchableOpacity
        style={[
          styles.checkButton,
          { backgroundColor: levelColor }
        ]}
        onPress={checkAnswer}
        disabled={showFeedback}
      >
        <Text style={styles.checkButtonText}>Check Answer</Text>
      </TouchableOpacity>
      */}
    </View>
  );
};

export default AnagramGame;