import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from '../../ui/Button';
import styles from './styles';

const ResultsScreen = ({
  score,
  total,
  levelColor,
  title = "Exercise Complete!",
  feedback,
  onRetry,
  onExit,
  children
}) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>
            {score}/{total}
          </Text>
        </View>

        {feedback && (
          <Text style={styles.feedback}>{feedback}</Text>
        )}

        {children}

        <View style={styles.buttonContainer}>
          <Button
            title="Try Again"
            onPress={onRetry}
            color={levelColor}
            style={styles.button}
          />
          <Button
            title="Exit"
            onPress={onExit}
            variant="outlined"
            color={levelColor} 
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;
