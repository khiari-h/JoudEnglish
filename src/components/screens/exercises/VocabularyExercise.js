// src/components/screens/exercises/VocabularyExercise.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import vocabularyA1Data from "../../../data/exercises/vocabulary/vocabularyA1";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState([]);

  // Utilisation des données importées
  const vocabularyData = vocabularyA1Data.exercises[0];
  const currentWord = vocabularyData.words[currentWordIndex];
  const totalWords = vocabularyData.words.length;
  const progress = (completed.length / totalWords) * 100;
  const handleNext = () => {
    if (!completed.includes(currentWordIndex)) {
      setCompleted([...completed, currentWordIndex]);
    }

    setShowTranslation(false);

    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // All words completed
      alert("Exercise completed!");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {completed.length}/{totalWords}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Word card */}
        <View style={styles.card}>
          <Image
            source={{ uri: currentWord.imageUrl }}
            style={styles.wordImage}
            resizeMode="cover"
          />

          <View style={styles.wordContainer}>
            <Text style={styles.word}>{currentWord.word}</Text>

            {showTranslation ? (
              <Text style={styles.translation}>{currentWord.translation}</Text>
            ) : (
              <TouchableOpacity
                style={styles.showButton}
                onPress={() => setShowTranslation(true)}
              >
                <Text style={styles.showButtonText}>Show Translation</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.definitionContainer}>
            <Text style={styles.definitionTitle}>Definition:</Text>
            <Text style={styles.definition}>{currentWord.definition}</Text>

            <Text style={styles.exampleTitle}>Example:</Text>
            <Text style={styles.example}>{currentWord.example}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentWordIndex < totalWords - 1 ? "Next Word" : "Complete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wordImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  wordContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  translation: {
    fontSize: 20,
    color: "#3b82f6",
    fontWeight: "bold",
  },
  showButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  showButtonText: {
    color: "#4b5563",
    fontWeight: "600",
  },
  definitionContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 15,
  },
  definitionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  definition: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 15,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  example: {
    fontSize: 16,
    color: "#4b5563",
    fontStyle: "italic",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default VocabularyExercise;
