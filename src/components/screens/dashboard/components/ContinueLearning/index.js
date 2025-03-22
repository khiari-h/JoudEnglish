// Dashboard/components/ContinueLearning/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../../ui/Button";
import styles from "./style";

const ContinueLearning = ({ activity, onPress }) => {
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
        <Text style={styles.sectionTitle}>Continue Learning</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.lastActivityCard,
          { opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={onPress}
      >
        <View style={styles.lastActivityContent}>
          <View
            style={[
              styles.lastActivityIconContainer,
              { backgroundColor: "#7764E4" },
            ]}
          >
            <Ionicons name={activity.icon} size={28} color="white" />
          </View>
          <View style={styles.lastActivityDetails}>
            <Text style={styles.lastActivityTitle}>{activity.title}</Text>
            <Text style={styles.lastActivityTopic}>{activity.topic}</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${activity.progress}%`,
                      backgroundColor: "#7764E4",
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{activity.progress}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.continueButtonContainer}>
          {/* Utiliser le nouveau Button avec l'icône */}
          <Button
            icon={<Ionicons name="play" size={16} color="white" />}
            color="#5E60CE"
            size="small"
            style={styles.continueButton}
            onPress={onPress}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ContinueLearning;
