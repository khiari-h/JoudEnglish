// src/data/exercises/wordGames/wordGamesA1.js

export default {
  level: "A1",
  description: "Basic vocabulary exercises for beginners",
  games: [
    // Anagram games
    {
      type: "anagram",
      title: "Food Words Anagram",
      instructions: "Rearrange the letters to form a food word.",
      word: "apple",
      hint: "A common fruit that's red or green",
      successMessage: "Great job! 'Apple' is correct!",
      timeLimit: 60,
      maxScore: 10,
    },
    {
      type: "anagram",
      title: "Animal Words Anagram",
      instructions: "Rearrange the letters to form an animal name.",
      word: "cat",
      hint: "A popular pet that purrs",
      successMessage: "Excellent! 'Cat' is correct!",
      maxScore: 10,
    },

    // Matching games
    {
      type: "matching",
      title: "Match Objects with Colors",
      instructions: "Match each object with its typical color.",
      pairs: [
        { word: "Banana", match: "Yellow" },
        { word: "Sky", match: "Blue" },
        { word: "Grass", match: "Green" },
        { word: "Tomato", match: "Red" },
      ],
      hint: "Think about the natural colors of these objects",
      maxScore: 10,
    },
    {
      type: "matching",
      title: "Match Words with Pictures",
      instructions: "Match each English word with its meaning.",
      pairs: [
        { word: "House", match: "Home" },
        { word: "Car", match: "Vehicle" },
        { word: "Dog", match: "Pet" },
        { word: "Book", match: "Reading" },
      ],
      maxScore: 10,
    },

    // Word search games
    {
      type: "word_search",
      title: "Simple Word Search",
      instructions:
        "Find the hidden words in the grid. Words can be horizontal or vertical.",
      grid: [
        ["D", "O", "G", "P", "S"],
        ["C", "A", "T", "I", "K"],
        ["F", "L", "B", "G", "Y"],
        ["H", "O", "U", "S", "E"],
        ["J", "V", "S", "U", "N"],
      ],
      words: ["dog", "cat", "pig", "house", "sun"],
      timeLimit: 120,
      maxScore: 15,
    },

    // Categorization games
    {
      type: "categorization",
      title: "Food Categories",
      instructions: "Select all words that belong to the given category.",
      categories: {
        Fruits: ["apple", "banana", "orange", "grape"],
        Animals: ["dog", "cat", "bird", "fish"],
        Colors: ["red", "blue", "green", "yellow"],
      },
      currentCategory: "Fruits",
      words: [
        "apple",
        "banana",
        "dog",
        "red",
        "orange",
        "house",
        "grape",
        "car",
      ],
      maxScore: 10,
    },

    // Another anagram for variety
    {
      type: "anagram",
      title: "Simple Object Anagram",
      instructions: "Rearrange the letters to form an object word.",
      word: "book",
      hint: "You read this",
      successMessage: "Correct! 'Book' is the answer!",
      maxScore: 10,
    },

    // Another matching exercise
    {
      type: "matching",
      title: "Match Numbers",
      instructions: "Match each number with its written form.",
      pairs: [
        { word: "1", match: "One" },
        { word: "2", match: "Two" },
        { word: "3", match: "Three" },
        { word: "4", match: "Four" },
      ],
      maxScore: 10,
    },
  ],
};
