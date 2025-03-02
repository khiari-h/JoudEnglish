import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import fictif - sera remplacé par les vrais imports basés sur le niveau
import vocabularyA1Data from "../../../data/exercises/vocabulary/vocabularyA1";
import vocabularyA2Data from "../../../data/exercises/vocabulary/vocabularyA2";
// ... autres imports pour les niveaux B1, B2, C1, C2

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState([]);

  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Determine color based on level
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Get vocabulary data based on level
  const getVocabularyData = (level) => {
    // This would be replaced with actual logic to get the right data
    const dataMap = {
      A1: vocabularyA1Data,
      A2: vocabularyA2Data,
      // ... other levels
    };
    return dataMap[level]?.exercises[0] || vocabularyA1Data.exercises[0];
  };

  const vocabularyData = getVocabularyData(level);
  const currentWord = vocabularyData.words[currentWordIndex];
  const totalWords = vocabularyData.words.length;
  const progress = (completed.length / totalWords) * 100;

  // Animate card when word changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    };
  }, [currentWordIndex]);

  const handleNext = () => {
    if (!completed.includes(currentWordIndex)) {
      setCompleted([...completed, currentWordIndex]);
    }

    setShowTranslation(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // All words completed
      alert("Exercise completed!");
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Level badge */}
        <View style={styles.levelBadgeContainer}>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: levelColor },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {completed.length}/{totalWords}
          </Text>
        </View>

        {/* Word card */}
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: currentWord.imageUrl }}
              style={styles.wordImage}
              resizeMode="cover"
            />

            <View style={styles.wordContainer}>
              <Text style={styles.word}>{currentWord.word}</Text>

              {showTranslation ? (
                <View style={styles.translationContainer}>
                  <Text style={[styles.translation, { color: levelColor }]}>
                    {currentWord.translation}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.showButton,
                    { backgroundColor: `${levelColor}15` },
                  ]}
                  onPress={() => setShowTranslation(true)}
                >
                  <Text style={[styles.showButtonText, { color: levelColor }]}>
                    Show Translation
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.definitionContainer}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionDot, { backgroundColor: levelColor }]}
                />
                <Text style={styles.definitionTitle}>Definition</Text>
              </View>
              <Text style={styles.definition}>{currentWord.definition}</Text>

              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionDot, { backgroundColor: levelColor }]}
                />
                <Text style={styles.exampleTitle}>Example</Text>
              </View>
              <Text style={styles.example}>{currentWord.example}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Navigation buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.prevButton,
              { opacity: currentWordIndex > 0 ? 1 : 0.5 },
              { backgroundColor: `${levelColor}15` },
            ]}
            onPress={handlePrevious}
            disabled={currentWordIndex === 0}
          >
            <Text style={[styles.navButtonText, { color: levelColor }]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              { backgroundColor: levelColor },
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentWordIndex < totalWords - 1 ? "Next" : "Complete"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card count indicator */}
        <View style={styles.cardIndicatorContainer}>
          {vocabularyData.words.map((_, index) => (
            <View
              key={index}
              style={[
                styles.cardIndicator,
                {
                  backgroundColor:
                    currentWordIndex === index
                      ? levelColor
                      : completed.includes(index)
                      ? `${levelColor}50`
                      : "#e5e7eb",
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  levelBadgeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  levelBadgeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
    width: 40,
    textAlign: "right",
  },
  cardContainer: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 0,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  wordImage: {
    width: "100%",
    height: 200,
    marginBottom: 0,
  },
  wordContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 15,
  },
  word: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1f2937",
  },
  translationContainer: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  translation: {
    fontSize: 22,
    fontWeight: "bold",
  },
  showButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  showButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  definitionContainer: {
    padding: 20,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 15,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  definitionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  definition: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  example: {
    fontSize: 16,
    color: "#4b5563",
    fontStyle: "italic",
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  navButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  cardIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
});

export default VocabularyExercise;
