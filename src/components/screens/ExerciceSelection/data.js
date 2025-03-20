// ExerciseSelection/data.js

// Définir la couleur en fonction du niveau
export const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };
  
  // Fonction pour générer la liste des exercices avec la couleur du niveau
  export const getExercises = (levelColor) => [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: "Learn new words and phrases",
      progress: 25,
      color: levelColor,
      icon: "📚",
    },
    {
      id: "grammar",
      title: "Grammar",
      description: "Practice grammar rules and structures",
      progress: 10,
      color: levelColor,
      icon: "📝",
    },
    {
      id: "chatbot",
      title: "Chatbot Writing",
      description: "Practice writing through simulated dialogues",
      progress: 0,
      color: levelColor,
      icon: "💬",
    },
    {
      id: "reading",
      title: "Reading",
      description: "Improve your reading comprehension",
      progress: 0,
      color: levelColor,
      icon: "📖",
    },
    {
      id: "error_correction",
      title: "Error Correction",
      description: "Identify and correct errors in texts",
      progress: 0,
      color: levelColor,
      icon: "✏️",
    },
    {
      id: "word_games",
      title: "Word Games",
      description: "Fun games based on vocabulary and grammar",
      progress: 0,
      color: levelColor,
      icon: "🎮",
    },
    {
      id: "phrases",
      title: "Phrases & Expressions",
      description: "Learn useful formulations in written context",
      progress: 0,
      color: levelColor,
      icon: "🗣️",
    },
    {
      id: "spelling",
      title: "Spelling Practice",
      description: "Work on spelling and punctuation",
      progress: 0,
      color: levelColor,
      icon: "🔤",
    },
    {
      id: "evaluation",
      title: "Level Assessment",
      description: "Level Test – Show what you've learned!",
      progress: 0,
      color: levelColor,
      icon: "🏆",
    },
  ];
  
  // Mapping des IDs d'exercice aux routes de navigation
  export const exerciseRoutes = {
    vocabulary: "VocabularyExercise",
    grammar: "GrammarExercise",
    chatbot: "ChatbotWriting",
    reading: "ReadingExercise",
    error_correction: "ErrorCorrectionExercise",
    word_games: "WordGamesExercise",
    phrases: "PhrasesExpressions",
    spelling: "SpellingPractice",
    evaluation: "Evaluation",
  };