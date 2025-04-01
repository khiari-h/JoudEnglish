export const EXERCISE_ROUTES = {
  VOCABULARY: 'VocabularyExercise',
  GRAMMAR: 'GrammarExercise',
  READING: 'ReadingExercise',
  WORD_GAMES: 'WordGamesExercise',
  PHRASES: 'PhrasesExpressions',
  ERROR_CORRECTION: 'ErrorCorrectionExercise',
  CHATBOT: 'ChatbotWriting',
  SPELLING: 'SpellingExercise',
  ASSESSMENT: 'LevelAssessment',
  RESULTS: 'ExerciseResults'
};

export const getExerciseRoute = (exerciseType) => {
  return EXERCISE_ROUTES[exerciseType.toUpperCase()] || EXERCISE_ROUTES.VOCABULARY;
};
