// data/exercises/spelling/spellingA1.js
export default {
  title: "A1 Spelling Exercises",
  description: "Basic spelling exercises for A1 level",
  exercises: [
    {
      type: "dictation",
      instruction: "Listen and spell the word",
      correctSpelling: "hello",
      hasHint: true,
      explanation: "This is a common greeting.",
    },
    {
      type: "dictation",
      instruction: "Listen and spell the word",
      correctSpelling: "friend",
      hasHint: true,
      explanation: "'Friend' is someone you like and trust.",
    },
    {
      type: "correction",
      instruction: "Correct the spelling mistake",
      wordToCorrect: "hapy",
      correctSpelling: "happy",
      errorCount: 1,
      hasHint: true,
      explanation: "The word 'happy' has a double 'p'.",
    },
    {
      type: "correction",
      instruction: "Correct the spelling mistake",
      wordToCorrect: "hous",
      correctSpelling: "house",
      errorCount: 1,
      hasHint: true,
      explanation: "The word 'house' ends with an 'e'.",
    },
    {
      type: "dictation",
      instruction: "Listen and spell the word",
      correctSpelling: "school",
      hasHint: true,
      explanation: "A place where you learn.",
    },
  ],
};
