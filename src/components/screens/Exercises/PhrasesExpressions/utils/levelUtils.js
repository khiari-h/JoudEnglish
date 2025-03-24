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
    return colors[level] || "#3b82f6"; // Bleu clair par défaut
  };
  
  /**
   * Renvoie une description du niveau
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} - Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Phrases et expressions de base pour la communication quotidienne",
      A2: "Expressions courantes pour des situations habituelles",
      B1: "Expressions courantes et idiomatiques pour une communication fluide",
      B2: "Expressions variées permettant de s'exprimer spontanément",
      C1: "Expressions idiomatiques et nuancées pour une communication précise",
      C2: "Maîtrise des expressions subtiles et des nuances culturelles",
    };
    return descriptions[level] || "Phrases et expressions en anglais";
  };
  
  export default {
    getLevelColor,
    getLevelDescription,
  };