import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveData, loadData } from '../utils/storage';

// Structure initiale des données
const initialProgressState = {
  // Dernière activité pour "Continue Learning"
  lastActivity: null,
  
  // Progression globale par niveau
  levelProgress: {
    "A1": 0,
    "A2": 0,
    "B1": 0,
    "B2": 0,
    "C1": 0,
    "C2": 0,
  },
  
  // Progression par type d'exercice dans chaque niveau
  exerciseTypeProgress: {
    "A1": {},
    "A2": {},
    "B1": {},
    "B2": {},
    "C1": {},
    "C2": {},
  },
  
  // Progression détaillée des exercices spécifiques
  exerciseProgress: {}
};

// Création du contexte
export const ProgressContext = createContext();

// Provider qui encapsule l'application
export const ProgressProvider = ({ children }) => {
  const [progressData, setProgressData] = useState(initialProgressState);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données au démarrage
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        const data = await loadData('progressData');
        if (data) {
          setProgressData(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading progress data:', error);
        setIsLoading(false);
      }
    };

    loadProgressData();
  }, []);

  // Sauvegarder les données à chaque changement
  useEffect(() => {
    if (!isLoading) {
      saveData('progressData', progressData);
    }
  }, [progressData, isLoading]);

  // Mettre à jour la progression d'un exercice spécifique
  const updateExerciseProgress = (exerciseId, type, level, completed, total) => {
    // Calculer le pourcentage
    const percentage = Math.round((completed / total) * 100);
    
    // Mise à jour de la dernière activité
    const lastActivity = {
      id: exerciseId,
      type,
      level,
      topic: exerciseId.split('_').slice(2).join('_').replace(/_/g, ' '),
      progress: percentage,
      date: new Date().toISOString()
    };

    // Nouvelle progression de l'exercice
    const updatedExerciseProgress = {
      ...progressData.exerciseProgress,
      [exerciseId]: {
        completed,
        total,
        lastAttempt: new Date().toISOString()
      }
    };

    // Nouvelle progression du type d'exercice
    const exerciseTypeProgressForLevel = {
      ...progressData.exerciseTypeProgress[level],
      [type]: percentage
    };

    const updatedExerciseTypeProgress = {
      ...progressData.exerciseTypeProgress,
      [level]: exerciseTypeProgressForLevel
    };

    // Calculer la progression globale du niveau
    const typeProgressValues = Object.values(exerciseTypeProgressForLevel);
    const levelPercentage = typeProgressValues.length > 0
      ? Math.round(typeProgressValues.reduce((sum, val) => sum + val, 0) / typeProgressValues.length)
      : 0;

    const updatedLevelProgress = {
      ...progressData.levelProgress,
      [level]: levelPercentage
    };

    // Mettre à jour l'état
    setProgressData({
      lastActivity,
      levelProgress: updatedLevelProgress,
      exerciseTypeProgress: updatedExerciseTypeProgress,
      exerciseProgress: updatedExerciseProgress
    });
  };

  // Valeur exposée par le contexte
  const value = {
    progressData,
    isLoading,
    updateExerciseProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};


export const useProgressContext = () => useContext(ProgressContext);