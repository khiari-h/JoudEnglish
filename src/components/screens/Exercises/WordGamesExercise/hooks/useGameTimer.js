import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook pour gérer le minuteur des jeux
 * @param {Function} onTimeUp - Fonction à exécuter quand le temps est écoulé
 * @returns {Object} - État et fonctions du minuteur
 */
const useGameTimer = (onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Nettoyer le timer quand le composant est démonté
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Gestion du timer
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      if (onTimeUp) {
        onTimeUp();
      }
    }
  }, [isActive, timeLeft, onTimeUp]);

  /**
   * Démarre le timer avec une durée spécifiée
   * @param {number} duration - Durée en secondes
   */
  const startTimer = useCallback((duration) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeLeft(duration);
    setIsActive(true);
  }, []);

  /**
   * Arrête le timer
   */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsActive(false);
  }, []);

  /**
   * Réinitialise le timer
   */
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeLeft(0);
    setIsActive(false);
  }, []);

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer
  };
};

export default useGameTimer;