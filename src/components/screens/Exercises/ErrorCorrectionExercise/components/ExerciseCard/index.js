import React from "react";
import { View, Text, Animated } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher une carte d'exercice avec des animations
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {ReactNode} props.children - Contenu de la carte
 * @param {string} props.title - Titre de la carte (optionnel)
 * @param {string} props.subtitle - Sous-titre de la carte (optionnel)
 * @param {Animated.Value} props.fadeAnim - Animation de fade (optionnel)
 * @param {Animated.Value} props.scaleAnim - Animation de scale (optionnel)
 * @param {Object} props.style - Styles supplémentaires pour la carte
 * @param {string} props.levelColor - Couleur correspondant au niveau (optionnel)
 * @param {boolean} props.bordered - Si la carte doit avoir une bordure (par défaut: false)
 * @param {boolean} props.elevated - Si la carte doit avoir une élévation (par défaut: true)
 */
const ExerciseCard = ({
  children,
  title,
  subtitle,
  fadeAnim,
  scaleAnim,
  style,
  levelColor,
  bordered = false,
  elevated = true,
}) => {
  // Styles de base pour la carte
  const cardStyle = [
    styles.card,
    elevated && styles.elevated,
    bordered && [styles.bordered, levelColor ? { borderColor: levelColor } : null],
    style,
  ];

  // Si des animations sont fournies, utiliser une Animated.View
  const CardComponent = (fadeAnim || scaleAnim) ? Animated.View : View;

  // Styles d'animation
  const animatedStyle = {};
  if (fadeAnim) {
    animatedStyle.opacity = fadeAnim;
  }
  if (scaleAnim) {
    animatedStyle.transform = [{ scale: scaleAnim }];
  }

  return (
    <CardComponent style={[cardStyle, animatedStyle]}>
      {/* En-tête optionnel avec titre et sous-titre */}
      {(title || subtitle) && (
        <View style={styles.cardHeader}>
          {title && (
            <Text
              style={[
                styles.cardTitle,
                levelColor ? { color: levelColor } : null,
              ]}
            >
              {title}
            </Text>
          )}
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
      )}

      {/* Contenu principal */}
      <View style={styles.cardContent}>{children}</View>
    </CardComponent>
  );
};

export default ExerciseCard;