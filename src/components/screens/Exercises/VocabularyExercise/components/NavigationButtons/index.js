import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Component for previous and next navigation buttons
 */
const NavigationButtons = ({
  currentWordIndex,
  totalWords,
  handlePrevious,
  handleNext,
  levelColor
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[
          styles.navButton,
          styles.prevButton,
          { opacity: currentWordIndex > 0 ? 1 : 0.5 },
          { backgroundColor: `${levelColor}15` },
        ]}
        onPress={handlePrevious}
        disabled={currentWordIndex === 0}
      >
        <Text style={[styles.navButtonText, { color: levelColor }]}>
          Previous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          styles.nextButton,
          { backgroundColor: levelColor },
        ]}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentWordIndex < totalWords - 1 ? "Next" : "Complete"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationButtons;