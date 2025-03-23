import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher la progression dans les exercices
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.currentIndex - Index de l'exercice actuel
 * @param {number} props.totalCount - Nombre total d'exercices
 * @param {number} props.progress - Pourcentage de progression (0-100)
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ProgressBar = ({
  currentIndex,
  totalCount,
  progress,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
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