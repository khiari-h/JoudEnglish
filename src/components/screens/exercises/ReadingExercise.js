// src/components/screens/exercises/ReadingExercise.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import dynamique des données en fonction du niveau
// Ces imports seraient remplacés par les vrais fichiers de données
import readingA1Data from '../../../data/exercises/reading/readingA1';
import readingA2Data from '../../../data/exercises/reading/readingA2';
import readingB1Data from '../../../data/exercises/reading/readingB1';
import readingB2Data from '../../../data/exercises/reading/readingB2';
import readingC1Data from '../../../data/exercises/reading/readingC1';
import readingC2Data from '../../../data/exercises/reading/readingC2';

const ReadingExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  const scrollViewRef = useRef();
  
  // États pour gérer l'exercice
  const [exercise, setExercise] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [textExpanded, setTextExpanded] = useState(true);
  const [highlightedWord, setHighlightedWord] = useState(null);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Determine color based on level
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

  // Function to get data based on level
  const getReadingData = (level) => {
    const dataMap = {
      A1: readingA1Data,
      A2: readingA2Data,
      B1: readingB1Data,
      B2: readingB2Data,
      C1: readingC1Data,
      C2: readingC2Data
    };
    return dataMap[level] || readingA1Data;
  };

  // Initialize with the appropriate data based on level
  useEffect(() => {
    const exerciseData = getReadingData(level);
    
    // Get the first exercise in the list or a random one
    if (exerciseData.exercises && exerciseData.exercises.length > 0) {
      setExercise(exerciseData.exercises[0]);
      setUserAnswers(Array(exerciseData.exercises[0].questions.length).fill(null));
    }
  }, [level]);

  // Handle answer selection
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
  };

  // Handle submission of answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = exercise.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    
    // Show feedback
    setShowFeedback(true);
    
    // Update score if correct
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Animate question transitioning out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Handle navigation to next question
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < exercise.questions.length) {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentQuestionIndex(nextIndex);
      
      // Reset and start animations for next question
      slideAnim.setValue(-50);
      fadeAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Show results if all questions answered
      setShowResults(true);
    }
  };

  // Toggle text section expansion
  const toggleTextExpansion = () => {
    setTextExpanded(!textExpanded);
    
    // Scroll to top when expanding
    if (!textExpanded && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  // Handle word highlight for vocabulary help
  const handleWordPress = (word) => {
    if (exercise.vocabulary && exercise.vocabulary[word]) {
      setHighlightedWord({
        word,
        definition: exercise.vocabulary[word]
      });
    }
  };

  // Reset the exercise
  const handleResetExercise = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers(Array(exercise.questions.length).fill(null));
    setShowResults(false);
    setScore(0);
    setShowFeedback(false);
    
    // Reset animations
    fadeAnim.setValue(1);
    slideAnim.setValue(0);
  };

  // Close vocabulary popup
  const closeVocabularyPopup = () => {
    setHighlightedWord(null);
  };

  // If no exercise data is loaded yet
  if (!exercise) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render results screen
  if (showResults) {
    const totalQuestions = exercise.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
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
          <Text style={styles.exerciseTitle}>Reading</Text>
        </View>
        
        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
        >
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Exercise Complete!</Text>
            
            <View style={styles.scoreCircle}>
              <Text style={styles.scorePercentage}>{percentage}%</Text>
              <Text style={styles.scoreText}>{score}/{totalQuestions}</Text>
            </View>
            
            <Text style={styles.resultsFeedback}>
              {percentage >= 80 
                ? "Excellent! You have a great understanding of the text."
                : percentage >= 60
                  ? "Good job! You understood most of the text."
                  : "Keep practicing! Reading takes time to master."}
            </Text>

            <View style={styles.answersReview}>
              <Text style={styles.reviewTitle}>Review Your Answers:</Text>
              
              {exercise.questions.map((question, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewQuestion}>{index + 1}. {question.text}</Text>
                  <Text style={[
                    styles.reviewAnswer, 
                    userAnswers[index] === question.correctAnswer 
                      ? styles.correctAnswer 
                      : styles.incorrectAnswer
                  ]}>
                    {userAnswers[index] === question.correctAnswer 
                      ? "Correct" 
                      : `Incorrect - The correct answer was: ${question.options[question.correctAnswer]}`}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.resultsButtons}>
              <TouchableOpacity 
                style={[styles.resultsButton, { backgroundColor: levelColor }]}
                onPress={handleResetExercise}
              >
                <Text style={styles.resultsButtonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.resultsButton, styles.secondaryButton]}
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
        <Text style={styles.exerciseTitle}>Reading</Text>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { 
                width: `${((currentQuestionIndex + (showFeedback ? 1 : 0)) / exercise.questions.length) * 100}%`, 
                backgroundColor: levelColor 
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{exercise.questions.length}
        </Text>
      </View>
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Text Section */}
        <View style={[
          styles.textContainer,
          !textExpanded && styles.collapsedTextContainer
        ]}>
          <Text style={styles.textTitle}>{exercise.title}</Text>
          
          {textExpanded ? (
            <View style={styles.fullTextContainer}>
              {exercise.text.split(' ').map((word, index) => {
                // Remove punctuation for checking vocabulary
                const cleanWord = word.replace(/[.,!?;:""]/g, '');
                const hasDefinition = exercise.vocabulary && exercise.vocabulary[cleanWord];
                
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={!hasDefinition}
                    onPress={() => hasDefinition && handleWordPress(cleanWord)}
                    style={styles.wordContainer}
                  >
                    <Text style={[
                      styles.textWord,
                      hasDefinition && styles.highlightedWord
                    ]}>
                      {word}{' '}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={styles.collapsedText}>
              {exercise.text.substring(0, 100)}...
            </Text>
          )}
          
          <TouchableOpacity 
            style={[styles.expandButton, { borderColor: levelColor }]}
            onPress={toggleTextExpansion}
          >
            <Text style={[styles.expandButtonText, { color: levelColor }]}>
              {textExpanded ? 'Collapse Text' : 'Expand Text'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Question Section */}
        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.questionTitle}>Question {currentQuestionIndex + 1}</Text>
          <Text style={styles.questionText}>
            {exercise.questions[currentQuestionIndex].text}
          </Text>
          
          <View style={styles.optionsContainer}>
            {exercise.questions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  showFeedback && index === exercise.questions[currentQuestionIndex].correctAnswer && styles.correctOption,
                  showFeedback && selectedAnswer === index && selectedAnswer !== exercise.questions[currentQuestionIndex].correctAnswer && styles.incorrectOption
                ]}
                onPress={() => handleSelectAnswer(index)}
                disabled={showFeedback}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                  showFeedback && index === exercise.questions[currentQuestionIndex].correctAnswer && styles.correctOptionText,
                  showFeedback && selectedAnswer === index && selectedAnswer !== exercise.questions[currentQuestionIndex].correctAnswer && styles.incorrectOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Feedback section */}
          {showFeedback && (
            <View style={[
              styles.feedbackContainer,
              selectedAnswer === exercise.questions[currentQuestionIndex].correctAnswer 
                ? styles.correctFeedback 
                : styles.incorrectFeedback
            ]}>
              <Text style={styles.feedbackTitle}>
                {selectedAnswer === exercise.questions[currentQuestionIndex].correctAnswer 
                  ? 'Correct!' 
                  : 'Incorrect!'}
              </Text>
              <Text style={styles.feedbackText}>
                {exercise.questions[currentQuestionIndex].explanation}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
      
      {/* Bottom action buttons */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          <TouchableOpacity 
            style={[
              styles.actionButton,
              selectedAnswer === null ? styles.disabledButton : [styles.enabledButton, { backgroundColor: levelColor }]
            ]}
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.actionButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.enabledButton, { backgroundColor: levelColor }]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.actionButtonText}>
              {currentQuestionIndex < exercise.questions.length - 1 
                ? 'Next Question' 
                : 'See Results'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Vocabulary popup */}
      {highlightedWord && (
        <View style={styles.vocabularyOverlay}>
          <View style={styles.vocabularyPopup}>
            <View style={styles.vocabularyHeader}>
              <Text style={styles.vocabularyWord}>{highlightedWord.word}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeVocabularyPopup}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.vocabularyDefinition}>{highlightedWord.definition}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  textContainer: {
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
  collapsedTextContainer: {
    maxHeight: 150,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  fullTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordContainer: {
    flexDirection: 'row',
  },
  textWord: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  highlightedWord: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  collapsedText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  expandButton: {
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  questionContainer: {
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
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
  },
  selectedOptionText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#10b981',
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
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
  feedbackText: {
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
  vocabularyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  vocabularyPopup: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  vocabularyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vocabularyWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#64748b',
  },
  vocabularyDefinition: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 22,
  },
  // Results styles
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 20,
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
    marginBottom: 12,
  },
  reviewItem: {
    marginBottom: 12,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 4,
  },
  reviewAnswer: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  correctAnswer: {
    backgroundColor: '#f0fdf4',
    color: '#10b981',
  },
  incorrectAnswer: {
    backgroundColor: '#fef2f2',
    color: '#ef4444',
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

export default ReadingExercise;
