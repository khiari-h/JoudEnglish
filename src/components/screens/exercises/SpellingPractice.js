// src/components/screens/exercises/SpellingPractice.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Animated,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Importation factice des données d'exercices d'orthographe par niveau
// Ces imports seraient remplacés par les vrais fichiers de données
import spellingA1Data from '../../../data/exercises/spelling/spellingA1';
import spellingA2Data from '../../../data/exercises/spelling/spellingA2';
import spellingB1Data from '../../../data/exercises/spelling/spellingB1';
import spellingB2Data from '../../../data/exercises/spelling/spellingB2';
import spellingC1Data from '../../../data/exercises/spelling/spellingC1';
import spellingC2Data from '../../../data/exercises/spelling/spellingC2';

const SpellingPractice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // États pour gérer les exercices
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAttempts, setUserAttempts] = useState([]);
  const [hasHint, setHasHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  // Détermine la couleur en fonction du niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Récupère les données en fonction du niveau
  const getSpellingData = (level) => {
    const dataMap = {
      A1: spellingA1Data,
      A2: spellingA2Data,
      B1: spellingB1Data,
      B2: spellingB2Data,
      C1: spellingC1Data,
      C2: spellingC2Data
    };
    return dataMap[level] || spellingA1Data;
  };

  // Initialisation des données d'exercice en fonction du niveau
  useEffect(() => {
    const data = getSpellingData(level);
    if (data && data.exercises) {
      setExercises(data.exercises);
      resetUserAttempts(data.exercises.length);
    }
  }, [level]);

  const resetUserAttempts = (length) => {
    setUserAttempts(Array(length).fill({ input: '', isCorrect: false, attempted: false }));
  };

  // L'exercice actuel
  const currentExercise = exercises[currentExerciseIndex] || null;

  // Fonction pour vérifier l'orthographe entrée par l'utilisateur
  const checkSpelling = () => {
    if (!userInput.trim()) return;
    
    const input = userInput.trim().toLowerCase();
    const correct = currentExercise.correctSpelling.toLowerCase();
    const isCorrectAnswer = input === correct;
    
    // Met à jour les tentatives de l'utilisateur
    const newAttempts = [...userAttempts];
    newAttempts[currentExerciseIndex] = {
      input,
      isCorrect: isCorrectAnswer,
      attempted: true
    };
    setUserAttempts(newAttempts);
    
    // Mise à jour du score et de l'état de feedback
    if (isCorrectAnswer) {
      setScore(prev => prev + 1);
      setIsCorrect(true);
      
      // Animation pour une réponse correcte
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      setIsCorrect(false);
      
      // Animation pour une réponse incorrecte
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        })
      ]).start();
    }
    
    setShowFeedback(true);
  };

  // Passe à l'exercice suivant ou affiche les résultats
  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput('');
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);
      
      // Réinitialise les animations
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
    } else {
      setShowResults(true);
    }
  };

  // Réinitialise l'exercice
  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setUserInput('');
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setScore(0);
    resetUserAttempts(exercises.length);
    setShowHint(false);
  };

  // Simuler la lecture du mot (dans une vraie application, cela utiliserait TTS)
  const speakWord = () => {
    // Ici, vous implémenteriez une véritable fonctionnalité de synthèse vocale
    // Pour l'instant, nous simulons juste l'animation d'un bouton de lecture
    setSpeechActive(true);
    setTimeout(() => {
      setSpeechActive(false);
    }, 1500);
  };

  // Affiche un indice
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Génère un indice en fonction du type d'exercice
  const generateHint = () => {
    if (currentExercise.type === 'dictation') {
      return `Le mot commence par "${currentExercise.correctSpelling[0]}" et contient ${currentExercise.correctSpelling.length} lettres.`;
    } else if (currentExercise.type === 'correction') {
      return `Il y a ${currentExercise.errorCount || 1} erreur(s) dans ce mot.`;
    } else {
      return `Ce mot contient ${currentExercise.correctSpelling.length} lettres.`;
    }
  };

  // Détermine si l'indice est disponible pour l'exercice actuel
  useEffect(() => {
    if (currentExercise && currentExercise.hasHint !== undefined) {
      setHasHint(currentExercise.hasHint);
    } else {
      setHasHint(true); // Par défaut, tous les exercices ont des indices
    }
  }, [currentExerciseIndex, currentExercise]);

  // Affiche l'écran de chargement si les exercices ne sont pas encore chargés
  if (!currentExercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Affiche les résultats finaux
  if (showResults) {
    const totalExercises = exercises.length;
    const percentage = Math.round((score / totalExercises) * 100);
    
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
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
          <Text style={styles.exerciseTitle}>Spelling Practice</Text>
        </View>
        
        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
        >
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Practice Complete!</Text>
            
            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
              <Text style={styles.scoreText}>{score}/{totalExercises}</Text>
            </View>
            
            <Text style={styles.resultsFeedback}>
              {percentage >= 80 
                ? "Excellent! Your spelling is very accurate."
                : percentage >= 60
                  ? "Good job! Keep practicing to improve your spelling."
                  : "Keep working on your spelling skills. Practice makes perfect!"}
            </Text>

            <View style={styles.answersReview}>
              <Text style={styles.reviewTitle}>Review Your Answers:</Text>
              
              {exercises.map((exercise, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewQuestion}>
                    {exercise.type === 'dictation' 
                      ? `Listen and spell: "${exercise.correctSpelling}"` 
                      : exercise.type === 'correction'
                        ? `Correct spelling of: "${exercise.wordToCorrect}"`
                        : exercise.instruction}
                  </Text>
                  <View style={styles.reviewAnswerContainer}>
                    <Text style={styles.reviewAnswerLabel}>Your answer:</Text>
                    <Text style={[
                      styles.reviewAnswer, 
                      userAttempts[index].isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                    ]}>
                      {userAttempts[index].attempted 
                        ? userAttempts[index].input 
                        : "(not attempted)"}
                    </Text>
                  </View>
                  {!userAttempts[index].isCorrect && userAttempts[index].attempted && (
                    <View style={styles.correctionContainer}>
                      <Text style={styles.correctionLabel}>Correct spelling:</Text>
                      <Text style={styles.correctionText}>{exercise.correctSpelling}</Text>
                    </View>
                  )}
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
                style={[styles.resultsButton, styles.secondaryButton, { borderColor: levelColor }]}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.resultsButtonText, { color: levelColor }]}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Affiche l'exercice principal
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec niveau et titre */}
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
        <Text style={styles.exerciseTitle}>Spelling Practice</Text>
      </View>
      
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentExerciseIndex + (showFeedback ? 1 : 0)) / exercises.length) * 100}%`,
                backgroundColor: levelColor
              }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1}/{exercises.length}
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
      >
        {/* Carte de l'exercice */}
        <Animated.View 
          style={[
            styles.exerciseCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.exerciseType}>
            {currentExercise.type === 'dictation' 
              ? 'Listen and Spell' 
              : currentExercise.type === 'correction'
                ? 'Correct the Spelling'
                : 'Spelling Practice'}
          </Text>
          
          <Text style={styles.instruction}>{currentExercise.instruction}</Text>
          
          {/* Contenu spécifique au type d'exercice */}
          {currentExercise.type === 'dictation' ? (
            <TouchableOpacity 
              style={[
                styles.speakButton, 
                speechActive && styles.speakButtonActive,
                { borderColor: levelColor }
              ]} 
              onPress={speakWord}
            >
              <Text style={[
                styles.speakButtonText,
                { color: levelColor }
              ]}>
                {speechActive ? "Speaking..." : "Listen"}
              </Text>
              <Text style={[styles.speakIcon, speechActive && styles.speakIconActive]}>
                🔊
              </Text>
            </TouchableOpacity>
          ) : currentExercise.type === 'correction' ? (
            <View style={styles.correctionExercise}>
              <Text style={styles.wordToCorrect}>{currentExercise.wordToCorrect}</Text>
              {currentExercise.context && (
                <Text style={styles.contextText}>Context: {currentExercise.context}</Text>
              )}
            </View>
          ) : (
            <View style={styles.imageContainer}>
              {currentExercise.imageUrl && (
                <Image 
                  source={{ uri: currentExercise.imageUrl }} 
                  style={styles.exerciseImage}
                  resizeMode="contain"
                />
              )}
            </View>
          )}
          
          {/* Zone de saisie de l'utilisateur */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                showFeedback && (isCorrect ? styles.correctInput : styles.incorrectInput),
                { borderColor: showFeedback ? (isCorrect ? '#10b981' : '#ef4444') : '#cbd5e1' }
              ]}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Enter your answer..."
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!showFeedback}
            />
            
            {hasHint && (
              <TouchableOpacity 
                style={[styles.hintButton, { borderColor: levelColor }]}
                onPress={toggleHint}
              >
                <Text style={[styles.hintButtonText, { color: levelColor }]}>
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Affichage de l'indice si activé */}
          {showHint && (
            <View style={[styles.hintContainer, { backgroundColor: `${levelColor}10` }]}>
              <Text style={styles.hintText}>{generateHint()}</Text>
            </View>
          )}
          
          {/* Feedback après vérification */}
          {showFeedback && (
            <View style={[
              styles.feedbackContainer,
              isCorrect ? styles.correctFeedback : styles.incorrectFeedback
            ]}>
              <Text style={styles.feedbackTitle}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </Text>
              {!isCorrect && (
                <Text style={styles.correctSpelling}>
                  The correct spelling is: <Text style={styles.spellingHighlight}>{currentExercise.correctSpelling}</Text>
                </Text>
              )}
              {currentExercise.explanation && (
                <Text style={styles.feedbackExplanation}>{currentExercise.explanation}</Text>
              )}
            </View>
          )}
        </Animated.View>
      </ScrollView>
      
      {/* Boutons d'action en bas */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity 
            style={[
              styles.actionButton,
              !userInput.trim() ? styles.disabledButton : [styles.enabledButton, { backgroundColor: levelColor }]
            ]}
            onPress={checkSpelling}
            disabled={!userInput.trim()}
          >
            <Text style={styles.actionButtonText}>Check Spelling</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.enabledButton, { backgroundColor: levelColor }]}
            onPress={handleNextExercise}
          >
            <Text style={styles.actionButtonText}>
              {currentExerciseIndex < exercises.length - 1 ? 'Next Exercise' : 'See Results'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#475569',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  exerciseType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  speakButtonActive: {
    backgroundColor: '#f1f5f9',
  },
  speakButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  speakIcon: {
    fontSize: 20,
  },
  speakIconActive: {
    opacity: 0.6,
  },
  correctionExercise: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  wordToCorrect: {
    fontSize: 20,
    fontWeight: '500',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 8,
  },
  contextText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    marginBottom: 10,
  },
  correctInput: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  incorrectInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  hintButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hintContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 15,
    color: '#475569',
    fontStyle: 'italic',
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  correctFeedback: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  incorrectFeedback: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctSpelling: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 8,
  },
  spellingHighlight: {
    fontWeight: '600',
    color: '#334155',
  },
  feedbackExplanation: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  enabledButton: {
    backgroundColor: '#3b82f6',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  // Styles pour l'écran de résultats
  resultsContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  scoreText: {
    fontSize: 16,
    color: '#64748b',
  },
  resultsFeedback: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  answersReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 12,
  },
  reviewAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAnswerLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  reviewAnswer: {
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  correctAnswer: {
    backgroundColor: '#f0fdf4',
    color: '#10b981',
  },
  incorrectAnswer: {
    backgroundColor: '#fef2f2',
    color: '#ef4444',
  },
  correctionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctionLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  correctionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#10b981',
  },
  resultsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  resultsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SpellingPractice;
