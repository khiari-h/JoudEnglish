/**
 * Utilitaire pour la gestion des niveaux et couleurs
 */

/**
 * Obtient la couleur correspondante à un niveau de langue
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} - Le code hexadécimal de la couleur
 */
export const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6", // Bleu
      A2: "#8b5cf6", // Violet
      B1: "#10b981", // Vert
      B2: "#f59e0b", // Orange
      C1: "#ef4444", // Rouge
      C2: "#6366f1", // Indigo
    };
    return colors[level] || "#4361EE"; // Couleur par défaut
  };
  
  /**
   * Retourne la description du niveau
   * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} - Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Beginner",
      A2: "Elementary",
      B1: "Intermediate",
      B2: "Upper Intermediate",
      C1: "Advanced",
      C2: "Proficient",
    };
    return descriptions[level] || "Unknown Level";
  };