import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant d'en-tête pour les jeux de mots
 */
const GameHeader = ({ level, levelColor, navigation, title = "Word Games" }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default GameHeader;