// src/components/screens/Exercises/ErrorCorrectionExercise/utils/dataUtils.js
import errorCorrectionA1 from "../../../../../data/exercises/errorCorrection/errorCorrectionA1";
// Importer d'autres niveaux quand ils seront disponibles
// import errorCorrectionA2 from '../../../../../data/exercises/errorCorrection/errorCorrectionA2';
// import errorCorrectionB1 from '../../../../../data/exercises/errorCorrection/errorCorrectionB1';

/**
 * Récupère et formate les données de correction d'erreurs selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant ErrorCorrectionExercise
 */
export const getErrorCorrectionDataByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let errorCorrectionData;
  switch (level.toUpperCase()) {
    case "A1":
      errorCorrectionData = errorCorrectionA1;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   errorCorrectionData = errorCorrectionA2;
    //   break;
    // case 'B1':
    //   errorCorrectionData = errorCorrectionB1;
    //   break;
    default:
      errorCorrectionData = errorCorrectionA1; // Par défaut, utiliser A1
  }

  // Transformer le format des données pour correspondre à ce qu'attend le composant
  const categories = errorCorrectionData.categories.map((category) => {
    // Filtrer les exercices pour cette catégorie
    const categoryExercises = errorCorrectionData.exercises.filter(
      (exercise) => exercise.categoryId === category.id
    );

    // Transformer les exercices dans le format attendu
    const formattedExercises = categoryExercises.map((exercise) => ({
      id: `exercise_${category.id}_${exercise.type}_${categoryExercises.indexOf(
        exercise
      )}`,
      text: exercise.text,
      correctedText: exercise.correctedText,
      correctText: exercise.correctedText, // Alias pour maintenir la compatibilité
      hint: exercise.hint,
      explanation: exercise.explanation,
      type: exercise.type,
      errorIndices: exercise.errorPositions, // Renommer pour compatibilité
      errorPositions: exercise.errorPositions,
      choices: exercise.choices || [],
      correctChoiceIndex: exercise.correctChoiceIndex,
    }));

    return {
      id: `category_${category.id}`,
      title: category.name,
      description: category.description,
      exercises: formattedExercises,
    };
  });

  // Conseils pour la correction d'erreurs
  const tips = [
    "Read the entire sentence carefully before attempting to correct it.",
    "Look for common errors like subject-verb agreement, article usage, and verb tenses.",
    "After making corrections, read the sentence again to make sure it sounds natural.",
    "Remember that some sentences may have more than one error.",
    "Pay attention to singular/plural agreement and pronoun usage.",
  ];

  return {
    categories,
    tips,
    level,
  };
};

/**
 * Récupère tous les exercices d'une catégorie spécifique
 * @param {string} categoryId - L'ID de la catégorie
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des exercices pour cette catégorie
 */
export const getExercisesByCategory = (categoryId, level) => {
  const { categories } = getErrorCorrectionDataByLevel(level);
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.exercises : [];
};

/**
 * Récupère un exercice spécifique par son ID
 * @param {string} exerciseId - L'ID de l'exercice
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} L'exercice correspondant ou null
 */
export const getExerciseById = (exerciseId, level) => {
  const { categories } = getErrorCorrectionDataByLevel(level);

  for (const category of categories) {
    const exercise = category.exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      return { ...exercise, categoryId: category.id };
    }
  }

  return null;
};
