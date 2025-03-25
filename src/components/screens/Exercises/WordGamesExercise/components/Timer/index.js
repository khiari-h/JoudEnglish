import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant d'affichage du minuteur
 */
const Timer = ({ timeLeft, isActive = true }) => {
  // Ne rien afficher si pas de temps défini
  if (timeLeft <= 0) return null;
  
  // Déterminer si le temps restant est faible (< 10 secondes)
  const isWarning = timeLeft <= 10 && isActive;
  
  return (
    <View style={styles.timerContainer}>
      <Text style={[
        styles.timerText,
        isWarning && styles.timerWarning
      ]}>
        Time: {timeLeft}s
      </Text>
    </View>
  );
};

export default Timer;