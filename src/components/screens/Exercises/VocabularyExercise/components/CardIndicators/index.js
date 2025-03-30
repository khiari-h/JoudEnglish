import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Component for displaying word card indicators/dots
 * Adapté pour utiliser les props fournis par VocabularyExercise
 */
const CardIndicators = ({
  totalWords, // Changé de words à totalWords
  currentIndex, // Changé de currentWordIndex à currentIndex
  completedWords,
  levelColor,
  onSelectWord, // Changé de handleWordSelection à onSelectWord
}) => {
  if (!totalWords || totalWords === 0) return null;

  return (
    <View style={styles.cardIndicatorContainer}>
      {/* Créer un tableau du nombre requis d'indicateurs */}
      {[...Array(totalWords)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectWord(index)}>
          <View
            style={[
              styles.cardIndicator,
              {
                backgroundColor:
                  currentIndex === index
                    ? levelColor
                    : completedWords?.includes(index)
                    ? `${levelColor}50`
                    : "#e5e7eb",
                width: currentIndex === index ? 12 : 8,
                height: currentIndex === index ? 12 : 8,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardIndicators;
