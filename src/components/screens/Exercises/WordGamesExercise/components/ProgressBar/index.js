import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant de barre de progression
 */
const ProgressBar = ({ 
  currentStep, 
  totalSteps, 
  levelColor, 
  showFeedback = false 
}) => {
  // Calculer le pourcentage de progression
  const progressPercentage = 
    ((currentStep + (showFeedback ? 1 : 0)) / totalSteps) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor: levelColor,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentStep + 1}/{totalSteps}
      </Text>
    </View>
  );
};

export default ProgressBar;