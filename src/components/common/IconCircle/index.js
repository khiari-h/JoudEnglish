// components/common/IconCircle/index.js
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const IconCircle = ({ 
  name, 
  size = 28, 
  color = "white", 
  backgroundColor, 
  iconColor = "white",
  circleSize = 56
}) => {
  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: backgroundColor,
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
        },
      ]}
    >
      <Ionicons name={name} size={size} color={iconColor} />
    </View>
  );
};

export default IconCircle;

