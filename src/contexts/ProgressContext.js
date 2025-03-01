// src/contexts/ProgressContext.js
import React, { createContext, useState, useContext } from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    levels: {
      a1: { completed: 0, total: 100 },
      a2: { completed: 0, total: 100 },
      b1: { completed: 0, total: 100 },
      b2: { completed: 0, total: 100 },
      c1: { completed: 0, total: 100 },
      c2: { completed: 0, total: 100 },
    },
    exercises: {},
  });

  const updateProgress = (level, exerciseType, amount) => {
    setProgress((prev) => {
      // Mettre à jour le progrès pour ce niveau et type d'exercice
      const updated = { ...prev };
      if (!updated.exercises[level]) {
        updated.exercises[level] = {};
      }
      if (!updated.exercises[level][exerciseType]) {
        updated.exercises[level][exerciseType] = 0;
      }
      updated.exercises[level][exerciseType] += amount;

      // Mettre à jour le progrès global du niveau
      const levelProgress = Object.values(
        updated.exercises[level] || {},
      ).reduce((sum, val) => sum + val, 0);
      updated.levels[level].completed = Math.min(
        levelProgress,
        updated.levels[level].total,
      );

      return updated;
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
