import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { useAnimations } from "../../../../hooks/common/useAnimations";
import styles from "./style";

const AnimatedFeedback = ({
  isCorrect,
  title,
  message,
  animationType = "fadeIn",
  style,
}) => {
  const { fadeAnim, scaleAnim, fadeIn, pulse, flash, animatedStyles } =
    useAnimations({
      initialValues: { fade: 0, scale: 0.95 },
      config: { duration: 400 },
    });

  useEffect(() => {
    switch(animationType) {
      case "flash": flash(); break;
      case "pulse": pulse(); break;
      default: fadeIn();
    }
  }, [animationType, fadeIn, pulse, flash]);

  return (
    <Animated.View
      style={[
        styles.container,
        isCorrect ? styles.correctContainer : styles.incorrectContainer,
        animationType === "pulse" ? animatedStyles.scale : animatedStyles.fade,
        style,
      ]}
    >
      <Text style={styles.title}>
        {title || (isCorrect ? "Correct!" : "Incorrect!")}
      </Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </Animated.View>
  );
};

export default AnimatedFeedback;
