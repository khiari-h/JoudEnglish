
// LevelSelection/index.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LevelCard from "./components/LevelCard";
import { levels } from "./data"; // Optionnel, déplacé dans un fichier séparé
import styles from "./style";

const LevelSelection = () => {
  const navigation = useNavigation();

  const handleLevelSelect = (levelName) => {
    navigation.navigate("ExerciseSelection", { level: levelName });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          Choose any level to start your learning journey
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onSelect={handleLevelSelect}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default LevelSelection;