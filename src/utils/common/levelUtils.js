export const getLevelColor = (level) => {
  const colors = {
    A1: "#3b82f6",
    A2: "#8b5cf6", 
    B1: "#10b981",
    B2: "#f59e0b",
    C1: "#ef4444",
    C2: "#6366f1"
  };
  return colors[level] || "#4361EE";
};

// ...autres fonctions de niveau...
