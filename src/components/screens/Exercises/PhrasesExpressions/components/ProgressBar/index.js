import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Barre de progression pour la navigation entre phrases
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.currentIndex - Index actuel
 * @param {number} props.totalCount - Nombre total d'éléments
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ProgressBar = ({
  currentIndex,
  totalCount,
  levelColor,
}) => {
  // Calcul du pourcentage de progression
  const progressPercentage = `${((currentIndex + 1) / totalCount) * 100}%`;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: progressPercentage,
              backgroundColor: levelColor,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentIndex + 1}/{totalCount}
      </Text>
    </View>
  );
};

export default ProgressBar;