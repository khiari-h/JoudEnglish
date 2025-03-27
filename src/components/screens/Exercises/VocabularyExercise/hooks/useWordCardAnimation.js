import { useEffect } from 'react';
import { useAnimations } from '../../../hooks/common';

/**
 * Hook pour gérer les animations des cartes de vocabulaire
 * @returns {Object} Valeurs et contrôles d'animation
 */
export const useWordCardAnimation = () => {
  // Utiliser notre hook générique d'animations
  const { 
    fadeAnim, 
    slideAnim, 
    animateIn, 
    resetAnimations 
  } = useAnimations({
    initialValues: { fade: 0, slide: 50, scale: 1 },
    config: { duration: 500 }
  });

  // Fonction pour déclencher l'animation
  const animateCard = () => {
    animateIn();
  };

  return {
    fadeAnim,
    slideAnim,
    animateCard,
    resetAnimation: resetAnimations,
  };
};