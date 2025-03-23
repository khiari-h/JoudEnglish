/**
 * Utilitaires pour les animations dans le module de correction d'erreurs
 * Centralise les animations pour assurer leur cohérence et leur réutilisabilité
 */

import { Animated } from "react-native";

/**
 * Réalise une animation de pulsation (scale up/down)
 * @param {Animated.Value} scaleAnim - Référence Animated.Value pour le scale
 * @param {number} toValue - Valeur maximale de l'échelle
 * @param {number} duration - Durée d'une direction (up ou down)
 * @param {Function} callback - Fonction à exécuter à la fin de l'animation
 */
export const pulseAnimation = (
  scaleAnim,
  toValue = 1.05,
  duration = 200,
  callback = null
) => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }),
  ]).start(callback);
};

/**
 * Réalise une animation de fade in/out
 * @param {Animated.Value} fadeAnim - Référence Animated.Value pour l'opacité
 * @param {number} toValue - Valeur minimale de l'opacité
 * @param {number} duration - Durée d'une direction (in ou out)
 * @param {Function} callback - Fonction à exécuter à la fin de l'animation
 */
export const fadeAnimation = (
  fadeAnim,
  toValue = 0.6,
  duration = 200,
  callback = null
) => {
  Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }),
  ]).start(callback);
};

/**
 * Animation pour une sélection (utilisée pour les choix multiples)
 * @param {Animated.Value} scaleAnim - Référence Animated.Value pour le scale
 * @param {Function} callback - Fonction à exécuter à la fin de l'animation
 */
export const selectionAnimation = (scaleAnim, callback = null) => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.02,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start(callback);
};

/**
 * Animation pour une réponse correcte
 * @param {Animated.Value} scaleAnim - Référence Animated.Value pour le scale
 * @param {Function} callback - Fonction à exécuter à la fin de l'animation
 */
export const correctAnswerAnimation = (scaleAnim, callback = null) => {
  pulseAnimation(scaleAnim, 1.05, 200, callback);
};

/**
 * Animation pour une réponse incorrecte
 * @param {Animated.Value} fadeAnim - Référence Animated.Value pour l'opacité
 * @param {Function} callback - Fonction à exécuter à la fin de l'animation
 */
export const incorrectAnswerAnimation = (fadeAnim, callback = null) => {
  fadeAnimation(fadeAnim, 0.6, 200, callback);
};

/**
 * Crée des références d'animation réutilisables
 * @returns {Object} Objet contenant les références d'animation
 */
export const createAnimationRefs = () => {
  return {
    fadeAnim: new Animated.Value(1),
    scaleAnim: new Animated.Value(1),
  };
};

export default {
  pulseAnimation,
  fadeAnimation,
  selectionAnimation,
  correctAnswerAnimation,
  incorrectAnswerAnimation,
  createAnimationRefs,
};