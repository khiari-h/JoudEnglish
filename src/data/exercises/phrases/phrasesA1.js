// src/data/exercises/phrases/phrasesA1.js
const phrasesA1 = {
  categories: [
    { id: 1, name: "Salutations" },
    { id: 2, name: "Présentations" },
    { id: 3, name: "Vie Quotidienne" },
    { id: 4, name: "Émotions" },
    { id: 5, name: "Voyages" },
  ],
  phrases: [
    // Salutations
    {
      categoryId: 1,
      english: "Hello, how are you?",
      translation: "Bonjour, comment allez-vous ?",
      context: "Formelle salutation utilisée dans différents contextes",
      examples: [
        {
          english: "Hi, nice to meet you!",
          translation: "Salut, ravi(e) de vous rencontrer !",
        },
        {
          english: "Good morning!",
          translation: "Bonjour !",
        },
      ],
      notes: "Utilisez 'Hello' ou 'Hi' selon le niveau de formalité",
    },
    {
      categoryId: 1,
      english: "Good evening!",
      translation: "Bonsoir !",
      context: "Salutation du soir",
      examples: [
        {
          english: "Have a good night!",
          translation: "Passez une bonne nuit !",
        },
      ],
    },

    // Présentations
    {
      categoryId: 2,
      english: "My name is John.",
      translation: "Je m'appelle John.",
      context: "Se présenter formellement",
      examples: [
        {
          english: "Nice to meet you!",
          translation: "Ravi(e) de vous rencontrer !",
        },
      ],
    },
    {
      categoryId: 2,
      english: "I am from France.",
      translation: "Je viens de France.",
      context: "Indiquer son pays d'origine",
      examples: [
        {
          english: "Where are you from?",
          translation: "D'où venez-vous ?",
        },
      ],
    },

    // Vie Quotidienne
    {
      categoryId: 3,
      english: "What time is it?",
      translation: "Quelle heure est-il ?",
      context: "Demander l'heure",
      examples: [
        {
          english: "It's 3 o'clock.",
          translation: "Il est 3 heures.",
        },
      ],
    },
    {
      categoryId: 3,
      english: "I would like a coffee, please.",
      translation: "Je voudrais un café, s'il vous plaît.",
      context: "Commander dans un café",
      examples: [
        {
          english: "Can I have a tea?",
          translation: "Puis-je avoir un thé ?",
        },
      ],
    },

    // Émotions
    {
      categoryId: 4,
      english: "I am happy.",
      translation: "Je suis heureux/heureuse.",
      context: "Exprimer son état émotionnel",
      examples: [
        {
          english: "I feel great today!",
          translation: "Je me sens super aujourd'hui !",
        },
      ],
    },
    {
      categoryId: 4,
      english: "I am tired.",
      translation: "Je suis fatigué(e).",
      context: "Exprimer sa fatigue",
      examples: [
        {
          english: "I need to rest.",
          translation: "J'ai besoin de me reposer.",
        },
      ],
    },

    // Voyages
    {
      categoryId: 5,
      english: "Where is the train station?",
      translation: "Où est la gare ?",
      context: "Demander son chemin",
      examples: [
        {
          english: "Can you help me?",
          translation: "Pouvez-vous m'aider ?",
        },
      ],
    },
    {
      categoryId: 5,
      english: "I want to buy a ticket.",
      translation: "Je veux acheter un billet.",
      context: "Acheter un billet de transport",
      examples: [
        {
          english: "One ticket, please.",
          translation: "Un billet, s'il vous plaît.",
        },
      ],
    },
  ],
};

export default phrasesA1;
