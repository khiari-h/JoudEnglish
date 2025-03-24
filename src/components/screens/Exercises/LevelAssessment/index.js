import React, { useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import des hooks personnalisés
import useAssessment from "./hooks/useAssessment";
import useAssessmentNavigation from "./hooks/useAssessmentNavigation";

// Import des composants
import AssessmentHeader from "./components/AssessmentHeader";
import QuestionCard from "./components/QuestionCard";
import ActionButtons from "./components/ActionButtons";
import ResultsScreen from "./components/ResultsScreen";

// Import des utilitaires
import { getLevelColor } from "./utils/levelUtils";

// Import des styles
import styles from "./style";

const LevelAssessment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  
  // Référence pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Obtenir la couleur du niveau
  const levelColor = getLevelColor(level);
  
  // État et logique de l'évaluation via hooks personnalisés
  const {
    currentSection,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    testCompleted,
    currentSectionData,
    currentQuestion,
    setSelectedAnswer,
    validateAnswer,
    isLastQuestion,
    isLastSection,
  } = useAssessment(level);
  
  // Logique de navigation entre questions et sections
  const {
    handleGoBack,
    tryAgain,
    goToNextQuestion,
    animateFeedback,
  } = useAssessmentNavigation({
    navigation,
    fadeAnim,
    currentSection,
    currentQuestionIndex,
    showFeedback,
    selectedAnswer,
  });
  
  // Si le test est terminé, afficher les écran de résultats
  if (testCompleted) {
    return (
      <ResultsScreen 
        level={level}
        levelColor={levelColor}
        onContinue={() => navigation.navigate("Dashboard")}
      />
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec niveau et titre */}
      <AssessmentHeader
        level={level}
        levelColor={levelColor}
        onGoBack={handleGoBack}
      />
      
      {/* Contenu principal avec questions */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {currentSection && currentQuestion && (
          <QuestionCard
            sectionTitle={currentSection.toUpperCase().replace("_", " ")}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            levelColor={levelColor}
            fadeAnim={fadeAnim}
          />
        )}
      </ScrollView>
      
      {/* Boutons d'action (vérifier, suivant, réessayer) */}
      <ActionButtons
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        onValidate={() => {
          validateAnswer();
          animateFeedback();
        }}
        onNext={goToNextQuestion}
        onTryAgain={tryAgain}
        isLastQuestion={isLastQuestion}
        isLastSection={isLastSection}
        levelColor={levelColor}
      />
    </SafeAreaView>
  );
};

export default LevelAssessment;