import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * Hook générique pour gérer les animations dans les exercices
 * 
 * @param {Object} initialValues - Valeurs initiales pour les animations
 * @param {number} initialValues.fade - Valeur initiale pour l'animation de fondu (0-1)
 * @param {number} initialValues.slide - Valeur initiale pour l'animation de glissement (pixels)
 * @param {number} initialValues.scale - Valeur initiale pour l'animation d'échelle (0-1)
 * @param {Object} config - Configuration des animations
 * @param {number} config.duration - Durée des animations en ms
 * @returns {Object} Valeurs animées et fonctions
 */
const useAnimations = ({
  initialValues = { fade: 0, slide: 50, scale: 0.95 },
  config = { duration: 500 }
} = {}) => {
  // Création des valeurs animées
  const fadeAnim = useRef(new Animated.Value(initialValues.fade)).current;
  const slideAnim = useRef(new Animated.Value(initialValues.slide)).current;
  const scaleAnim = useRef(new Animated.Value(initialValues.scale)).current;

  // Réinitialiser toutes les animations
  const resetAnimations = useCallback(() => {
    fadeAnim.setValue(initialValues.fade);
    slideAnim.setValue(initialValues.slide);
    scaleAnim.setValue(initialValues.scale);
  }, [fadeAnim, slideAnim, scaleAnim, initialValues]);

  // Animation de fondu
  const fadeIn = useCallback((callback) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [fadeAnim, config.duration]);

  const fadeOut = useCallback((callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [fadeAnim, config.duration]);

  // Animation de glissement
  const slideIn = useCallback((callback) => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [slideAnim, config.duration]);

  const slideOut = useCallback((callback) => {
    Animated.timing(slideAnim, {
      toValue: initialValues.slide,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [slideAnim, initialValues.slide, config.duration]);

  // Animation d'échelle
  const scaleIn = useCallback((callback) => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [scaleAnim, config.duration]);

  const scaleOut = useCallback((callback) => {
    Animated.timing(scaleAnim, {
      toValue: initialValues.scale,
      duration: config.duration,
      useNativeDriver: true,
    }).start(callback);
  }, [scaleAnim, initialValues.scale, config.duration]);

  // Animation combinées
  const animateIn = useCallback((callback) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: config.duration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: config.duration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: config.duration,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, [fadeAnim, slideAnim, scaleAnim, config.duration]);

  const animateOut = useCallback((callback) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: initialValues.fade,
        duration: config.duration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: initialValues.slide,
        duration: config.duration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: initialValues.scale,
        duration: config.duration,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, [fadeAnim, slideAnim, scaleAnim, initialValues, config.duration]);

  // Animation de pulsation (pour les feedback)
  const pulse = useCallback((callback) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: config.duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: config.duration / 2,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, [scaleAnim, config.duration]);

  // Animation de flash (pour les alertes)
  const flash = useCallback((callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: config.duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: config.duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: config.duration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: config.duration / 4,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, [fadeAnim, config.duration]);

  // Créer des styles animés prêts à utiliser
  const animatedStyles = {
    fade: { opacity: fadeAnim },
    slide: { transform: [{ translateY: slideAnim }] },
    scale: { transform: [{ scale: scaleAnim }] },
    combined: {
      opacity: fadeAnim,
      transform: [
        { translateY: slideAnim },
        { scale: scaleAnim }
      ],
    },
  };

  return {
    // Valeurs d'animation
    fadeAnim,
    slideAnim,
    scaleAnim,
    
    // Fonctions de réinitialisation
    resetAnimations,
    
    // Fonctions d'animation individuelles
    fadeIn,
    fadeOut,
    slideIn,
    slideOut,
    scaleIn,
    scaleOut,
    
    // Animations combinées
    animateIn,
    animateOut,
    
    // Effets spéciaux
    pulse,
    flash,
    
    // Styles prêts à utiliser
    animatedStyles,
  };
};

export default useAnimations;