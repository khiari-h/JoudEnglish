// components/common/DotIndicator/index.js
import React from "react";
import { View } from "react-native";
import styles from "./style";

const DotIndicator = ({ 
  count, 
  activeIndex, 
  activeColor, 
  inactiveColor,
  dotSize = 8,
  dotSpacing = 4
}) => {
  // Default colors if not provided
  const activeDotColor = activeColor || "#5E60CE";
  const inactiveDotColor = inactiveColor || "#D1D5DB";

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              marginHorizontal: dotSpacing,
              backgroundColor: index === activeIndex ? activeDotColor : inactiveDotColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default DotIndicator;

