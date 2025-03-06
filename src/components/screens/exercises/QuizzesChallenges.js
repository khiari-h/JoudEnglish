// src/components/screens/exercises/QuizzesChallengers.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Animated,
  FlatList,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import fictif des données de quiz par niveau
import quizzesA1Data from '../../../data/exercises/quizzes/quizzesA1';
import quizzesA2Data from '../../../data/exercises/quizzes/quizzesA2';
import quizzesB1Data from '../../../data/exercises/quizzes/quizzesB1';
import quizzesB2Data from '../../../data/exercises/quizzes/quizzesB2';
import quizzesC1Data from '../../../data/exercises/quizzes/quizzesC1';
import quizzesC2Data from '../../../data/exercises/quizzes/quizzesC2';

const QuizzesChallengers = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // États pour gérer les quiz
  const [quizData, setQuizData] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [viewMode, setViewMode] = useState('browse'); // 'browse', 'quiz', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [matchPairs, setMatchPairs] = useState([]);
  const [selectedPairIndices, setSelectedPairIndices] = useState([]);
  const [matchedPairIndices, setMatchedPairIndices] = useState([]);
  
  const timerRef = useRef(null);

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
  const getQuizzesData = (level) => {
    const dataMap = {
      A1: quizzesA1Data,
      A2: quizzesA2Data,
      B1: quizzesB1Data,
      B2: quizzesB2Data,
      C1: quizzesC1Data,
      C2: quizzesC2Data
    };
    return dataMap[level] || quizzesA1Data;
  };

  // Initialise les données de quiz
  useEffect(() => {
    const data = getQuizzesData(level);
    setQuizData(data);
    
    if (data) {
      setQuizzes(data.quizzes || []);
      
      if (data.categories && data.categories.length > 0) {
        setSelectedCategoryId(data.categories[0].id);
      }
      
      // Initialiser le défi quotidien
      if (data.dailyChallenge) {
        setDailyChallenge(data.dailyChallenge);
      }
    }
  }, [level]);

  // Filtre les quiz par catégorie
  useEffect(() => {
    if (quizData && selectedCategoryId) {
      const filteredQuizzes = quizData.quizzes.filter(
        quiz => quiz.categoryId === selectedCategoryId
      );
      setQuizzes(filteredQuizzes);
    }
  }, [quizData, selectedCategoryId]);

  // Gestion du timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      // Temps écoulé, passer à la question suivante
      handleTimeUp();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerActive, timeLeft]);

  // Animation de la barre de progression
  useEffect(() => {
    if (viewMode === 'quiz' && quizzes[selectedQuizIndex]) {
      const progress = currentQuestionIndex / quizzes[selectedQuizIndex].questions.length;
      
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  }, [currentQuestionIndex, viewMode, selectedQuizIndex, quizzes]);

  // Gestion du temps écoulé
  const handleTimeUp = () => {
    setTimerActive(false);
    
    // Enregistrer une réponse vide comme incorrecte
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      answer: null,
      isCorrect: false,
      timeTaken: quizzes[selectedQuizIndex].questions[currentQuestionIndex].timeLimit || 30
    };
    setUserAnswers(newUserAnswers);
    
    // Montrer l'explication
    setShowExplanation(true);
  };

  // Commence un quiz
  const startQuiz = (index) => {
    if (index >= 0 && index < quizzes.length) {
      setSelectedQuizIndex(index);
      setViewMode('quiz');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setUserAnswers([]);
      setShowExplanation(false);
      setScore(0);
      
      // Réinitialiser le timer si la question a une limite de temps
      const firstQuestion = quizzes[index].questions[0];
      if (firstQuestion.timeLimit) {
        setTimeLeft(firstQuestion.timeLimit);
        setTimerActive(true);
      } else {
        setTimeLeft(0);
        setTimerActive(false);
      }
      
      // Initialiser les paires pour les quiz de type 'matching'
      if (firstQuestion.type === 'matching') {
        initializeMatchingPairs(firstQuestion);
      }
    }
  };

  // Initialise les paires pour les quiz de matching
  const initializeMatchingPairs = (question) => {
    if (question.pairs) {
      // Mélanger les paires
      const shuffledPairs = [...question.pairs].sort(() => Math.random() - 0.5);
      setMatchPairs(shuffledPairs);
      setSelectedPairIndices([]);
      setMatchedPairIndices([]);
    }
  };

  // Gestion de la sélection d'une réponse
  const handleSelectAnswer = (answerIndex) => {
    if (showExplanation) return;
    
    const currentQuestion = quizzes[selectedQuizIndex].questions[currentQuestionIndex];
    
    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') {
      setSelectedAnswer(answerIndex);
      
      // Animation de sélection
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  // Gestion de la sélection d'une paire dans un quiz de matching
  const handleSelectPair = (index) => {
    if (showExplanation || matchedPairIndices.includes(index)) return;
    
    // Si déjà deux éléments sélectionnés, ne rien faire
    if (selectedPairIndices.length === 2) return;
    
    // Ajouter l'indice aux sélectionnés
    const newSelectedIndices = [...selectedPairIndices, index];
    setSelectedPairIndices(newSelectedIndices);
    
    // Si on a deux éléments sélectionnés, vérifier s'ils forment une paire
    if (newSelectedIndices.length === 2) {
      const [firstIndex, secondIndex] = newSelectedIndices;
      const firstItem = matchPairs[firstIndex];
      const secondItem = matchPairs[secondIndex];
      
      // Vérifier si les éléments forment une paire
      const isPair = firstItem.id === secondItem.id;
      
      if (isPair) {
        // Si c'est une paire, la marquer comme trouvée
        setMatchedPairIndices([...matchedPairIndices, firstIndex, secondIndex]);
        
        // Animation pour une paire correcte
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.6,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          })
        ]).start();
      }
      
      // Réinitialiser la sélection après un court délai
      setTimeout(() => {
        setSelectedPairIndices([]);
        
        // Si toutes les paires sont trouvées, passer à la validation
        if (isPair && matchedPairIndices.length + 2 === matchPairs.length) {
          validateAnswer(true);
        }
      }, 1000);
    }
  };

  // Vérifie la réponse de l'utilisateur
  const validateAnswer = (isMatching = false) => {
    if (showExplanation && !isMatching) return;
    
    const currentQuestion = quizzes[selectedQuizIndex].questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'matching' && isMatching) {
      isCorrect = matchedPairIndices.length === matchPairs.length;
    }
    
    // Mettre à jour le score
    if (isCorrect) {
      setScore(prevScore => prevScore + (currentQuestion.points || 1));
    }
    
    // Arrêter le timer
    setTimerActive(false);
    
    // Enregistrer la réponse de l'utilisateur
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      answer: selectedAnswer,
      isCorrect,
      timeTaken: currentQuestion.timeLimit ? currentQuestion.timeLimit - timeLeft : 0
    };
    setUserAnswers(newUserAnswers);
    
    // Montrer l'explication
    setShowExplanation(true);
    
    // Animation pour le retour
    if (isCorrect) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  // Passe à la question suivante
  const goToNextQuestion = () => {
    const currentQuiz = quizzes[selectedQuizIndex];
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      
      // Mettre à jour le timer pour la prochaine question
      const nextQuestion = currentQuiz.questions[currentQuestionIndex + 1];
      if (nextQuestion.timeLimit) {
        setTimeLeft(nextQuestion.timeLimit);
        setTimerActive(true);
      } else {
        setTimeLeft(0);
        setTimerActive(false);
      }
      
      // Initialiser les paires pour un quiz de matching
      if (nextQuestion.type === 'matching') {
        initializeMatchingPairs(nextQuestion);
      }
    } else {
      // Quiz terminé, afficher les résultats
      finishQuiz();
    }
  };

  // Termine le quiz et passe en mode résultats
  const finishQuiz = () => {
    setViewMode('results');
    
    // Marquer le quiz comme terminé
    const completedQuizId = quizzes[selectedQuizIndex].id;
    if (!completedQuizzes.includes(completedQuizId)) {
      setCompletedQuizzes([...completedQuizzes, completedQuizId]);
    }
  };

  // Formate le temps (secondes) en format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Rendu d'une catégorie
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategoryId === item.id && [styles.selectedCategoryButton, { borderColor: levelColor }]
      ]}
      onPress={() => setSelectedCategoryId(item.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategoryId === item.id && { color: levelColor }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Rendu d'un quiz dans la liste
  const renderQuizItem = ({ item, index }) => {
    const isCompleted = completedQuizzes.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.quizCard,
          isCompleted && styles.completedQuizCard
        ]}
        onPress={() => startQuiz(index)}
      >
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.quizImage}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.quizDetails}>
          <View style={styles.quizTitleRow}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            {isCompleted && (
              <View style={[styles.completedBadge, { backgroundColor: levelColor }]}>
                <Text style={styles.completedBadgeText}>✓</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.quizDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.quizInfo}>
            <Text style={styles.quizInfoText}>
              {item.questions.length} questions • {item.difficulty}
            </Text>
            {item.estimatedTime && (
              <Text style={styles.quizInfoText}>
                {item.estimatedTime} min
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Rendu du défi quotidien
  const renderDailyChallenge = () => {
    if (!dailyChallenge) return null;
    
    return (
      <TouchableOpacity
        style={styles.dailyChallengeCard}
        onPress={() => {
          // Trouver l'index du quiz correspondant au défi quotidien
          const dailyQuizIndex = quizzes.findIndex(quiz => quiz.id === dailyChallenge.quizId);
          if (dailyQuizIndex !== -1) {
            startQuiz(dailyQuizIndex);
          }
        }}
      >
        <View style={styles.dailyChallengeContent}>
          <View style={styles.dailyChallengeBadge}>
            <Text style={styles.dailyChallengeBadgeText}>Daily Challenge</Text>
          </View>
          
          <Text style={styles.dailyChallengeTitle}>{dailyChallenge.title}</Text>
          <Text style={styles.dailyChallengeDescription}>{dailyChallenge.description}</Text>
          
          <View style={[styles.startChallengeButton, { backgroundColor: levelColor }]}>
            <Text style={styles.startChallengeButtonText}>Start Challenge</Text>
          </View>
        </View>
        
        <View style={[styles.dailyChallengeDecoration, { backgroundColor: `${levelColor}20` }]}>
          <Text style={[styles.dailyChallengeIcon, { color: levelColor }]}>🏆</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Rendu d'une question à choix multiples
  const renderMultipleChoiceQuestion = (question) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      {question.imageUrl && (
        <Image 
          source={{ uri: question.imageUrl }}
          style={styles.questionImage}
          resizeMode="contain"
        />
      )}
      
      <View style={styles.answerOptions}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerOption,
              selectedAnswer === index && [styles.selectedAnswerOption, { borderColor: levelColor }],
              showExplanation && index === question.correctAnswer && styles.correctAnswerOption,
              showExplanation && selectedAnswer === index && selectedAnswer !== question.correctAnswer && styles.incorrectAnswerOption
            ]}
            onPress={() => handleSelectAnswer(index)}
            disabled={showExplanation}
          >
            <Text style={[
              styles.answerOptionText,
              selectedAnswer === index && { color: levelColor },
              showExplanation && index === question.correctAnswer && styles.correctAnswerText,
              showExplanation && selectedAnswer === index && selectedAnswer !== question.correctAnswer && styles.incorrectAnswerText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Rendu d'une question vrai/faux
  const renderTrueFalseQuestion = (question) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      {question.imageUrl && (
        <Image 
          source={{ uri: question.imageUrl }}
          style={styles.questionImage}
          resizeMode="contain"
        />
      )}
      
      <View style={styles.trueFalseOptions}>
        <TouchableOpacity
          style={[
            styles.trueFalseOption,
            selectedAnswer === 0 && [styles.selectedTrueFalseOption, { borderColor: levelColor }],
            showExplanation && 0 === question.correctAnswer && styles.correctTrueFalseOption,
            showExplanation && selectedAnswer === 0 && 0 !== question.correctAnswer && styles.incorrectTrueFalseOption
          ]}
          onPress={() => handleSelectAnswer(0)}
          disabled={showExplanation}
        >
          <Text style={[
            styles.trueFalseOptionText,
            selectedAnswer === 0 && { color: levelColor },
            showExplanation && 0 === question.correctAnswer && styles.correctTrueFalseText,
            showExplanation && selectedAnswer === 0 && 0 !== question.correctAnswer && styles.incorrectTrueFalseText
          ]}>
            True
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.trueFalseOption,
            selectedAnswer === 1 && [styles.selectedTrueFalseOption, { borderColor: levelColor }],
            showExplanation && 1 === question.correctAnswer && styles.correctTrueFalseOption,
            showExplanation && selectedAnswer === 1 && 1 !== question.correctAnswer && styles.incorrectTrueFalseOption
          ]}
          onPress={() => handleSelectAnswer(1)}
          disabled={showExplanation}
        >
          <Text style={[
            styles.trueFalseOptionText,
            selectedAnswer === 1 && { color: levelColor },
            showExplanation && 1 === question.correctAnswer && styles.correctTrueFalseText,
            showExplanation && selectedAnswer === 1 && 1 !== question.correctAnswer && styles.incorrectTrueFalseText
          ]}>
            False
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Rendu d'une question de matching
  const renderMatchingQuestion = (question) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <View style={styles.matchingContainer}>
        {matchPairs.map((pair, index) => {
          const isSelected = selectedPairIndices.includes(index);
          const isMatched = matchedPairIndices.includes(index);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.matchingItem,
                isSelected && [styles.selectedMatchingItem, { borderColor: levelColor }],
                isMatched && styles.matchedMatchingItem
              ]}
              onPress={() => handleSelectPair(index)}
              disabled={isMatched || showExplanation}
            >
              <Text style={[
                styles.matchingItemText,
                isSelected && { color: levelColor },
                isMatched && styles.matchedMatchingItemText
              ]}>
                {pair.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Rendu d'une question en fonction de son type
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple_choice':
        return renderMultipleChoiceQuestion(question);
      case 'true_false':
        return renderTrueFalseQuestion(question);
      case 'matching':
        return renderMatchingQuestion(question);
      default:
        return (
          <View style={styles.unsupportedQuestionType}>
            <Text style={styles.unsupportedQuestionTypeText}>
              Unsupported question type: {question.type}
            </Text>
          </View>
        );
    }
  };

  // Rendu du mode de navigation des quiz
  const renderBrowseMode = () => (
    <ScrollView
      style={styles.browseContainer}
      contentContainerStyle={styles.browseContent}
    >
      {renderDailyChallenge()}
      
      <Text style={styles.sectionTitle}>Quiz Categories</Text>
      
      {quizData && quizData.categories && (
        <FlatList
          horizontal
          data={quizData.categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesListContent}
        />
      )}
      
      <Text style={styles.sectionTitle}>
        {selectedCategoryId && quizData 
          ? quizData.categories.find(c => c.id === selectedCategoryId)?.name || 'Quizzes' 
          : 'Quizzes'}
      </Text>
      
      {quizzes.length > 0 ? (
        <FlatList
          data={quizzes}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // La liste parente gère le scroll
          contentContainerStyle={styles.quizListContent}
        />
      ) : (
        <View style={styles.emptyQuizContainer}>
          <Text style={styles.emptyQuizText}>No quizzes available in this category.</Text>
        </View>
      )}
    </ScrollView>
  );

  // Rendu du mode quiz (questions)
  const renderQuizMode = () => {
    if (selectedQuizIndex === null || !quizzes[selectedQuizIndex]) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Quiz not found.</Text>
          <TouchableOpacity
            style={[styles.returnButton, { backgroundColor: levelColor }]}
            onPress={() => setViewMode('browse')}
          >
            <Text style={styles.returnButtonText}>Return to Quizzes</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const currentQuiz = quizzes[selectedQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    
    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <Text style={styles.quizHeaderTitle}>{currentQuiz.title}</Text>
          <View style={styles.progressIndicator}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { 
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }),
                    backgroundColor: levelColor
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}
            </Text>
          </View>
        </View>
        
        {timeLeft > 0 && (
          <View style={styles.timerContainer}>
            <Text style={[
              styles.timerText,
              timeLeft <= 10 && styles.timerWarning
            ]}>
              Time: {formatTime(timeLeft)}
            </Text>
          </View>
        )}
        
        <ScrollView
          style={styles.questionScroll}
          contentContainerStyle={styles.questionScrollContent}
        >
          <Animated.View
            style={[
              styles.questionCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {renderQuestion(currentQuestion)}
            
            {showExplanation && currentQuestion.explanation && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Explanation:</Text>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              </View>
            )}
          </Animated.View>
        </ScrollView>
        
        <View style={styles.quizActions}>
          {!showExplanation ? (
            <TouchableOpacity
              style={[
                styles.validateButton,
                (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') && selectedAnswer === null && styles.disabledButton,
                { backgroundColor: levelColor }
              ]}
              onPress={() => validateAnswer()}
              disabled={(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') && selectedAnswer === null}
            >
              <Text style={styles.validateButtonText}>Check Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: levelColor }]}
              onPress={goToNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < currentQuiz.questions.length - 1 
                  ? 'Next Question' 
                  : 'See Results'}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.exitQuizButton, { borderColor: levelColor }]}
            onPress={() => {
              // Confirmer avant de quitter?
              setViewMode('browse');
            }}
          >
            <Text style={[styles.exitQuizButtonText, { color: levelColor }]}>Exit Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Rendu du mode résultats
  const renderResultsMode = () => {
    if (selectedQuizIndex === null || !quizzes[selectedQuizIndex]) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Quiz not found.</Text>
          <TouchableOpacity
            style={[styles.returnButton, { backgroundColor: levelColor }]}
            onPress={() => setViewMode('browse')}
          >
            <Text style={styles.returnButtonText}>Return to Quizzes</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const currentQuiz = quizzes[selectedQuizIndex];
    const totalQuestions = currentQuiz.questions.length;
    const totalPoints = currentQuiz.questions.reduce((sum, question) => sum + (question.points || 1), 0);
    const percentage = Math.round((score / totalPoints) * 100);
    
    return (
      <ScrollView
        style={styles.resultsContainer}
        contentContainerStyle={styles.resultsContent}
      >
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Quiz Complete!</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreText}>{score}/{totalPoints} points</Text>
          </View>
          
          <Text style={styles.resultsFeedback}>
            {percentage >= 80 
              ? "Excellent! You have a great understanding of this topic."
              : percentage >= 60
                ? "Good job! Keep practicing to master this content."
                : "Keep working on this topic. You'll improve with practice!"}
          </Text>
          
          <View style={styles.resultsStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Questions</Text>
              <Text style={styles.statValue}>{totalQuestions}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Correct</Text>
              <Text style={styles.statValue}>
                {userAnswers.filter(answer => answer.isCorrect).length}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Accuracy</Text>
              <Text style={styles.statValue}>
                {Math.round((userAnswers.filter(answer => answer.isCorrect).length / totalQuestions) * 100)}%
              </Text>
            </View>
          </View>
          
          <Text style={styles.answerSummaryTitle}>Question Summary:</Text>
          
          {currentQuiz.questions.map((question, index) => (
            <View key={index} style={styles.answerSummaryItem}>
              <View style={styles.answerSummaryHeader}>
                <Text style={styles.answerSummaryQuestion}>
                  Q{index + 1}: {question.text.length > 40 ? question.text.substring(0, 40) + '...' : question.text}
                </Text>
                {userAnswers[index] && (
                  <View style={[
                    styles.answerStatusBadge,
                    userAnswers[index].isCorrect ? styles.correctStatusBadge : styles.incorrectStatusBadge
                  ]}>
                    <Text style={styles.answerStatusText}>
                      {userAnswers[index].isCorrect ? '✓' : '✗'}
                    </Text>
                  </View>
                )}
              </View>
              
              {userAnswers[index] && question.type === 'multiple_choice' && (
                <Text style={styles.answerSummaryDetail}>
                  Your answer: {question.options[userAnswers[index].answer] || 'None'}{'\n'}
                  Correct answer: {question.options[question.correctAnswer]}
                </Text>
              )}
              
              {userAnswers[index] && question.type === 'true_false' && (
                <Text style={styles.answerSummaryDetail}>
                  Your answer: {userAnswers[index].answer === 0 ? 'True' : (userAnswers[index].answer === 1 ? 'False' : 'None')}{'\n'}
                  Correct answer: {question.correctAnswer === 0 ? 'True' : 'False'}
                </Text>
              )}
            </View>
          ))}
          
          <View style={styles.resultsActions}>
            <TouchableOpacity
              style={[styles.tryAgainButton, { backgroundColor: levelColor }]}
              onPress={() => startQuiz(selectedQuizIndex)}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.browseQuizzesButton, { borderColor: levelColor }]}
              onPress={() => setViewMode('browse')}
            >
              <Text style={[styles.browseQuizzesButtonText, { color: levelColor }]}>Browse Quizzes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  // Affichage de l'écran de chargement
  if (!quizData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading quizzes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.headerTitle}>Quizzes & Challenges</Text>
      </View>
      
      {viewMode === 'browse' && renderBrowseMode()}
      {viewMode === 'quiz' && renderQuizMode()}
      {viewMode === 'results' && renderResultsMode()}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
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
  // Browse mode styles
  browseContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  browseContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginVertical: 16,
  },
  categoriesList: {
    marginBottom: 8,
  },
  categoriesListContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 10,
    backgroundColor: 'white',
  },
  selectedCategoryButton: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  quizListContent: {
    paddingBottom: 20,
  },
  quizCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  completedQuizCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  quizImage: {
    width: 80,
    height: '100%',
  },
  quizDetails: {
    flex: 1,
    padding: 12,
  },
  quizTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  completedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  completedBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  quizDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  quizInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quizInfoText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  dailyChallengeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  dailyChallengeContent: {
    flex: 1,
    padding: 16,
  },
  dailyChallengeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  dailyChallengeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  dailyChallengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  dailyChallengeDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  startChallengeButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startChallengeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  dailyChallengeDecoration: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dailyChallengeIcon: {
    fontSize: 36,
  },
  emptyQuizContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyQuizText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  // Quiz mode styles
  quizContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  quizHeader: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  quizHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
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
  timerContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  timerWarning: {
    color: '#ef4444',
  },
  questionScroll: {
    flex: 1,
  },
  questionScrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  questionCard: {
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
  questionContainer: {
    width: '100%',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    lineHeight: 26,
  },
  questionImage: {
    width: '100%',
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
  },
  answerOptions: {
    marginBottom: 10,
  },
  answerOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedAnswerOption: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
  },
  correctAnswerOption: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  incorrectAnswerOption: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  answerOptionText: {
    fontSize: 16,
    color: '#334155',
  },
  correctAnswerText: {
    color: '#10b981',
    fontWeight: '500',
  },
  incorrectAnswerText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  trueFalseOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  trueFalseOption: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  selectedTrueFalseOption: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
  },
  correctTrueFalseOption: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  incorrectTrueFalseOption: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  trueFalseOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  correctTrueFalseText: {
    color: '#10b981',
  },
  incorrectTrueFalseText: {
    color: '#ef4444',
  },
  matchingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  matchingItem: {
    width: '48%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedMatchingItem: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
  },
  matchedMatchingItem: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  matchingItemText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  matchedMatchingItemText: {
    color: '#10b981',
    fontWeight: '500',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  unsupportedQuestionType: {
    padding: 20,
    alignItems: 'center',
  },
  unsupportedQuestionTypeText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  quizActions: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  validateButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  validateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  exitQuizButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  exitQuizButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // Results mode styles
  resultsContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  resultsContent: {
    padding: 16,
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
    fontSize: 14,
    color: '#64748b',
  },
  resultsFeedback: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  resultsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  answerSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  answerSummaryItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  answerSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  answerSummaryQuestion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    flex: 1,
    marginRight: 8,
  },
  answerStatusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctStatusBadge: {
    backgroundColor: '#10b981',
  },
  incorrectStatusBadge: {
    backgroundColor: '#ef4444',
  },
  answerStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  answerSummaryDetail: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
    lineHeight: 18,
  },
  resultsActions: {
    marginTop: 24,
  },
  tryAgainButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  tryAgainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  browseQuizzesButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  browseQuizzesButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // Error styles
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  returnButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  returnButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QuizzesChallengers;
