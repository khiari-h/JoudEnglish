import { exercises } from '../../../../../data/exercises';

/**
 * Récupère et formate les données des scénarios de chat selon le niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, etc.)
 * @returns {Array} Les scénarios de chat formatés
 */
export const getChatScenariosByLevel = (level) => {
  try {
    // Récupérer les données brutes selon le niveau
    const scenariosData = exercises.chatbot[level] || [];

    // Formater les données
    return scenariosData.map((scenario, index) => ({
      id: `chat_${level.toLowerCase()}_${index}`,
      title: scenario.title,
      description: scenario.description,
      tasks: scenario.tasks || [],
      suggestions: scenario.suggestions || [],
      vocabulary: scenario.vocabulary || {},
      introMessage: scenario.introMessage || "Let's practice conversation!",
    }));
  } catch (error) {
    console.error('Error loading chat scenarios:', error);
    return [];
  }
};
