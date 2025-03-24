// Utility functions related to vocabulary levels

/**
 * Get color based on language level
 * @param {string} level - The language level (A1, A2, B1, B2, C1, C2)
 * @returns {string} Color hex code
 */
export const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };