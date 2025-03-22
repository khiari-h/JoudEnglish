import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant de barre de progression
 * 
 * @param {Object} props - Propriétés du composant
 * @param {number} props.progress - Valeur de progression (0-100)
 * @param {number} props.currentStep - Étape actuelle de la conversation
 * @param {number} props.totalSteps - Nombre total d'étapes dans la conversation
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const ProgressBar = ({ progress, currentStep, totalSteps, levelColor }) => {
  // S'assurer que la progression est entre 0 et 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${safeProgress}%`,
              backgroundColor: levelColor,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentStep + 1}/{totalSteps || 1}
      </Text>
    </View>
  );
};

export default ProgressBar;