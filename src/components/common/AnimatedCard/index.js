// components/common/AnimatedCard/index.js
import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import styles from "./styles";

const AnimatedCard = ({ 
  children, 
  style, 
  delay = 0, 
  duration = 800,
  animationType = "fadeUp" // Options: 'fadeUp', 'fadeIn', 'scaleIn'
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    let animations = [];

    if (animationType === 'fadeUp') {
      animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
      ];
    } else if (animationType === 'fadeIn') {
      animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
      ];
    } else if (animationType === 'scaleIn') {
      animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration,
          delay: delay,
          useNativeDriver: true,
        }),
      ];
    }

    Animated.parallel(animations).start();
  }, []);

  const getAnimatedStyle = () => {
    let animatedStyle = { opacity: fadeAnim };

    if (animationType === 'fadeUp') {
      animatedStyle.transform = [{ translateY: translateYAnim }];
    } else if (animationType === 'scaleIn') {
      animatedStyle.transform = [{ scale: scaleAnim }];
    }

    return animatedStyle;
  };

  return (
    <Animated.View style={[styles.container, style, getAnimatedStyle()]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;

