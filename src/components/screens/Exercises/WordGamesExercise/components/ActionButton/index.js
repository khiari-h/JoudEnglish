import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant bouton d'action
 */
const ActionButton = ({
  onPress,
  disabled = false,
  text,
  levelColor,
  type = "primary",
  fullWidth = true
}) => {
  // Déterminer le style du bouton en fonction du type
  const buttonStyle = [
    styles.actionButton,
    type === "primary" && [
      disabled 
        ? styles.disabledButton 
        : styles.enabledButton,
      !disabled && { backgroundColor: levelColor }
    ],
    type === "secondary" && [
      styles.secondaryButton,
      { borderColor: levelColor }
    ],
    fullWidth && styles.fullWidth
  ];
  
  // Déterminer le style du texte
  const textStyle = [
    styles.actionButtonText,
    type === "secondary" && { color: levelColor }
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

/**
 * Conteneur pour les boutons d'action
 */
export const ActionContainer = ({ children, style }) => {
  return (
    <View style={[styles.actionContainer, style]}>
      {children}
    </View>
  );
};

export default ActionButton;