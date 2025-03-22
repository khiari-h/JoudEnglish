// Dashboard/components/DailyChallenge/index.js
import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import Button from "../../../../ui/Button";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

const DailyChallenge = ({ challenge, onPress }) => {
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

  // Fonction pour afficher le défi de demain
  const handleTomorrowChallenge = () => {
    // Implémenter la logique pour afficher le défi de demain
    console.log("Afficher le défi de demain");
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
        <Button
          title="Tomorrow's Challenge →"
          variant="text"
          color={styles.nextChallengeText?.color || "#6B7280"}
          size="small"
          onPress={handleTomorrowChallenge}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.dailyChallengeCard,
          { borderLeftColor: challenge.color },
          { opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={onPress}
      >
        <View style={styles.challengeHeader}>
          <View
            style={[styles.iconCircle, { backgroundColor: challenge.color }]}
          >
            <Ionicons name={challenge.icon} size={28} color="white" />
          </View>
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeBadgeText}>Daily</Text>
          </View>
        </View>

        <Text style={styles.challengeTitle}>{challenge.title}</Text>
        <Text style={styles.challengeDescription}>{challenge.description}</Text>

        {renderChallengeProgress()}

        <Button
          title="Start Challenge"
          color={challenge.color}
          onPress={onPress}
          fullWidth={true}
          size="medium"
          style={styles.startChallengeButton}
          textStyle={styles.startChallengeText}
        />
      </Pressable>
    </Animated.View>
  );
};

export default DailyChallenge;
