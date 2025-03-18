// components/common/ProgressBar/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const ProgressBar = ({ 
  progress, 
  total, 
  color, 
  showText = true, 
  textPosition = "right" 
}) => {
  const progressPercentage = (progress / total) * 100;
  
  return (
    <View style={styles.container}>
      {showText && textPosition === "top" && (
        <Text style={styles.progressText}>
          {progress}/{total}
        </Text>
      )}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      {showText && textPosition === "right" && (
        <Text style={styles.progressText}>
          {progress}/{total}
        </Text>
      )}
      {showText && textPosition === "percentage" && (
        <Text style={styles.progressText}>
          {progressPercentage.toFixed(0)}%
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;

