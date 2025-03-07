// src/components/screens/exercises/GrammarExercise.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import des données de grammaire par niveau
import grammarA1 from "../../../data/exercises/grammar/grammarA1";
// Futurs niveaux: import grammarA2 from "../../../data/exercises/grammar/grammarA2"; etc.

const GrammarExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };

  // États pour suivre la progression de l'exercice
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Couleur basée sur le niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6", A2: "#8b5cf6", B1: "#10b981",
      B2: "#f59e0b", C1: "#ef4444", C2: "#6366f1",
    };
    return colors[level] || "#3b82f6";
  };
  const levelColor = getLevelColor(level);

  // Récupérer les données de grammaire en fonction du niveau
  const getGrammarData = (level) => {
    switch(level) {
      case 'A1': return grammarA1;
      // Futurs niveaux: case 'A2': return grammarA2; etc.
      default: return grammarA1;
    }
  };

  const grammarData = getGrammarData(level);
  const currentRule = grammarData[selectedRuleIndex];
  const currentExercise = currentRule?.exercises?.[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === (currentRule?.exercises?.length - 1);
  const progress = ((currentExerciseIndex + (showFeedback && isCorrect ? 1 : 0)) / (currentRule?.exercises?.length || 1)) * 100;

  // Réinitialiser l'exercice
  const resetExercise = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setInputText('');
    setIsCorrect(false);
    setAttempts(0);
  };

  // Gestion de la vérification des réponses
  const checkAnswer = () => {
    if (!currentExercise) return;
    
    let correct = false;
    
    if (currentExercise.type === 'fillInTheBlank' && currentExercise.options) {
      correct = selectedOption !== null && 
                (currentExercise.options[selectedOption] === currentExercise.answer || 
                 selectedOption === currentExercise.answer);
    } else if (currentExercise.type === 'fillInTheBlank') {
      correct = inputText.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    } else if (currentExercise.type === 'transformation') {
      correct = inputText.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    }

    setIsCorrect(correct);
    setAttempts(attempts + 1);

    const answer = {
      exerciseIndex: currentExerciseIndex,
      userAnswer: currentExercise.options 
        ? (selectedOption !== null ? currentExercise.options[selectedOption] : null)
        : inputText,
      isCorrect: correct,
      attempts: attempts + 1
    };

    setUserAnswers([...userAnswers, answer]);
    setShowFeedback(true);
  };

  // Retenter un exercice
  const retryExercise = () => {
    setShowFeedback(false);
    if (currentExercise.type === 'fillInTheBlank' && !currentExercise.options) {
      setInputText('');
    } else if (currentExercise.type === 'transformation') {
      setInputText('');
    } else {
      setSelectedOption(null);
    }
  };

  // Passer à l'exercice suivant
  const goToNextExercise = () => {
    if (isLastExercise) {
      if (selectedRuleIndex < grammarData.length - 1) {
        // Passer à la règle suivante
        setSelectedRuleIndex(selectedRuleIndex + 1);
        resetExercise();
        setCurrentExerciseIndex(0);
      } else {
        // Toutes les règles sont terminées
        navigation.goBack();
      }
    } else {
      resetExercise();
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  // Revenir à l'exercice précédent
  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      resetExercise();
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  // Changer de règle grammaticale
  const handleRuleChange = (index) => {
    if (index !== selectedRuleIndex) {
      setSelectedRuleIndex(index);
      setCurrentExerciseIndex(0);
      resetExercise();
    }
  };

  // Render pour un exercice à choix multiples
  const renderMultipleChoiceExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.question}>{currentExercise.question}</Text>
      
      {currentExercise.sentence && (
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>
            {currentExercise.sentence.replace('___', '______')}
          </Text>
        </View>
      )}
      
      <View style={styles.optionsContainer}>
        {currentExercise.options.map((option, index) => {
          const isCorrectOption = index === currentExercise.answer || option === currentExercise.answer;
          const isSelectedOption = selectedOption === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelectedOption && styles.selectedOption,
                showFeedback && isCorrectOption && styles.correctOption,
                showFeedback && isSelectedOption && !isCorrectOption && styles.incorrectOption
              ]}
              onPress={() => !showFeedback && setSelectedOption(index)}
              disabled={showFeedback && isCorrect}
            >
              <Text style={[
                styles.optionText,
                isSelectedOption && styles.selectedOptionText,
                showFeedback && isCorrectOption && styles.correctOptionText,
                showFeedback && isSelectedOption && !isCorrectOption && styles.incorrectOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render pour un exercice à remplir les blancs
  const renderFillBlankExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.question}>{currentExercise.question}</Text>
      
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentence}>
          {currentExercise.sentence?.split('___')[0]}
          <TextInput
            style={[
              styles.textInput,
              showFeedback && inputText.trim().toLowerCase() === currentExercise.answer.toLowerCase() 
                ? styles.correctTextInput 
                : showFeedback && !isCorrect ? styles.incorrectTextInput : null
            ]}
            value={inputText}
            onChangeText={text => !showFeedback && setInputText(text)}
            placeholder="..."
            editable={!showFeedback || !isCorrect}
          />
          {currentExercise.sentence?.split('___')[1]}
        </Text>
      </View>
    </View>
  );

  // Render de l'exercice en cours
  const renderCurrentExercise = () => {
    if (!currentExercise) return null;
    
    if (currentExercise.type === 'fillInTheBlank' && currentExercise.options) {
      return renderMultipleChoiceExercise();
    } else if (currentExercise.type === 'fillInTheBlank' || currentExercise.type === 'transformation') {
      return renderFillBlankExercise();
    }
    
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec badge de niveau et titre de l'exercice */}
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
        <Text style={styles.exerciseTitle}>Grammar Exercise</Text>
      </View>
      
      {/* Sélecteur de règle grammaticale */}
      <View style={styles.ruleSelector}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rulesContainer}
        >
          {grammarData.map((rule, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.ruleButton,
                selectedRuleIndex === index && { borderColor: levelColor, borderWidth: 2 }
              ]}
              onPress={() => handleRuleChange(index)}
            >
              <Text style={[
                styles.ruleButtonText,
                selectedRuleIndex === index && { color: levelColor, fontWeight: '600' }
              ]}>
                {rule.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: levelColor }]} />
        </View>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1}/{currentRule?.exercises?.length || 0}
        </Text>
      </View>
      
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Affichage de la règle */}
        <View style={styles.ruleContainer}>
          <Text style={styles.ruleTitle}>{currentRule?.title}</Text>
          <Text style={styles.ruleExplanation}>{currentRule?.explanation}</Text>
          
          {/* Exemples */}
          {currentRule?.examples && currentRule.examples.length > 0 && (
            <View style={styles.examplesContainer}>
              <Text style={styles.sectionTitle}>Examples:</Text>
              {currentRule.examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleText}>{example.english}</Text>
                  <Text style={styles.exampleTranslation}>{example.french}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Règles */}
          {currentRule?.rules && currentRule.rules.length > 0 && (
            <View style={styles.rulesListContainer}>
              <Text style={styles.sectionTitle}>Rules:</Text>
              {currentRule.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Text style={styles.ruleBullet}>•</Text>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        {/* Exercice en cours */}
        {renderCurrentExercise()}
        
        {/* Feedback après réponse */}
        {showFeedback && (
          <View style={[
            styles.feedbackContainer,
            isCorrect ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            <Text style={styles.feedbackTitle}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </Text>
            <Text style={styles.feedbackText}>
              {isCorrect 
                ? currentExercise.explanation || "Well done!" 
                : (attempts > 1 
                  ? `The correct answer is: ${currentExercise.answer}` 
                  : "Try again!")
              }
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Boutons d'action */}
      <View style={styles.actionContainer}>
        {!showFeedback ? (
          // Bouton "Check" quand l'utilisateur n'a pas encore validé sa réponse
          <TouchableOpacity 
            style={[
              styles.actionButton,
              (currentExercise?.options && selectedOption === null) ||
              (!currentExercise?.options && inputText.trim() === '')
                ? styles.disabledButton
                : [styles.enabledButton, { backgroundColor: levelColor }]
            ]}
            onPress={checkAnswer}
            disabled={(currentExercise?.options && selectedOption === null) ||
                     (!currentExercise?.options && inputText.trim() === '')}
          >
            <Text style={styles.actionButtonText}>Check</Text>
          </TouchableOpacity>
        ) : isCorrect ? (
          // Boutons "Previous" et "Next" quand la réponse est correcte
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[
                styles.navButton,
                styles.prevButton,
                { opacity: currentExerciseIndex > 0 ? 1 : 0.5 },
                { backgroundColor: `${levelColor}15` }
              ]}
              onPress={goToPreviousExercise}
              disabled={currentExerciseIndex === 0}
            >
              <Text style={[styles.navButtonText, { color: levelColor }]}>
                Previous
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.navButton,
                styles.nextButton,
                { backgroundColor: levelColor }
              ]}
              onPress={goToNextExercise}
            >
              <Text style={styles.nextButtonText}>
                {isLastExercise ? 'Finish' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Boutons "Try Again" et "Skip" quand la réponse est incorrecte
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[
                styles.navButton,
                styles.retryButton,
                { backgroundColor: `${levelColor}15` }
              ]}
              onPress={retryExercise}
            >
              <Text style={[styles.navButtonText, { color: levelColor }]}>
                Try Again
              </Text>
            </TouchableOpacity>
            
            {attempts > 1 && (
              <TouchableOpacity 
                style={[
                  styles.navButton,
                  styles.skipButton,
                  { backgroundColor: levelColor }
                ]}
                onPress={goToNextExercise}
              >
                <Text style={styles.nextButtonText}>
                  Skip
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
  ruleSelector: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rulesContainer: {
    paddingHorizontal: 20,
  },
  ruleButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    backgroundColor: 'white',
  },
  ruleButtonText: {
    fontSize: 14,
    color: '#64748b',
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
    paddingBottom: 30,
  },
  ruleContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  ruleExplanation: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  examplesContainer: {
    marginBottom: 16,
  },
  exampleItem: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  exampleText: {
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  rulesListContainer: {
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  ruleBullet: {
    fontSize: 16,
    color: '#64748b',
    marginRight: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  exerciseContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  sentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sentence: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 10,
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
    textAlign: 'center',
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
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    minWidth: 60,
    textAlign: 'center',
    fontSize: 16,
    padding: 4,
    color: '#334155',
  },
  correctTextInput: {
    borderBottomColor: '#10b981',
    color: '#10b981',
  },
  incorrectTextInput: {
    borderBottomColor: '#ef4444',
    color: '#ef4444',
  },
  feedbackContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  retryButton: {
    marginRight: 10,
  },
  skipButton: {
    marginLeft: 10,
  },
  navButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GrammarExercise;