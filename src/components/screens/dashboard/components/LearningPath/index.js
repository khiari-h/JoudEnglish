// Dashboard/components/LearningPath/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "./styles";

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
        <TouchableOpacity onPress={onSelectLevel}>
          <Text style={styles.seeAllText}>Select Level</Text>
        </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.viewProgressButton}
        onPress={onViewProgress}
      >
        <Text style={styles.viewProgressText}>View My Progress</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LearningPath;
