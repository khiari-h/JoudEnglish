import React from "react";
import { View, Text, Animated } from "react-native";
import { useAnimations } from '../../../hooks/common';
import styles from "./style";

const ExerciseCard = ({
  children,
  title,
  subtitle,
  style,
  levelColor,
  bordered = false,
  elevated = true,
  animated = false,
  animationType = "fadeIn"
}) => {
  // Utiliser les animations uniquement si demandé
  const { animatedStyles } = useAnimations({
    initialValues: { 
      fade: animated ? 0 : 1, 
      slide: animationType.includes('slide') ? 50 : 0, 
      scale: animationType.includes('scale') ? 0.95 : 1 
    }
  });

  // Styles de base pour la carte
  const cardStyle = [
    styles.card,
    elevated && styles.elevated,
    bordered && [styles.bordered, levelColor ? { borderColor: levelColor } : null],
    style,
  ];

  // Si des animations sont fournies, utiliser une Animated.View
  const CardComponent = animated ? Animated.View : View;

  // Obtenir le style d'animation approprié
  const getAnimationStyle = () => {
    if (!animated) return {};
    
    if (animationType === 'fadeIn') {
      return animatedStyles.fade;
    } else if (animationType === 'slideIn') {
      return animatedStyles.slide;
    } else if (animationType === 'scaleIn') {
      return animatedStyles.scale;
    } else if (animationType === 'combined') {
      return animatedStyles.combined;
    }
    
    return {};
  };

  return (
    <CardComponent style={[cardStyle, animated && getAnimationStyle()]}>
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