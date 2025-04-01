import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const ExerciseHeader = ({
  level,
  title,
  levelColor,
  onBack,
  rightComponent
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#475569" />
      </TouchableOpacity>
      
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {rightComponent}
    </View>
  );
};

export default ExerciseHeader;
