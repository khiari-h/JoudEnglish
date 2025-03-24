/**
 * Utilitaires pour la gestion des niveaux dans l'application
 */

/**
 * Renvoie la couleur correspondant à un niveau CECRL
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} - Code couleur hexadécimal
 */
export const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6", // Bleu clair
      A2: "#8b5cf6", // Violet
      B1: "#10b981", // Vert
      B2: "#f59e0b", // Orange
      C1: "#ef4444", // Rouge
      C2: "#6366f1", // Indigo
    };
    return colors[level] || "#4361EE"; // Couleur par défaut
  };
  
  /**
   * Renvoie une description du niveau
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} - Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Débutant - Expressions familières, besoins concrets",
      A2: "Élémentaire - Situations courantes, communication simple",
      B1: "Intermédiaire - Autonomie, sujets familiers",
      B2: "Intermédiaire supérieur - Communication aisée, sujets complexes",
      C1: "Avancé - Communication efficace, nuances",
      C2: "Maîtrise - Compréhension sans effort, expression précise",
    };
    return descriptions[level] || "Niveau d'anglais";
  };
  
  /**
   * Renvoie des informations sur l'évaluation en fonction du niveau
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {Object} - Informations sur l'évaluation
   */
  export const getAssessmentInfo = (level) => {
    return {
      A1: {
        questionCount: 40,
        estimatedTime: "20-30 minutes",
        difficulty: "Débutant",
      },
      A2: {
        questionCount: 45,
        estimatedTime: "25-35 minutes",
        difficulty: "Élémentaire",
      },
      B1: {
        questionCount: 50,
        estimatedTime: "30-40 minutes",
        difficulty: "Intermédiaire",
      },
      B2: {
        questionCount: 55,
        estimatedTime: "40-50 minutes",
        difficulty: "Intermédiaire supérieur",
      },
      C1: {
        questionCount: 60,
        estimatedTime: "45-60 minutes",
        difficulty: "Avancé",
      },
      C2: {
        questionCount: 65,
        estimatedTime: "50-70 minutes",
        difficulty: "Expert",
      },
    }[level] || {
      questionCount: 40,
      estimatedTime: "30 minutes",
      difficulty: "Variable",
    };
  };
  
  export default {
    getLevelColor,
    getLevelDescription,
    getAssessmentInfo,
  };