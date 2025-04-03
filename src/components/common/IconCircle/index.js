// components/common/IconCircle/index.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import theme from '../../../styles/theme';

const IconCircle = ({ 
  name, 
  size = 24, 
  backgroundColor,
  iconColor,
  circleSize = 40,
  style,
  containerStyle,
  variant = 'filled', // 'filled', 'outlined', 'ghost'
  disabled = false,
  onPress,
}) => {
  const getVariantStyle = () => {
    switch(variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: backgroundColor
        };
      case 'ghost':
        return {
          backgroundColor: `${backgroundColor}15`, // 15% opacity
        };
      default:
        return {
          backgroundColor
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[containerStyle]}
    >
      <View
        style={[
          styles.container,
          getVariantStyle(),
          { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
          disabled && styles.disabled,
          style
        ]}
      >
        <Ionicons 
          name={name} 
          size={size} 
          color={disabled ? '#9CA3AF' : (variant === 'filled' ? 'white' : backgroundColor)} 
        />
      </View>
    </TouchableOpacity>
  );
};

export default IconCircle;

