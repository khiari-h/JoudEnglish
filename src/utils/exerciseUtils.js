import { exercises } from '../data/exercises';

export const calculateProgress = (completed, total) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};

export const getFeedbackMessage = (percentage) => {
  if (percentage >= 90) return "Excellent!";
  if (percentage >= 70) return "Good job!";
  if (percentage >= 50) return "Keep practicing!";
  return "You can do better!";
};
