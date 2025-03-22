import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

/**
 * Composant Button réutilisable et flexible basé sur Pressable
 *
 * @param {string} title - Texte du bouton (facultatif si icon est fourni)
 * @param {element} icon - Élément React pour l'icône (facultatif)
 * @param {string} iconPosition - Position de l'icône ('left' ou 'right', par défaut 'left')
 * @param {function} onPress - Fonction appelée lors du toucher
 * @param {string} color - Couleur de fond du bouton
 * @param {string} textColor - Couleur du texte
 * @param {string} size - Taille du bouton ('small', 'medium', 'large')
 * @param {string} variant - Variante du bouton ('filled', 'outlined', 'text')
 * @param {Object} style - Styles supplémentaires pour le bouton
 * @param {Object} textStyle - Styles supplémentaires pour le texte
 * @param {boolean} fullWidth - Si true, le bouton prendra toute la largeur disponible
 * @param {boolean} disabled - Si true, le bouton sera désactivé
 */
const Button = ({
  title,
  icon,
  iconPosition = "left",
  onPress,
  color = "#5E60CE",
  textColor = "white",
  size = "medium",
  variant = "filled",
  style,
  textStyle,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  // Configurations de taille prédéfinies
  const sizes = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
      iconSize: 14,
      borderRadius: 6,
      gap: 4,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
      iconSize: 18,
      borderRadius: 8,
      gap: 6,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      iconSize: 22,
      borderRadius: 10,
      gap: 8,
    },
  };

  // Styles selon la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: color,
          textColor: color,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 4,
          paddingVertical: 4,
          textColor: color,
        };
      case "filled":
      default:
        return {
          backgroundColor: color,
          borderWidth: 0,
          textColor: textColor,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const finalTextColor = variantStyles.textColor;

  // Opacité quand pressé ou désactivé
  const getOpacity = ({ pressed }) => {
    if (disabled) return 0.5;
    return pressed ? 0.8 : 1;
  };

  // Effet de ripple sur Android
  const rippleConfig = {
    color: variantStyles.backgroundColor !== "transparent" ? "#FFFFFF" : color,
    borderless: false,
    radius: 20,
  };

  // Styles pour le padding selon si on a juste une icône ou non
  const paddingStyles =
    icon && !title
      ? {
          paddingVertical: sizes[size].paddingVertical,
          paddingHorizontal: sizes[size].paddingVertical, // carré pour icône seule
        }
      : {
          paddingVertical: sizes[size].paddingVertical,
          paddingHorizontal: sizes[size].paddingHorizontal,
        };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={(state) => [
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderWidth: variantStyles.borderWidth || 0,
          borderColor: variantStyles.borderColor || "transparent",
          borderRadius: sizes[size].borderRadius,
          opacity: getOpacity(state),
          width: fullWidth ? "100%" : "auto",
          ...paddingStyles,
        },
        style,
      ]}
      android_ripple={rippleConfig}
      disabled={disabled}
      {...props}
    >
      <View style={[styles.content, { gap: sizes[size].gap }]}>
        {/* Icône à gauche si demandé */}
        {icon && iconPosition === "left" && (
          <View style={styles.iconContainer}>{icon}</View>
        )}

        {/* Texte du bouton (si fourni) */}
        {title && (
          <Text
            style={[
              styles.text,
              {
                color: finalTextColor,
                fontSize: sizes[size].fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}

        {/* Icône à droite si demandé */}
        {icon && iconPosition === "right" && (
          <View style={styles.iconContainer}>{icon}</View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
