import React, { createContext, useContext, useCallback, useMemo } from 'react';
import theme from '../styles/theme';
import { useExerciseStore } from '../stores/exerciseStore';
import { useAnimations } from '../hooks/useAnimations';
import { useExerciseNavigation } from '../hooks/useExerciseNavigation';

const ExerciseContext = createContext({});

export const ExerciseProvider = ({ children }) => {
  const store = useExerciseStore();
  const animations = useAnimations();

  const handleError = useCallback((error) => {
    Alert.alert(
      'Error',
      error.message || 'An unexpected error occurred',
      [{ text: 'OK' }]
    );
  }, []);

  const getLevelColor = useCallback((level) => {
    const colors = {
      A1: theme.colors.success.main,
      A2: theme.colors.primary.main,
      B1: theme.colors.secondary,
      B2: theme.colors.accent,
      C1: theme.colors.error.main,
      C2: theme.colors.challenge.badgeText,
    };
    return colors[level] || theme.colors.primary.main;
  }, []);

  const value = useMemo(() => ({
    ...store,
    ...animations,
    handleError,
    getLevelColor,
  }), [store, animations, handleError, getLevelColor]);

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => useContext(ExerciseContext);
