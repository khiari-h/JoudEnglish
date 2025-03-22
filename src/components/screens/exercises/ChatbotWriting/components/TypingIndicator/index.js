import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import styles from "./style";

/**
 * Composant affichant une animation "en train d'écrire"
 *
 * @param {Object} props - Propriétés du composant
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const TypingIndicator = ({ levelColor }) => {
  const typingAnimation = useRef(new Animated.Value(0)).current;

  // Démarrer l'animation en boucle
  useEffect(() => {
    startAnimation();

    return () => {
      // Nettoyer l'animation lors du démontage du composant
      typingAnimation.stopAnimation();
    };
  }, []);

  // Animation en boucle pour l'indicateur de frappe
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(typingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: `${levelColor}15` }]}>
      <View style={styles.typingContainer}>
        <Animated.View
          style={[styles.typingDot, { opacity: typingAnimation }]}
        />
        <Animated.View
          style={[
            styles.typingDot,
            { opacity: typingAnimation, marginHorizontal: 4 },
          ]}
        />
        <Animated.View
          style={[styles.typingDot, { opacity: typingAnimation }]}
        />
      </View>
    </View>
  );
};

export default TypingIndicator;
