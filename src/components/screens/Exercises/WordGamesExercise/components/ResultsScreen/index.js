import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getSuccessMessage, calculatePercentage } from '../../utils/gameHelpers';
import ActionButton, { ActionContainer } from '../ActionButton';
import styles from './style';

/**
 * Composant d'affichage des résultats
 */
const ResultsScreen = ({ 
  games, 
  gameResults, 
  navigation, 
  levelColor, 
  onRestart 
}) => {
  // Calculer le score total
  const totalScore = gameResults.reduce(
    (sum, result) => sum + result.score,
    0
  );
  
  // Calculer le score maximum possible
  const totalMaxScore = gameResults.reduce(
    (sum, result) => sum + result.maxScore,
    0
  );
  
  // Calculer le pourcentage de réussite
  const percentage = calculatePercentage(totalScore, totalMaxScore);
  
  // Obtenir le message de réussite
  const feedbackMessage = getSuccessMessage(percentage);

  return (
    <ScrollView
      style={styles.resultsContainer}
      contentContainerStyle={styles.resultsContent}
    >
      <View style={styles.resultsCard}>
        <Text style={styles.resultsTitle}>Games Complete!</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>
            {totalScore}/{totalMaxScore}
          </Text>
        </View>

        <Text style={styles.resultsFeedback}>{feedbackMessage}</Text>

        <View style={styles.gamesReview}>
          <Text style={styles.reviewTitle}>Games Review:</Text>

          {games.map((game, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewGameType}>
                  {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
                </Text>
                <Text style={styles.reviewScore}>
                  {gameResults[index].score}/{gameResults[index].maxScore}
                </Text>
              </View>
              {game.title && (
                <Text style={styles.reviewGameTitle}>{game.title}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.resultsButtons}>
          <ActionButton
            text="Play Again"
            levelColor={levelColor}
            onPress={onRestart}
            fullWidth={false}
          />

          <ActionButton
            text="Exit"
            type="secondary"
            levelColor={levelColor}
            onPress={() => navigation.goBack()}
            fullWidth={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResultsScreen;