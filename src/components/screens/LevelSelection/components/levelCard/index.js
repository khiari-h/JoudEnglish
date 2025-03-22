// LevelSelection/components/LevelCard/index.js
import React from "react";
import { View, Text, Pressable } from "react-native";
import Button from "../../../../ui/Button";
import styles from "./style";

const LevelCard = ({ level, onSelect }) => {
  const { name, title, description, progress, color, icon } = level;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.levelCard,
        {
          borderLeftWidth: 5,
          borderLeftColor: color,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
      onPress={() => onSelect(name)}
    >
      <View style={styles.levelContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${color}15` }, // Garder la transparence originale
          ]}
        >
          <Text style={styles.levelIcon}>{icon}</Text>
        </View>

        <View style={styles.levelInfo}>
          <View style={styles.levelHeader}>
            <View style={[styles.levelBadge, { backgroundColor: color }]}>
              <Text style={styles.levelBadgeText}>{name}</Text>
            </View>
            <Text style={styles.levelTitle}>{title}</Text>
          </View>

          <Text style={styles.levelDescription}>{description}</Text>

          {progress > 0 && (
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
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          )}
        </View>
      </View>

      <Button
        title="Start Learning"
        color={color}
        fullWidth={true}
        style={styles.startButton}
        textStyle={styles.startButtonText}
        onPress={() => onSelect(name)}
      />
    </Pressable>
  );
};

export default LevelCard;
