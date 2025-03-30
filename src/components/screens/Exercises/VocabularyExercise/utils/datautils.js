// src/components/screens/Exercises/VocabularyExercise/utils/dataUtils.js
import vocabularyA1 from "../../../../../data/exercises/vocabulary/vocabularyA1";
// Importez d'autres niveaux si nécessaire
// import vocabularyA2 from '../../../../../data/exercises/vocabulary/vocabularyA2';
// import vocabularyB1 from '../../../../../data/exercises/vocabulary/vocabularyB1';

/**
 * Transforme les données du format d'origine vers le format attendu par le composant VocabularyExercise
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données de vocabulaire formatées pour le composant
 */
export const getVocabularyDataByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let vocabularyData;
  switch (level.toUpperCase()) {
    case "A1":
      vocabularyData = vocabularyA1;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   vocabularyData = vocabularyA2;
    //   break;
    // case 'B1':
    //   vocabularyData = vocabularyB1;
    //   break;
    default:
      vocabularyData = vocabularyA1; // Par défaut, utiliser A1
  }

  // Transformer le format
  const categories = vocabularyData.exercises.map((exercise) => ({
    id: exercise.id,
    title: exercise.title,
    words: exercise.words.map((word) => ({
      word: word.word,
      translation: word.translation,
      example: word.example,
      definition: word.definition,
      // Vous pouvez ajouter d'autres propriétés au besoin
    })),
  }));

  // Ajouter des conseils pour l'apprentissage du vocabulaire
  const tips = [
    "Essayez d'utiliser les nouveaux mots dans des phrases pour mieux les retenir.",
    "Associez les mots à des images mentales pour améliorer la mémorisation.",
    "Révisez régulièrement les mots que vous avez appris.",
    "Groupez les mots par thème ou par famille pour mieux les organiser.",
    "Pratiquez la prononciation à voix haute.",
    "Utilisez des cartes-mémoire (flashcards) pour réviser.",
    "Écrivez les mots plusieurs fois pour les mémoriser.",
    "Essayez d'apprendre les mots dans leur contexte plutôt qu'isolément.",
  ];

  return {
    categories,
    tips,
  };
};
