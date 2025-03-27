// components/common/AnimatedCard/index.js
import React, { useEffect } from "react";
import { View, Animated } from "react-native";
import { useAnimations } from '../../../hooks/common';
import styles from "./style";

const AnimatedCard = ({ 
  children, 
  style, 
  delay = 0, 
  duration = 800,
  animationType = "fadeUp" // Options: 'fadeUp', 'fadeIn', 'scaleIn'
}) => {
  const { 
    fadeAnim, 
    slideAnim, 
    scaleAnim,
    fadeIn,
    slideIn,
    scaleIn,
    animatedStyles
  } = useAnimations({
    initialValues: { 
      fade: 0, 
      slide: animationType === 'fadeUp' ? 50 : 0, 
      scale: animationType === 'scaleIn' ? 0.9 : 1 
    },
    config: { duration }
  });

  useEffect(() => {
    // Déclencher l'animation appropriée après le délai
    const timer = setTimeout(() => {
      if (animationType === 'fadeUp') {
        fadeIn();
        slideIn();
      } else if (animationType === 'fadeIn') {
        fadeIn();
      } else if (animationType === 'scaleIn') {
        fadeIn();
        scaleIn();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [animationType, delay, fadeIn, slideIn, scaleIn]);

  // Obtenir le style d'animation approprié
  const getAnimatedStyle = () => {
    if (animationType === 'fadeUp') {
      return {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      };
    } else if (animationType === 'scaleIn') {
      return {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      };
    } else {
      return { opacity: fadeAnim };
    }
  };

  return (
    <Animated.View style={[styles.container, style, getAnimatedStyle()]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;