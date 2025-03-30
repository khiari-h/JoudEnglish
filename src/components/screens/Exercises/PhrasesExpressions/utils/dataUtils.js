// src/components/screens/Exercises/PhrasesExercise/utils/dataUtils.js
import phrasesA1 from "../../../../../data/exercises/phrases/phrasesA1";
// Importer d'autres niveaux quand ils seront disponibles
// import phrasesA2 from '../../../../../data/exercises/phrases/phrasesA2';
// import phrasesB1 from '../../../../../data/exercises/phrases/phrasesB1';

/**
 * Récupère et formate les données de phrases selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant PhrasesExercise
 */
export const getPhrasesByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let phrasesData;
  switch (level.toUpperCase()) {
    case "A1":
      phrasesData = phrasesA1;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   phrasesData = phrasesA2;
    //   break;
    // case 'B1':
    //   phrasesData = phrasesB1;
    //   break;
    default:
      phrasesData = phrasesA1; // Par défaut, utiliser A1
  }

  // Transformer le format des données pour correspondre à ce qu'attend le composant
  const categories = phrasesData.categories.map((category) => {
    // Filtrer les phrases pour cette catégorie
    const categoryPhrases = phrasesData.phrases.filter(
      (phrase) => phrase.categoryId === category.id
    );

    // Transformer les phrases dans le format attendu
    const formattedPhrases = categoryPhrases.map((phrase) => ({
      id: `phrase_${category.id}_${categoryPhrases.indexOf(phrase)}`,
      phrase: phrase.english,
      translation: phrase.translation,
      context: phrase.context || "",
      examples: phrase.examples || [],
      notes: phrase.notes || "",
    }));

    return {
      id: `category_${category.id}`,
      title: category.name,
      phrases: formattedPhrases,
    };
  });

  // Conseils pour l'apprentissage des phrases
  const tips = [
    "Répétez chaque phrase à haute voix pour améliorer votre prononciation.",
    "Essayez d'utiliser ces phrases dans des conversations réelles.",
    "Mémorisez les phrases par catégorie pour faciliter leur rappel.",
    "Pratiquez avec un partenaire linguistique si possible.",
    "Écoutez comment les natifs utilisent ces expressions.",
  ];

  return {
    categories,
    tips,
    level,
  };
};

/**
 * Récupère toutes les phrases d'une catégorie spécifique
 * @param {string} categoryId - L'ID de la catégorie
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des phrases pour cette catégorie
 */
export const getPhrasesByCategory = (categoryId, level) => {
  const { categories } = getPhrasesByLevel(level);
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.phrases : [];
};

/**
 * Récupère une phrase spécifique par son ID
 * @param {string} phraseId - L'ID de la phrase
 * @param {string} level - Le niveau de langue
 * @returns {Object|null} La phrase correspondante ou null
 */
export const getPhraseById = (phraseId, level) => {
  const { categories } = getPhrasesByLevel(level);

  for (const category of categories) {
    const phrase = category.phrases.find((p) => p.id === phraseId);
    if (phrase) {
      return {
        ...phrase,
        categoryId: category.id,
        categoryTitle: category.title,
      };
    }
  }

  return null;
};

/**
 * Recherche des phrases par mot-clé
 * @param {string} keyword - Le mot-clé à rechercher
 * @param {string} level - Le niveau de langue
 * @returns {Array} Liste des phrases correspondant à la recherche
 */
export const searchPhrases = (keyword, level) => {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const { categories } = getPhrasesByLevel(level);
  const results = [];

  categories.forEach((category) => {
    category.phrases.forEach((phrase) => {
      if (
        phrase.phrase.toLowerCase().includes(keyword.toLowerCase()) ||
        phrase.translation.toLowerCase().includes(keyword.toLowerCase()) ||
        phrase.context.toLowerCase().includes(keyword.toLowerCase())
      ) {
        results.push({
          ...phrase,
          categoryId: category.id,
          categoryTitle: category.title,
        });
      }
    });
  });

  return results;
};
