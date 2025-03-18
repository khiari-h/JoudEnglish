// Dashboard/components/DailyChallenge/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const DailyChallenge = ({ challenge }) => {
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

  const renderChallengeProgress = () => {
    const progressPercentage = (challenge.progress / challenge.total) * 100;
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {challenge.progress}/{challenge.total}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: challenge.color,
              },
            ]}
          />
        </View>
      </View>
    );
  };

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
        <Text style={styles.sectionTitle}>Today's Challenge</Text>
        <TouchableOpacity>
          <Text style={styles.nextChallengeText}>
            Tomorrow's Challenge →
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.dailyChallengeCard,
          { borderLeftColor: challenge.color },
        ]}
      >
        <View style={styles.challengeHeader}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: challenge.color },
            ]}
          >
            <Ionicons name={challenge.icon} size={28} color="white" />
          </View>
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeBadgeText}>Daily</Text>
          </View>
        </View>

        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDescription}>
          {challenge.description}
        </Text>

        {renderChallengeProgress()}

        <TouchableOpacity
          style={[
            styles.startChallengeButton,
            { backgroundColor: challenge.color },
          ]}
        >
          <Text style={styles.startChallengeText}>Start Challenge</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DailyChallenge;

