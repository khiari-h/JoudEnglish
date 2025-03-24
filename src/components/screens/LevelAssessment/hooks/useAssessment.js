import { useState, useEffect } from 'react';
import levelA1AssessmentData from "../../../../data/exercises/assessments/levelA1Assessments";

/**
 * Hook personnalisé pour gérer l'état et la logique d'une évaluation de niveau
 * 
 * @param {string} level - Niveau d'évaluation (A1, A2, etc.)
 * @returns {Object} - États et fonctions pour l'évaluation
 */
const useAssessment = (level) => {
  // États de gestion du test
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [answers, setAnswers] = useState([]); // Historique des réponses (pour analyses futures)

  // Sections du test (correspondant aux sections dans le fichier de données)
  const sections = [
    "vocabulary",
    "grammar",
    "phrases_expressions",
    "error_correction",
    "spelling",
    "spelling_rules",
    "reading_comprehension",
  ];

  // Données d'évaluation basées sur le niveau
  // Pour le moment, nous utilisons uniquement A1, mais cela pourrait être étendu
  const getData = () => {
    // Ici, on pourrait ajouter une logique pour d'autres niveaux
    return levelA1AssessmentData;
  };

  const Data = getData();

  // Initialisation du test
  useEffect(() => {
    // Commencer par la première section
    setCurrentSection(sections[0]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTestCompleted(false);
    setAnswers([]);
  }, [level]);

  // Accès aux données actuelles
  const currentSectionData = currentSection ? Data[currentSection] : null;
  const currentQuestion = currentSectionData?.questions?.[currentQuestionIndex] || null;
  
  // Vérifier si c'est la dernière question de la section
  const isLastQuestion = currentSectionData
    ? currentQuestionIndex === currentSectionData.questions.length - 1
    : false;
  
  // Vérifier si c'est la dernière section
  const isLastSection = sections.indexOf(currentSection) === sections.length - 1;

  // Validation de la réponse
  const validateAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    // Ajouter la réponse à l'historique
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const answer = {
      section: currentSection,
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    };
    
    setAnswers([...answers, answer]);
    
    // Afficher le feedback
    setShowFeedback(true);
  };

  // Passer à la question suivante ou à la section suivante
  const goToNextQuestion = () => {
    if (!currentSectionData) return;

    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      // Passer à la question suivante dans la section
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Passer à la section suivante
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Test terminé
        setTestCompleted(true);
      }
    }
  };

  // Réessayer la question actuelle
  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return {
    // États
    currentSection,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    testCompleted,
    answers,
    
    // Données
    currentSectionData,
    currentQuestion,
    isLastQuestion,
    isLastSection,
    
    // Fonctions
    setSelectedAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,
  };
};

export default useAssessment;