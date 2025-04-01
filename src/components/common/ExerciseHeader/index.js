import React from 'react';
import { View, Text, Pressable } from 'react-native';
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
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [
          styles.backButton,
          pressed && { opacity: 0.7 }
        ]}
        android_ripple={{
          color: '#00000020',
          borderless: true,
          radius: 20
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#475569" />
      </Pressable>
      
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {rightComponent}
    </View>
  );
};

export default ExerciseHeader;
