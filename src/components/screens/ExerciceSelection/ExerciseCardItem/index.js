// ExerciseSelection/ExerciseCardItem.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ExerciseCardItem = ({ exercise, isLast, onPress }) => {
  const { title, description, progress, color, icon } = exercise;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isLast ? { marginBottom: 20 } : { marginBottom: 12 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.topSection}>
        {/* Icône de l'exercice */}
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Informations principales */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: color },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    width: 35,
    textAlign: "right",
  },
});

export default ExerciseCardItem;
