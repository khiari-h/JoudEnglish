import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import styles from './styles';
import calculateScore from '../../utils/calculateScore';

/**
 * Composant pour afficher l'écran des résultats après l'exercice
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.exercises - Liste des exercices
 * @param {Array} props.userAttempts - Tentatives de l'utilisateur
 * @param {number} props.score - Score de l'utilisateur
 * @param {string} props.level - Niveau de l'exercice
 * @param {string} props.levelColor - Couleur du niveau
 * @param {string} props.title - Titre de l'écran
 * @param {Function} props.resetExercise - Fonction pour réinitialiser l'exercice
 * @returns {JSX.Element} Composant ResultsScreen
 */
const ResultsScreen = ({
  exercises,
  userAttempts,
  score,
  level,
  levelColor,
  title,
  resetExercise,
}) => {
  const navigation = useNavigation();
  const { percentage, feedback } = calculateScore(score, exercises.length);

  return (
    <>
      <Header level={level} title={title} />

      <ScrollView
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
      >
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Practice Complete!</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreText}>
              {score}/{exercises.length}
            </Text>
          </View>

          <Text style={styles.resultsFeedback}>{feedback}</Text>

          <View style={styles.answersReview}>
            <Text style={styles.reviewTitle}>Review Your Answers:</Text>

            {exercises.map((exercise, index) => (
              <View key={index} style={styles.reviewItem}>
                {/* Affiche la règle si présente (pour les exercices de règles) */}
                {exercise.rule && <Text style={styles.ruleText}>{exercise.rule}</Text>}
                
                <Text style={styles.reviewQuestion}>
                  {exercise.instruction}
                  {exercise.wordToCorrect && (
                    <Text style={styles.wordToCorrect}>
                      {" "}"{exercise.wordToCorrect}"
                    </Text>
                  )}
                </Text>
                
                <View style={styles.reviewAnswerContainer}>
                  <Text style={styles.reviewAnswerLabel}>Your answer:</Text>
                  <Text
                    style={[
                      styles.reviewAnswer,
                      userAttempts[index].isCorrect
                        ? styles.correctAnswer
                        : styles.incorrectAnswer,
                    ]}
                  >
                    {userAttempts[index].attempted
                      ? userAttempts[index].input
                      : "(not attempted)"}
                  </Text>
                </View>
                
                {!userAttempts[index].isCorrect &&
                  userAttempts[index].attempted && (
                    <View style={styles.correctionContainer}>
                      <Text style={styles.correctionLabel}>
                        Correct answer:
                      </Text>
                      <Text style={styles.correctionText}>
                        {exercise.correctAnswer}
                      </Text>
                    </View>
                  )}
                  
                <Text style={styles.explanationText}>
                  {exercise.explanation}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.resultsButtons}>
            <TouchableOpacity
              style={[styles.resultsButton, { backgroundColor: levelColor }]}
              onPress={resetExercise}
            >
              <Text style={styles.resultsButtonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.resultsButton,
                styles.secondaryButton,
                { borderColor: levelColor },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.resultsButtonText, { color: levelColor }]}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ResultsScreen;