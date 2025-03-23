import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import des composants
import ExerciseHeader from './components/ExerciseHeader';
import RuleSelector from './components/RuleSelector';
import ProgressBar from './components/ProgressBar';
import RuleDisplay from './components/RuleDisplay';
import ExerciseContainer from './components/ExerciseContainer';
import FeedbackDisplay from './components/FeedbackDisplay';
import ExerciseActions from './components/ExerciseActions';

// Import des hooks personnalisés
import useGrammarExercise from './hooks/useGrammarExercise';
import useExerciseNavigation from './hooks/useExerciseNavigation';

// Import des utilitaires
import { getLevelColor } from './utils/levelUtils';

// Import des styles
import styles from './style';

/**
 * Composant principal pour les exercices de grammaire (version simplifiée)
 */
const GrammarExercise = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  const levelColor = getLevelColor(level);

  // Récupérer la logique et les états des hooks personnalisés
  const {
    // États
    selectedRuleIndex, setSelectedRuleIndex,
    currentExerciseIndex, setCurrentExerciseIndex,
    selectedOption, setSelectedOption,
    inputText, setInputText,
    showFeedback, isCorrect, attempts,
    
    // Données
    grammarData, currentRule, currentExercise, 
    isLastExercise, progress,
    
    // Fonctions
    resetExercise, checkAnswer, retryExercise,
    canCheckAnswer,
  } = useGrammarExercise(level);

  // Logique de navigation
  const { 
    goToNextExercise, 
    goToPreviousExercise,
    handleRuleChange,
  } = useExerciseNavigation({
    navigation,
    currentExerciseIndex,
    selectedRuleIndex,
    grammarData,
    setCurrentExerciseIndex,
    setSelectedRuleIndex,
    resetExercise,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec badge de niveau et titre */}
      <ExerciseHeader 
        level={level}
        levelColor={levelColor}
        navigation={navigation}
      />
      
      {/* Sélecteur de règle grammaticale */}
      <RuleSelector
        rules={grammarData}
        selectedRuleIndex={selectedRuleIndex}
        onRuleChange={handleRuleChange}
        levelColor={levelColor}
      />
      
      {/* Barre de progression */}
      <ProgressBar
        currentIndex={currentExerciseIndex}
        totalCount={currentRule?.exercises?.length || 0}
        progress={progress}
        levelColor={levelColor}
      />
      
      {/* Contenu principal */}
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Affichage de la règle */}
        <RuleDisplay rule={currentRule} />
        
        {/* Exercice en cours */}
        {currentExercise && (
          <ExerciseContainer
            exercise={currentExercise}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            inputText={inputText}
            setInputText={setInputText}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            levelColor={levelColor}
          />
        )}
        
        {/* Feedback après réponse */}
        {showFeedback && (
          <FeedbackDisplay
            isCorrect={isCorrect}
            exercise={currentExercise}
            attempts={attempts}
            levelColor={levelColor}
          />
        )}
      </ScrollView>
      
      {/* Boutons d'action */}
      <ExerciseActions
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        attempts={attempts}
        onCheck={checkAnswer}
        onNext={goToNextExercise}
        onPrevious={goToPreviousExercise}
        onRetry={retryExercise}
        isLastExercise={isLastExercise}
        canCheck={canCheckAnswer()}
        currentExerciseIndex={currentExerciseIndex}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default GrammarExercise;