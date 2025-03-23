/**
 * Utilitaires pour la gestion des niveaux et des couleurs dans l'application
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
    return colors[level] || "#4361EE"; // Couleur par défaut
  };
  
  /**
   * Retourne un texte descriptif pour chaque niveau CECRL
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} Description du niveau
   */
  export const getLevelDescription = (level) => {
    const descriptions = {
      A1: "Niveau débutant - Les erreurs les plus basiques et communes.",
      A2: "Niveau élémentaire - Erreurs fréquentes dans les constructions simples.",
      B1: "Niveau intermédiaire - Erreurs typiques dans les expressions courantes.",
      B2: "Niveau intermédiaire avancé - Erreurs liées aux constructions complexes.",
      C1: "Niveau avancé - Erreurs subtiles et nuances de langage.",
      C2: "Niveau maîtrise - Subtilités avancées et erreurs rares.",
    };
    return descriptions[level] || "Exercices d'identification et correction d'erreurs.";
  };
  
  /**
   * Retourne la difficulté en texte selon le niveau
   * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
   * @returns {string} Texte de difficulté
   */
  export const getLevelDifficulty = (level) => {
    const difficulties = {
      A1: "Facile",
      A2: "Élémentaire",
      B1: "Intermédiaire",
      B2: "Intermédiaire avancé",
      C1: "Avancé",
      C2: "Expert",
    };
    return difficulties[level] || "Tous niveaux";
  };
  
  /**
   * Génère une couleur légère (pour les backgrounds) à partir de la couleur du niveau
   * @param {string} levelColor - Code couleur hexadécimal du niveau
   * @param {number} opacity - Opacité (0-100)
   * @returns {string} Couleur avec opacité, format rgba ou hexa+alpha selon le besoin
   */
  export const getLightColorFromLevel = (levelColor, opacity = 20) => {
    // Pour une simplicité d'utilisation avec React Native, on utilise la syntaxe avec alpha
    return `${levelColor}${Math.floor(opacity * 2.55).toString(16).padStart(2, '0')}`;
  };
  
  export default {
    getLevelColor,
    getLevelDescription,
    getLevelDifficulty,
    getLightColorFromLevel,
  };