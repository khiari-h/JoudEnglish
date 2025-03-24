import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * Hook to manage word card animations
 * @returns {Object} Animation values and controls
 */
export const useWordCardAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Function to trigger animation
  const animateCard = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Function to reset animation values
  const resetAnimation = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
  };

  return {
    fadeAnim,
    slideAnim,
    animateCard,
    resetAnimation,
  };
};