// ExerciseSelection/components/ExerciseCard/index.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import Button from "../../../ui/Button";
import styles from "./style";

const ExerciseCard = ({ exercise, onPress, isLast }) => {
  const { title, description, icon, color, progress } = exercise;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.exerciseCard,
        {
          borderLeftWidth: 4,
          borderLeftColor: color,
          marginBottom: isLast ? 30 : 15,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.exerciseTopSection}>
        <View
          style={[
            styles.exerciseIconContainer,
            { backgroundColor: `${color}15` },
          ]}
        >
          <Text style={styles.exerciseIcon}>{icon}</Text>
        </View>

        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>{title}</Text>
          <Text style={styles.exerciseDescription}>{description}</Text>
        </View>
      </View>

      {progress > 0 ? (
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: color }]}>
              {progress}%
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.newBadgeContainer}>
          <View style={[styles.newBadge, { backgroundColor: `${color}15` }]}>
            <Text style={[styles.newBadgeText, { color: color }]}>New</Text>
          </View>
        </View>
      )}

      <View style={styles.startButtonContainer}>
        <Button
          title="Start"
          color={color}
          fullWidth={true}
          style={styles.startButton}
          textStyle={styles.startButtonText}
          onPress={onPress}
        />
      </View>
    </Pressable>
  );
};

export default ExerciseCard;
