// Importer les types d'exercices définis globalement dans l'application
import { EXERCISE_TYPES } from "../../../../../constants/exercicesTypes";

// Données par défaut pour les exercices de correction
export const DEFAULT_CORRECTION_DATA = {
  title: "Spelling Correction",
  description: "Practice correcting common spelling mistakes",
  exercises: [
    {
      type: EXERCISE_TYPES.SPELLING,
      subType: "correction",
      instruction: "Correct the spelling mistake",
      wordToCorrect: "hapy",
      correctAnswer: "happy",
      errorCount: 1,
      hasHint: true,
      hint: "This word has a double consonant.",
      explanation: "The word 'happy' is spelled with a double 'p'.",
    },
  ],
};

// Données par défaut pour les exercices de règles d'orthographe
export const DEFAULT_RULES_DATA = {
  title: "Spelling Rules",
  description: "Basic spelling rules",
  exercises: [
    {
      type: EXERCISE_TYPES.SPELLING,
      subType: "spelling_rule",
      rule: "Example rule",
      instruction: "Apply the rule: Form the plural of 'cat'",
      correctAnswer: "cats",
      hasHint: true,
      hint: "Just add 's' to the end.",
      explanation: "Most nouns form their plural by adding 's' at the end.",
    },
  ],
};

// Options de modes d'exercices pour l'écran de sélection
export const SPELLING_OPTIONS = [
  {
    id: "spelling-rules",
    title: "Spelling Rules",
    description: "Learn and practice common spelling rules for English words",
    screen: "SpellingRulesPractice",
    icon: "📏",
  },
  {
    id: "spelling-correction",
    title: "Spelling Correction",
    description: "Practice correcting commonly misspelled words",
    screen: "SpellingCorrectionPractice",
    icon: "✓",
  },
];
