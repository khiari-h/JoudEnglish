import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Component for displaying word card indicators/dots
 */
const CardIndicators = ({
  words,
  currentWordIndex,
  completedWords,
  selectedCategoryIndex,
  handleWordSelection,
  levelColor
}) => {
  if (!words || words.length === 0) return null;
  
  return (
    <View style={styles.cardIndicatorContainer}>
      {words.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleWordSelection(index)}
        >
          <View
            style={[
              styles.cardIndicator,
              {
                backgroundColor:
                  currentWordIndex === index
                    ? levelColor
                    : completedWords[selectedCategoryIndex]?.includes(index)
                    ? `${levelColor}50`
                    : "#e5e7eb",
                width: currentWordIndex === index ? 12 : 8,
                height: currentWordIndex === index ? 12 : 8,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardIndicators;