/**
 * Types d'exercices disponibles dans l'application
 */
export const EXERCISE_TYPES = {
    VOCABULARY: 'vocabulary',
    GRAMMAR: 'grammar',
    CHATBOT: 'chatbot',
    READING: 'reading',
    ERROR_CORRECTION: 'error_correction',
    WORD_GAMES: 'word_games',
    PHRASES: 'phrases',
    SPELLING: 'spelling',
    EVALUATION: 'evaluation'
  };
  
  /**
   * Niveaux disponibles dans l'application
   */
  export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  /**
   * Mapping des types d'exercices aux écrans
   */
  export const EXERCISE_ROUTES = {
    [EXERCISE_TYPES.VOCABULARY]: 'VocabularyExercise',
    [EXERCISE_TYPES.GRAMMAR]: 'GrammarExercise',
    [EXERCISE_TYPES.CHATBOT]: 'ChatbotWriting',
    [EXERCISE_TYPES.READING]: 'ReadingExercise',
    [EXERCISE_TYPES.ERROR_CORRECTION]: 'ErrorCorrectionExercise',
    [EXERCISE_TYPES.WORD_GAMES]: 'WordGamesExercise',
    [EXERCISE_TYPES.PHRASES]: 'PhrasesExpressions',
    [EXERCISE_TYPES.SPELLING]: 'SpellingPractice',
    [EXERCISE_TYPES.EVALUATION]: 'Evaluation'
  };