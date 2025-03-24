import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Barre de progression pour les exercices de lecture
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.progress - Pourcentage de progression (0-100)
 * @param {number} props.completedQuestions - Nombre de questions complétées
 * @param {number} props.totalQuestions - Nombre total de questions
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ProgressBar = ({
  progress,
  completedQuestions,
  totalQuestions,
  levelColor,
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: levelColor },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {completedQuestions}/{totalQuestions}
      </Text>
    </View>
  );
};

export default ProgressBar;