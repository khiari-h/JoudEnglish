import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher la progression dans les exercices
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.currentIndex - Index de l'exercice actuel (commence à 0)
 * @param {number} props.totalCount - Nombre total d'exercices
 * @param {string} props.color - Couleur principale pour la barre de progression
 */
const ProgressBar = ({ currentIndex, totalCount, color }) => {
  // Calcul du pourcentage de progression
  const progressPercentage = `${(currentIndex / totalCount) * 100}%`;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: progressPercentage,
              backgroundColor: color,
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