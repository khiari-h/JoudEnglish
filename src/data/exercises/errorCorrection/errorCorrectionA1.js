// src/data/exercises/errorCorrection/errorCorrectionA1.js

const errorCorrectionA1 = {
  categories: [
    {
      id: 1,
      name: "Articles",
      description: "Practicing correct usage of 'a', 'an', and 'the'",
    },
    {
      id: 2,
      name: "Verb to Be",
      description: "Correcting errors with the verb 'to be'",
    },
    {
      id: 3,
      name: "Simple Present",
      description: "Fixing mistakes in simple present tense",
    },
    {
      id: 4,
      name: "Pronouns",
      description: "Identifying and correcting pronoun errors",
    },
    {
      id: 5,
      name: "Sentence Structure",
      description: "Improving basic sentence construction",
    },
  ],
  exercises: [
    {
      categoryId: 1,
      type: "full",
      text: "I am student in Paris.",
      correctedText: "I am a student in Paris.",
      hint: "Remember to use 'a' before singular countable nouns",
      explanation:
        "When describing your profession or status, use 'a' before the noun.",
      errorPositions: [3],
    },
    {
      categoryId: 1,
      type: "multiple_choice",
      text: "She is ____ engineer.",
      choices: ["a", "an", "the", "no article"],
      correctChoiceIndex: 1,
      correctedText: "She is an engineer.",
      hint: "Use 'an' before words starting with a vowel sound",
      explanation:
        "'An' is used before words that start with a vowel sound (a, e, i, o, u)",
    },
    {
      categoryId: 2,
      type: "full",
      text: "They be happy today.",
      correctedText: "They are happy today.",
      hint: "Remember the correct form of 'to be' for different subjects",
      explanation: "Use 'are' for 'they' in the verb 'to be'",
      errorPositions: [1, 2],
    },
    {
      categoryId: 2,
      type: "identify",
      text: "I is student from France.",
      correctedText: "I am a student from France.",
      errorPositions: [1, 2],
      hint: "Check the verb 'to be' with different subjects",
      explanation: "Use 'am' with 'I', not 'is'",
    },
    {
      categoryId: 3,
      type: "full",
      text: "He play football every weekend.",
      correctedText: "He plays football every weekend.",
      hint: "Remember the third-person singular 's' in simple present",
      explanation: "Add 's' to the verb for third-person singular subjects",
      errorPositions: [2],
    },
    {
      categoryId: 3,
      type: "multiple_choice",
      text: "They ____ to the park every Sunday.",
      choices: ["go", "goes", "going", "gone"],
      correctChoiceIndex: 0,
      correctedText: "They go to the park every Sunday.",
      hint: "Use the base form of the verb with 'they'",
      explanation:
        "'They' requires the base form of the verb in simple present",
    },
    {
      categoryId: 4,
      type: "full",
      text: "Me is happy to meet you.",
      correctedText: "I am happy to meet you.",
      hint: "Use the correct subject pronoun",
      explanation: "Use 'I' as the subject pronoun, not 'me'",
      errorPositions: [0, 1],
    },
    {
      categoryId: 4,
      type: "identify",
      text: "Her work in a bank.",
      correctedText: "She works in a bank.",
      errorPositions: [0, 2],
      hint: "Check the subject and verb agreement",
      explanation: "Use 'she' as the subject and add 's' to the verb",
    },
    {
      categoryId: 5,
      type: "full",
      text: "Happy I am today.",
      correctedText: "I am happy today.",
      hint: "Follow the standard English sentence structure",
      explanation: "In English, the subject typically comes before the verb",
      errorPositions: [0, 1, 2],
    },
    {
      categoryId: 5,
      type: "multiple_choice",
      text: "____ book is on the table.",
      choices: ["A", "An", "The", "Some"],
      correctChoiceIndex: 2,
      correctedText: "The book is on the table.",
      hint: "Think about specific vs. general reference",
      explanation: "Use 'the' when referring to a specific, known item",
    },
  ],
};

export default errorCorrectionA1;
