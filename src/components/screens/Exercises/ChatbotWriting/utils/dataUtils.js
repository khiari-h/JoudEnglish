// src/components/screens/Exercises/ChatbotExercise/utils/dataUtils.js
import chatbotA1Data from "../../../../../data/exercises/chatbot/chatbotA1Data";
// Importez d'autres niveaux si nécessaire
// import chatbotA2Data from '../../../../../data/exercises/chatbot/chatbotA2Data';
// import chatbotB1Data from '../../../../../data/exercises/chatbot/chatbotB1Data';

/**
 * Récupère et formate les données de scenarios de chat selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Object} Données formatées pour le composant ChatbotExercise
 */
export const getChatbotDataByLevel = (level) => {
  // Sélectionner les données du bon niveau
  let chatbotData;
  switch (level.toUpperCase()) {
    case "A1":
      chatbotData = chatbotA1Data;
      break;
    // Ajouter d'autres niveaux quand ils seront disponibles
    // case 'A2':
    //   chatbotData = chatbotA2Data;
    //   break;
    // case 'B1':
    //   chatbotData = chatbotB1Data;
    //   break;
    default:
      chatbotData = chatbotA1Data; // Par défaut, utiliser A1
  }

  // Transformer le format si nécessaire
  // Le format existant semble déjà bien structuré pour l'utilisation directe
  const scenarios = chatbotData.exercises.map((exercise) => ({
    id: exercise.title.toLowerCase().replace(/\s+/g, "_"),
    title: exercise.title,
    description: exercise.description,
    steps: exercise.steps.map((step, index) => ({
      id: `step_${index + 1}`,
      botMessage: step.botMessage,
      suggestions: step.suggestions,
      help: step.help,
    })),
  }));

  // Ajouter des conseils généraux pour l'utilisation du chatbot
  const tips = [
    "Lisez attentivement le message du bot avant de répondre.",
    "Utilisez les suggestions si vous n'êtes pas sûr(e) de comment répondre.",
    "Essayez de formuler votre propre réponse pour un meilleur apprentissage.",
    "N'hésitez pas à utiliser l'aide si vous êtes bloqué(e).",
    "Pratiquez chaque scénario plusieurs fois pour améliorer votre fluidité.",
  ];

  return {
    scenarios,
    tips,
    level,
  };
};
