// components/common/SectionHeader/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const SectionHeader = ({ 
  title, 
  actionText, 
  onAction 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionText && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
