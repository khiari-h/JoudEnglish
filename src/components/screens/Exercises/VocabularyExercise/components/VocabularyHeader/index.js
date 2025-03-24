import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Header component for the vocabulary exercise
 */
const VocabularyHeader = ({ level, levelColor, navigation }) => {
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
      <Text style={styles.exerciseTitle}>Vocabulary</Text>
    </View>
  );
};

export default VocabularyHeader;