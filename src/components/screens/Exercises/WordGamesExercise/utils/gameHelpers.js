/**
 * Fonctions utilitaires pour les jeux de mots
 */

/**
 * Mélange un tableau de manière aléatoire (algorithme de Fisher-Yates)
 * @param {Array} array - Le tableau à mélanger
 * @returns {Array} - Un nouveau tableau mélangé
 */
export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  /**
   * Vérifie si deux indices sont adjacents dans une grille
   * @param {number} index1 - Premier indice
   * @param {number} index2 - Deuxième indice
   * @param {number} gridWidth - Largeur de la grille
   * @returns {boolean} - Vrai si les indices sont adjacents
   */
  export const isAdjacent = (index1, index2, gridWidth) => {
    const row1 = Math.floor(index1 / gridWidth);
    const col1 = index1 % gridWidth;
    const row2 = Math.floor(index2 / gridWidth);
    const col2 = index2 % gridWidth;
  
    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
  };
  
  /**
   * Calcule le pourcentage de complétion
   * @param {number} completed - Nombre d'éléments complétés
   * @param {number} total - Nombre total d'éléments
   * @returns {number} - Pourcentage de complétion (0-100)
   */
  export const calculatePercentage = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };
  
  /**
   * Transforme un tableau de lettres en mot
   * @param {Array} letterItems - Tableau d'objets contenant les lettres
   * @returns {string} - Mot formé
   */
  export const lettersToWord = (letterItems) => {
    return letterItems.map(item => item.value).join("");
  };
  
  /**
   * Retourne un message de réussite en fonction du pourcentage obtenu
   * @param {number} percentage - Pourcentage de réussite (0-100)
   * @returns {string} - Message personnalisé
   */
  export const getSuccessMessage = (percentage) => {
    if (percentage >= 90) return "Excellent! Your word skills are outstanding!";
    if (percentage >= 75) return "Great job! You have solid word skills.";
    if (percentage >= 60) return "Good work! Keep practicing to improve further.";
    if (percentage >= 40) return "Nice effort! Regular practice will help you improve.";
    return "Keep working on your word skills. Practice makes perfect!";
  };