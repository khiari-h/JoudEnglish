import { useState, useEffect } from "react";

// Import dynamique des données en fonction du niveau
import chatbotA1Data from "../../../../../data/exercises/chatbot/chatbotA1";
import chatbotA2Data from "../../../../../data/exercises/chatbot/chatbotA2";
import chatbotB1Data from "../../../../../data/exercises/chatbot/chatbotB1";
import chatbotB2Data from "../../../../../data/exercises/chatbot/chatbotB2";
import chatbotC1Data from "../../../../../data/exercises/chatbot/chatbotC1";
import chatbotC2Data from "../../../../../data/exercises/chatbot/chatbotC2";

/**
 * Hook personnalisé pour charger et gérer les données des scénarios
 * @param {string} level - Le niveau de difficulté (A1, A2, B1, etc.)
 * @returns {Object} - Les données des scénarios et fonctions utilitaires
 */
const useScenarioData = (level) => {
  const [allScenarios, setAllScenarios] = useState([]);

  /**
   * Détermine la couleur en fonction du niveau
   * @param {string} levelCode - Code du niveau (A1, A2, etc.)
   * @returns {string} - Code couleur hexadécimal
   */
  const getLevelColor = (levelCode) => {
    const colors = {
      A1: "#3b82f6", // Bleu
      A2: "#8b5cf6", // Violet
      B1: "#10b981", // Vert
      B2: "#f59e0b", // Orange
      C1: "#ef4444", // Rouge
      C2: "#6366f1", // Indigo
    };
    return colors[levelCode] || "#4361EE"; // Couleur par défaut
  };

  /**
   * Fonction pour obtenir les données en fonction du niveau
   * @param {string} levelCode - Code du niveau (A1, A2, etc.)
   * @returns {Object} - Données d'exercice pour le niveau spécifié
   */
  const getChatbotData = (levelCode) => {
    const dataMap = {
      A1: chatbotA1Data,
      A2: chatbotA2Data,
      B1: chatbotB1Data,
      B2: chatbotB2Data,
      C1: chatbotC1Data,
      C2: chatbotC2Data,
    };
    
    // Vérifier si les données pour ce niveau existent et ont la structure attendue
    const levelData = dataMap[levelCode];
    if (levelData && levelData.exercises && levelData.exercises.length > 0) {
      return levelData;
    } else {
      // Si les données sont vides ou mal structurées, utiliser A1 comme fallback
      console.warn(`Données manquantes pour le niveau ${levelCode}, utilisation des données A1 à la place`);
      return chatbotA1Data;
    }
  };

  // Initialiser avec les données appropriées en fonction du niveau
  useEffect(() => {
    const exerciseData = getChatbotData(level);

    // Définir tous les scénarios disponibles
    if (exerciseData && exerciseData.exercises && exerciseData.exercises.length > 0) {
      setAllScenarios(exerciseData.exercises);
    } else {
      // Gérer le cas où les données n'ont pas la structure attendue
      console.warn(`Données incorrectes pour le niveau ${level}`);
      setAllScenarios([]);
    }
  }, [level]);

  return {
    allScenarios,
    getLevelColor,
    getChatbotData,
  };
};

export default useScenarioData;