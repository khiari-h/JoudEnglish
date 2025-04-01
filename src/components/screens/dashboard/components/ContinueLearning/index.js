// Dashboard/components/ContinueLearning/index.js
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLastExercise } from '../../../../../hooks/useLastExercise';  // Correction du chemin
import { useAppNavigation } from '../../../../../hooks/useAppNavigation';  // Correction du chemin
import styles from './styles';

const ContinueLearning = () => {
  const { lastExercise } = useLastExercise();
  const { navigateToExercise } = useAppNavigation();

  if (!lastExercise) return null;

  const handleContinue = () => {
    navigateToExercise(lastExercise.type, {
      level: lastExercise.level,
      exerciseId: lastExercise.id
    });
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return 'Today';
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handleContinue}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={lastExercise.icon || 'book-outline'} 
          size={24} 
          color="#FFF"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Continue Learning</Text>
        <Text style={styles.exerciseInfo}>
          {lastExercise.type} - Level {lastExercise.level}
        </Text>
        <Text style={styles.timestamp}>
          {getTimeAgo(lastExercise.timestamp)}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {lastExercise.progress || 0}%
        </Text>
      </View>
    </Pressable>
  );
};

export default ContinueLearning;
