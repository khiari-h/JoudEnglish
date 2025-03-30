/**
 * Retourne une couleur correspondant au niveau de langue
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} - Code couleur hexadécimal
 */
const getLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'A1':
        return '#4ade80'; // Vert clair
      case 'A2':
        return '#22c55e'; // Vert
      case 'B1':
        return '#3b82f6'; // Bleu
      case 'B2':
        return '#1d4ed8'; // Bleu foncé
      case 'C1':
        return '#8b5cf6'; // Violet
      case 'C2':
        return '#6d28d9'; // Violet foncé
      default:
        return '#64748b'; // Gris par défaut
    }
  };
  
  export default getLevelColor;