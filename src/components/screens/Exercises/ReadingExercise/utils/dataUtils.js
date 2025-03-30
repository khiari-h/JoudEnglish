// src/components/screens/Exercises/ReadingExercise/utils/dataUtils.js
import readingA1Data from "../../../../../data/exercises/reading/readingA1Data";
// Importer d'autres niveaux quand ils seront disponibles
// import readingA2Data from '../../../../../data/exercises/reading/readingA2Data';
// import readingB1Data from '../../../../../data/exercises/reading/readingB1Data';

/**
 * Récupère et formate les données de lecture selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant ReadingExercise
 */
export const getReadingDataByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let readingData;
  switch (level.toUpperCase()) {
    case "A1":
      readingData = readingA1Data;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   readingData = readingA2Data;
    //   break;
    // case 'B1':
    //   readingData = readingB1Data;
    //   break;
    default:
      readingData = readingA1Data; // Par défaut, utiliser A1
  }

  // Transformer les exercices dans le format attendu
  const exercises = readingData.exercises.map((exercise, index) => ({
    id: `reading_${level.toLowerCase()}_${index}`,
    title: exercise.title,
    text: exercise.text,
    vocabulary: Object.entries(exercise.vocabulary).map(
      ([term, definition]) => ({
        term,
        definition,
      })
    ),
    questions: exercise.questions.map((question, qIndex) => ({
      id: `question_${index}_${qIndex}`,
      text: question.text,
      options: question.options,
      correctAnswerIndex: question.correctAnswer,
      explanation: question.explanation,
    })),
  }));

  // Conseils pour l'exercice de lecture
  const tips = [
    "Lisez d'abord le texte entièrement pour comprendre le sens général.",
    "Relisez les passages spécifiques pour répondre aux questions.",
    "Consultez le vocabulaire pour les mots que vous ne comprenez pas.",
    "Essayez de comprendre le contexte même si vous ne connaissez pas tous les mots.",
    "Prenez votre temps, la compréhension écrite s'améliore avec la pratique.",
  ];

  return {
    exercises,
    tips,
    level,
  };
};

/**
 * Récupère un exercice de lecture spécifique par son ID
 * @param {string} exerciseId - L'ID de l'exercice
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} L'exercice correspondant ou null
 */
export const getReadingExerciseById = (exerciseId, level) => {
  const { exercises } = getReadingDataByLevel(level);
  return exercises.find((exercise) => exercise.id === exerciseId) || null;
};

/**
 * Calcule le score de l'utilisateur pour un exercice
 * @param {string} exerciseId - L'ID de l'exercice
 * @param {Array} userAnswers - Tableau des réponses de l'utilisateur
 * @param {string} level - Le niveau de langue
 * @returns {Object} Score et feedback détaillé
 */
export const calculateReadingScore = (exerciseId, userAnswers, level) => {
  const exercise = getReadingExerciseById(exerciseId, level);

  if (!exercise) {
    return { score: 0, total: 0, percentage: 0, details: [] };
  }

  const details = exercise.questions.map((question, index) => {
    const userAnswerIndex = userAnswers[index];
    const isCorrect = userAnswerIndex === question.correctAnswerIndex;

    return {
      questionId: question.id,
      questionText: question.text,
      userAnswerIndex,
      userAnswerText:
        userAnswerIndex !== undefined
          ? question.options[userAnswerIndex]
          : "No answer",
      correctAnswerIndex: question.correctAnswerIndex,
      correctAnswerText: question.options[question.correctAnswerIndex],
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = details.filter((detail) => detail.isCorrect).length;
  const total = exercise.questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return {
    score: correctCount,
    total,
    percentage,
    details,
  };
};

/**
 * Récupère les termes de vocabulaire d'un exercice
 * @param {string} exerciseId - L'ID de l'exercice
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des termes de vocabulaire
 */
export const getVocabularyForExercise = (exerciseId, level) => {
  const exercise = getReadingExerciseById(exerciseId, level);
  return exercise ? exercise.vocabulary : [];
};
