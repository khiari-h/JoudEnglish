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
   * Renvoie une description du niveau de lecture
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} - Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Textes très courts et simples sur des sujets familiers",
      A2: "Textes courts et simples avec vocabulaire courant",
      B1: "Textes clairs sur des sujets familiers ou professionnels",
      B2: "Textes complexes et abstraits, articles spécialisés",
      C1: "Textes longs et exigeants, littérature",
      C2: "Textes complexes avec nuances de sens, style spécialisé",
    };
    return descriptions[level] || "Exercices de lecture en anglais";
  };
  
  /**
   * Génère une couleur avec opacité
   * @param {string} color - Couleur hex
   * @param {number} opacity - Valeur d'opacité (0-100)
   * @returns {string} - Couleur avec opacité
   */
  export const withOpacity = (color, opacity) => {
    // Pour une simplicité d'utilisation avec React Native, on utilise la syntaxe avec alpha
    return `${color}${Math.floor(opacity * 2.55).toString(16).padStart(2, '0')}`;
  };
  
  export default {
    getLevelColor,
    getLevelDescription,
    withOpacity,
  };