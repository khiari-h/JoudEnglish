import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './style';
import Button from '../../../../../common/Button';

/**
 * Écran de résultats pour l'évaluation de niveau
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.level - Niveau d'évaluation (A1, A2, etc.)
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Function} props.onContinue - Fonction appelée pour continuer
 * @param {Object} props.results - Résultats de l'évaluation (optionnel)
 */
const ResultsScreen = ({
  level,
  levelColor,
  onContinue,
  results,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Assessment Complete!</Text>
        
        {/* Score (si disponible) */}
        {results && results.score && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{results.score}%</Text>
            <Text style={styles.scoreLabel}>Your Score</Text>
          </View>
        )}
        
        <Text style={styles.resultsFeedback}>
          Thank you for completing the level {level} assessment.
          {results && results.feedback ? `\n\n${results.feedback}` : ''}
        </Text>
        
        <Button
          title="Continue to Dashboard"
          onPress={onContinue}
          color={levelColor}
          size="large"
          style={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResultsScreen;