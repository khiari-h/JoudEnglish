import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animate = useCallback((toValue, duration = 200) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return {
    fadeAnim,
    animate
  };
};
