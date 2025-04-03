import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Composant de barre de progression générique
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.progress - Progression actuelle (entre 0 et 1)
 * @param {string} props.levelColor - Couleur associée au niveau
 */
const ProgressBar = ({ progress, levelColor }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { backgroundColor: `${levelColor}30` }]}>
        <View
          style={[
            styles.progress,
            { width: `${Math.min(progress * 100, 100)}%`, backgroundColor: levelColor },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  bar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: '#475569',
    textAlign: 'right',
  },
});

export default ProgressBar;

