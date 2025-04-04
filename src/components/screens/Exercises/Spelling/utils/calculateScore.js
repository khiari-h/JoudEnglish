/**
 * Calcule le score et le pourcentage de réussite
 * @param {number} score - Nombre de réponses correctes
 * @param {number} total - Nombre total de questions
 * @returns {Object} Objet contenant le score et le pourcentage
 */
export const calculateScore = (score, total) => {
  const percentage = Math.round((score / total) * 100);

  // Message de feedback en fonction du pourcentage
  let feedback = "";

  if (percentage >= 80) {
    feedback = "Excellent! Your spelling skills are impressive!";
  } else if (percentage >= 60) {
    feedback = "Good job! Keep practicing to improve your spelling.";
  } else {
    feedback = "Keep working on recognizing and correcting spelling mistakes.";
  }

  return {
    score,
    total,
    percentage,
    feedback,
  };
};

export default calculateScore;
