// src/components/screens/Exercises/GrammarExercise/utils/dataUtils.js
import grammarA1 from "../../../../../data/exercises/grammar/grammarA1";
// Importez d'autres niveaux si nécessaire
// import grammarA2 from '../../../../../data/exercises/grammar/grammarA2';
// import grammarB1 from '../../../../../data/exercises/grammar/grammarB1';

/**
 * Récupère les données brutes de grammaire selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Array} Données brutes de grammaire
 */
export const getRawGrammarData = (level) => {
  // Sélectionner les données du bon niveau
  switch (level.toUpperCase()) {
    case "A1":
      return grammarA1;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   return grammarA2;
    // case 'B1':
    //   return grammarB1;
    default:
      return grammarA1; // Par défaut, utiliser A1
  }
};

/**
 * Formate les données grammaticales pour l'application
 * @param {Array} rawData - Données brutes de grammaire
 * @returns {Array} Catégories grammaticales formatées
 */
export const formatGrammarCategories = (rawData) => {
  return rawData.map((rule) => ({
    id: `grammar_${rule.id}`,
    title: rule.title,
    explanation: rule.explanation,
    examples: rule.examples,
    rules: rule.rules,
    exercises: rule.exercises.map((exercise, index) => ({
      id: `ex_${rule.id}_${index}`,
      type: exercise.type,
      question: exercise.question,
      answer: exercise.answer,
      options: exercise.options || [],
      pairs: exercise.pairs || [],
    })),
  }));
};

/**
 * Conseils généraux pour l'étude de la grammaire
 */
export const grammarTips = [
  "Comprendre les règles est important, mais la pratique est essentielle.",
  "Essayez de créer vos propres exemples pour chaque règle grammaticale.",
  "Faites attention aux exceptions dans les règles.",
  "Révisez régulièrement les règles que vous avez déjà apprises.",
  "Utilisez la grammaire dans des contextes réels (conversations, écriture).",
];

/**
 * Récupère et formate les données grammaticales selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant GrammarExercise
 */
export const getGrammarDataByLevel = (level) => {
  const rawData = getRawGrammarData(level);
  const categories = formatGrammarCategories(rawData);

  return {
    categories,
    tips: grammarTips,
    level,
  };
};

/**
 * Récupère un exercice spécifique par son ID
 * @param {string} exerciseId - L'ID de l'exercice à récupérer
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} L'exercice correspondant ou null
 */
export const getExerciseById = (exerciseId, level) => {
  const { categories } = getGrammarDataByLevel(level);

  for (const category of categories) {
    const exercise = category.exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      return {
        ...exercise,
        categoryId: category.id,
        categoryTitle: category.title,
      };
    }
  }

  return null;
};

/**
 * Récupère une catégorie grammaticale par son ID
 * @param {string} categoryId - L'ID de la catégorie à récupérer
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} La catégorie correspondante ou null
 */
export const getCategoryById = (categoryId, level) => {
  const { categories } = getGrammarDataByLevel(level);
  return categories.find((category) => category.id === categoryId) || null;
};