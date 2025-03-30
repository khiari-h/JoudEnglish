import React, { useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useAnimations } from "../../hooks/common/useAnimations";

/**
 * Composant pour afficher un feedback animé
 *
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.title - Titre du feedback
 * @param {string} props.message - Message détaillé
 * @param {string} props.animationType - Type d'animation (flash, pulse, fadeIn)
 * @param {Object} props.style - Styles supplémentaires
 */
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
    // Choisir l'animation en fonction du type demandé
    if (animationType === "flash") {
      flash();
    } else if (animationType === "pulse") {
      pulse();
    } else {
      fadeIn();
    }
  }, [animationType, fadeIn, pulse, flash]);

  // Obtenir le style d'animation approprié
  const getAnimationStyle = () => {
    if (animationType === "pulse") {
      return animatedStyles.scale;
    } else {
      return animatedStyles.fade;
    }
  };

  return (
    <Animated.View
      style={[
        styles.feedbackContainer,
        isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
        getAnimationStyle(),
        style,
      ]}
    >
      <Text style={styles.feedbackTitle}>
        {title || (isCorrect ? "Correct!" : "Incorrect!")}
      </Text>

      {message && <Text style={styles.feedbackText}>{message}</Text>}
    </Animated.View>
  );
};

// Styles de base pour le composant
const styles = StyleSheet.create({
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  correctFeedback: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#10b981",
  },
  incorrectFeedback: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
  },
  feedbackText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
});

export default AnimatedFeedback;
