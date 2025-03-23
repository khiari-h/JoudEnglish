/**
 * Utilitaires pour la gestion des niveaux et des couleurs dans les exercices de grammaire
 */

/**
 * Détermine la couleur en fonction du niveau CECRL
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} Code couleur hexadécimal
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
   * Retourne un texte descriptif pour chaque niveau CECRL
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Niveau débutant - Les structures grammaticales de base.",
      A2: "Niveau élémentaire - Structures simples et vocabulaire quotidien.",
      B1: "Niveau intermédiaire - Concepts grammaticaux plus élaborés.",
      B2: "Niveau intermédiaire avancé - Nuances et exceptions.",
      C1: "Niveau avancé - Subtilités grammaticales et expressions idiomatiques.",
      C2: "Niveau maîtrise - Grammaire complexe et nuances stylistiques.",
    };
    return descriptions[level] || "Exercices de grammaire en anglais.";
  };
  
  /**
   * Génère une couleur légère (pour les backgrounds) à partir de la couleur du niveau
   * @param {string} levelColor - Code couleur hexadécimal du niveau
   * @param {number} opacity - Opacité (0-100)
   * @returns {string} Couleur avec opacité, format rgba ou hexa+alpha
   */
  export const getLightColorFromLevel = (levelColor, opacity = 20) => {
    // Pour une simplicité d'utilisation avec React Native, on utilise la syntaxe avec alpha
    return `${levelColor}${Math.floor(opacity * 2.55).toString(16).padStart(2, '0')}`;
  };
  
  /**
   * Détermine le niveau de difficulté d'un exercice
   * @param {string} level - Niveau de langue
   * @param {number} complexity - Complexité de l'exercice (1-5)
   * @returns {string} Texte de difficulté
   */
  export const getExerciseDifficulty = (level, complexity = 3) => {
    const baseLevel = {
      A1: "Facile",
      A2: "Élémentaire",
      B1: "Intermédiaire",
      B2: "Intermédiaire avancé",
      C1: "Avancé",
      C2: "Expert",
    }[level] || "Intermédiaire";
  
    // Ajustement en fonction de la complexité
    if (complexity <= 2) return `${baseLevel} -`;
    if (complexity >= 4) return `${baseLevel} +`;
    return baseLevel;
  };
  
  export default {
    getLevelColor,
    getLevelDescription,
    getLightColorFromLevel,
    getExerciseDifficulty,
  };