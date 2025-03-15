// src/data/assessments/levelA1Assessment.js

export default {
  level: "A1",
  description: "Test your basic English skills at the A1 level",

  vocabulary: {
    title: "Vocabulary",
    description: "Test your knowledge of basic English words",
    questions: [
      {
        text: "Which word means 'a place where you live'?",
        options: ["Car", "House", "Book", "Phone"],
        correctAnswer: 1,
        explanation: "A 'house' is a building where people live.",
      },
      {
        text: "What is this? 🍎",
        options: ["Orange", "Banana", "Apple", "Strawberry"],
        correctAnswer: 2,
        explanation:
          "This is an apple, a common fruit that is often red or green.",
      },
      {
        text: "Which word describes the color of the sky on a clear day?",
        options: ["Red", "Green", "Yellow", "Blue"],
        correctAnswer: 3,
        explanation: "The sky appears blue on a clear day.",
      },
      {
        text: "Which is a family member?",
        options: ["Teacher", "Mother", "Doctor", "Friend"],
        correctAnswer: 1,
        explanation: "A 'mother' is a female parent in a family.",
      },
      {
        text: "What do you use to write?",
        options: ["Pen", "Cup", "Chair", "Shoe"],
        correctAnswer: 0,
        explanation: "A 'pen' is a tool used for writing.",
      },
    ],
  },

  grammar: {
    title: "Grammar",
    description: "Test your understanding of basic grammar structures",
    questions: [
      {
        text: "_____ name is John.",
        options: ["I", "My", "Me", "Mine"],
        correctAnswer: 1,
        explanation: "We use 'My' as a possessive adjective before a noun.",
      },
      {
        text: "There _____ a book on the table.",
        options: ["are", "am", "is", "be"],
        correctAnswer: 2,
        explanation: "We use 'is' with singular nouns like 'a book'.",
      },
      {
        text: "I _____ coffee every morning.",
        options: ["drinking", "drink", "drinks", "drank"],
        correctAnswer: 1,
        explanation:
          "For habits in the present simple, we use the base form of the verb with 'I'.",
      },
      {
        text: "She _____ like spicy food.",
        options: ["don't", "not", "doesn't", "isn't"],
        correctAnswer: 2,
        explanation:
          "For negation in the present simple with he/she/it, we use 'doesn't'.",
      },
      {
        text: "_____ they have a car?",
        options: ["Do", "Does", "Are", "Have"],
        correctAnswer: 0,
        explanation:
          "For questions in the present simple with they/we/you, we use 'Do'.",
      },
    ],
  },

  phrases_expressions: {
    title: "Phrases & Expressions",
    description: "Test your knowledge of common expressions",
    questions: [
      {
        text: "What do you say when you meet someone for the first time?",
        options: [
          "Goodbye",
          "Hello, nice to meet you",
          "See you later",
          "I'm sorry",
        ],
        correctAnswer: 1,
        explanation:
          "When meeting someone for the first time, you typically say 'Hello, nice to meet you'.",
      },
      {
        text: "How do you ask for someone's name?",
        options: [
          "How are you?",
          "Where are you from?",
          "What's your name?",
          "How old are you?",
        ],
        correctAnswer: 2,
        explanation: "To ask for someone's name, you say 'What's your name?'",
      },
      {
        text: "What do you say to thank someone?",
        options: ["Sorry", "Please", "Excuse me", "Thank you"],
        correctAnswer: 3,
        explanation: "To express gratitude, you say 'Thank you'.",
      },
      {
        text: "How do you ask for the price of something?",
        options: [
          "How much is it?",
          "Where is it?",
          "What time is it?",
          "Who is it?",
        ],
        correctAnswer: 0,
        explanation: "To ask about price, you say 'How much is it?'",
      },
      {
        text: "What do you say when leaving?",
        options: ["Good morning", "Welcome", "Goodbye", "Excuse me"],
        correctAnswer: 2,
        explanation: "When leaving, you typically say 'Goodbye'.",
      },
    ],
  },

  error_correction: {
    title: "Error Correction",
    description: "Find the mistake in these sentences",
    questions: [
      {
        text: "Which sentence is correct?",
        options: [
          "She have three brothers.",
          "She has three brothers.",
          "She having three brothers.",
          "She haves three brothers.",
        ],
        correctAnswer: 1,
        explanation:
          "The correct form is 'She has' - third person singular in present simple.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I am student.",
          "I am a student.",
          "I a student.",
          "I the student.",
        ],
        correctAnswer: 1,
        explanation:
          "We need the indefinite article 'a' before singular countable nouns like 'student'.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "They don't likes coffee.",
          "They doesn't like coffee.",
          "They don't like coffee.",
          "They not like coffee.",
        ],
        correctAnswer: 2,
        explanation:
          "For plural subjects (they), we use 'don't like' in the negative form.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "We are go to school every day.",
          "We going to school every day.",
          "We goes to school every day.",
          "We go to school every day.",
        ],
        correctAnswer: 3,
        explanation:
          "For plural subjects (we) in present simple, we use the base form of the verb.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "There is five people in my family.",
          "There are five people in my family.",
          "There be five people in my family.",
          "There five people in my family.",
        ],
        correctAnswer: 1,
        explanation: "We use 'There are' with plural nouns like 'five people'.",
      },
    ],
  },

  spelling: {
    title: "Spelling",
    description: "Test your spelling skills",
    questions: [
      {
        text: "Which word is spelled correctly?",
        options: ["freind", "friend", "frend", "friende"],
        correctAnswer: 1,
        explanation: "The correct spelling is 'friend'.",
      },
      {
        text: "Choose the correct spelling:",
        options: ["hapy", "happie", "happy", "happey"],
        correctAnswer: 2,
        explanation: "The correct spelling is 'happy' with a double 'p'.",
      },
      {
        text: "Choose the correct spelling:",
        options: ["becuase", "because", "becaus", "becose"],
        correctAnswer: 1,
        explanation: "The correct spelling is 'because' with 'cau' not 'cua'.",
      },
      {
        text: "Choose the correct spelling:",
        options: ["beutiful", "beautiful", "beatiful", "beautyful"],
        correctAnswer: 1,
        explanation:
          "The correct spelling is 'beautiful' with 'eau' in the middle.",
      },
      {
        text: "Choose the correct spelling:",
        options: ["recieve", "receve", "receive", "reciave"],
        correctAnswer: 2,
        explanation: "The correct spelling is 'receive' with 'ei' after 'c'.",
      },
    ],
  },

  spelling_rules: {
    title: "Spelling Rules",
    description: "Test your knowledge of basic English spelling rules",
    questions: [
      {
        text: "What is the plural form of 'box'?",
        options: ["boxs", "boxes", "box", "boxies"],
        correctAnswer: 1,
        explanation:
          "Nouns ending in s, ss, sh, ch, x, or z add 'es' to form the plural: box → boxes.",
      },
      {
        text: "What is the plural form of 'baby'?",
        options: ["babys", "babyes", "babies", "babis"],
        correctAnswer: 2,
        explanation:
          "When a noun ends in 'y' after a consonant, change the 'y' to 'i' and add 'es': baby → babies.",
      },
      {
        text: "What is the correct -ing form of 'write'?",
        options: ["writeing", "writinge", "writing", "writiing"],
        correctAnswer: 2,
        explanation:
          "For verbs ending in 'e', we drop the 'e' and add 'ing': write → writing.",
      },
      {
        text: "What is the correct -ing form of 'run'?",
        options: ["runing", "running", "runeing", "runneing"],
        correctAnswer: 1,
        explanation:
          "For short verbs ending in consonant-vowel-consonant, we double the final consonant and add 'ing': run → running.",
      },
      {
        text: "Choose the correct spelling with the 'th' sound:",
        options: ["tink", "think", "sink", "fink"],
        correctAnswer: 1,
        explanation:
          "The 'th' sound is common in English and is always spelled with 'th': think, thank, this, that.",
      },
    ],
  },

  reading_comprehension: {
    title: "Reading Comprehension",
    description: "Read the text and answer questions",
    questions: [
      {
        text: "Read: 'My name is John. I am 25 years old. I live in London with my dog, Max.' How old is John?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1,
        explanation: "The text states that John is 25 years old.",
      },
      {
        text: "Read: 'I wake up at 7:00. I have breakfast at 7:30. I go to work at 8:30.' When does this person have breakfast?",
        options: ["7:00", "7:30", "8:00", "8:30"],
        correctAnswer: 1,
        explanation: "According to the text, the person has breakfast at 7:30.",
      },
      {
        text: "Read: 'The restaurant is open from Monday to Friday, 9:00 to 21:00.' Is the restaurant open on Saturday?",
        options: ["Yes", "No", "Sometimes", "It doesn't say"],
        correctAnswer: 1,
        explanation:
          "The restaurant is only open Monday to Friday, so it is not open on Saturday.",
      },
      {
        text: "Read: 'I have a sister and two brothers. My sister is 15. My brothers are 10 and 8.' How many siblings does the writer have?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 2,
        explanation:
          "The writer has three siblings: one sister and two brothers.",
      },
      {
        text: "Read: 'The weather today is cold and rainy. You need a coat and an umbrella.' What do you need today?",
        options: ["Sunglasses", "A coat and an umbrella", "A hat", "A t-shirt"],
        correctAnswer: 1,
        explanation:
          "According to the text, you need a coat and an umbrella because it's cold and rainy.",
      },
    ],
  },
};
