// components/common/JoudLogo/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import styles from "./styles";

const JoudLogo = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation, { iterations: 3 }).start();

    return () => {
      scaleAnim.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.background, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.text}>JOUD</Text>
      </Animated.View>
      <Text style={styles.tagline}>English Made Easy</Text>
    </View>
  );
};

export default JoudLogo;
