import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { getAnimationConfig } from '../utils/exerciseUtils';

export const useAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animate = useCallback((type, options = {}) => {
    const config = getAnimationConfig(type);
    const animations = [];

    if (options.fade) {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: options.fade,
          ...config,
        })
      );
    }

    if (options.slide) {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: options.slide,
          ...config,
        })
      );
    }

    Animated.parallel(animations).start(options.onComplete);
  }, [fadeAnim, slideAnim]);

  return {
    fadeAnim,
    slideAnim,
    scaleAnim,
    animate
  };
};
