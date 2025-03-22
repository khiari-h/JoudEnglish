// Dashboard/components/LearningPath/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import Button from "../../../../ui/Button";
import styles from "./style";

const LearningPath = ({ onSelectLevel, onViewProgress }) => {
  // Animation pour l'entrée des cartes
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.sectionContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Learning Path</Text>
        <Button
          title="Select Level"
          variant="text"
          color={styles.seeAllText?.color || "#5E60CE"}
          size="small"
          onPress={onSelectLevel}
        />
      </View>

      <View style={styles.learningPathCard}>
        <View style={styles.learningPathContent}>
          <View style={styles.learningPathTextContainer}>
            <Text style={styles.learningPathTitle}>
              Start Your English Journey
            </Text>
            <Text style={styles.learningPathSubtitle}>
              Choose a level from beginner to advanced
            </Text>
          </View>
          <View style={styles.learningPathIconContainer}>
            <Text style={styles.learningPathIcon}>🌐</Text>
          </View>
        </View>
      </View>

      <Button
        title="View My Progress"
        variant="outlined"
        color="#5E60CE"
        onPress={onViewProgress}
        style={styles.viewProgressButton}
        textStyle={styles.viewProgressText}
      />
    </Animated.View>
  );
};

export default LearningPath;
