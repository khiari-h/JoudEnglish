import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

/**
 * Composant barre de progression pour les exercices
 * @param {Object} props - Propriétés du composant
 * @param {number} props.currentIndex - Index de l'exercice actuel
 * @param {number} props.total - Nombre total d'exercices
 * @param {boolean} props.showFeedback - Indique si le feedback est affiché
 * @param {string} props.color - Couleur de la barre de progression
 * @returns {JSX.Element} - Composant ProgressBar
 */
const ProgressBar = ({ currentIndex, total, showFeedback, color }) => {
  // Calcul de la progression en pourcentage
  const progressPercentage = ((currentIndex + (showFeedback ? 1 : 0)) / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentIndex + 1}/{total}
      </Text>
    </View>
  );
};

export default ProgressBar;