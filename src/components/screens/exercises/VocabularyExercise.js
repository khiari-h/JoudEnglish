import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
  const [showTip, setShowTip] = useState(true); // Pour afficher le conseil au premier lancement

  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [tipFadeAnim] = useState(new Animated.Value(1));

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

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const dismissTip = () => {
    Animated.timing(tipFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowTip(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Level badge and exercise title */}
        <View style={styles.headerContainer}>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.exerciseTitle}>{vocabularyData.title}</Text>
        </View>

        {/* Daily tip (visible only on first load) */}
        {showTip && (
          <Animated.View
            style={[styles.tipContainer, { opacity: tipFadeAnim }]}
          >
            <View style={styles.tipContent}>
              <Text style={styles.tipIcon}>💡</Text>
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipTitle}>Learning Tip</Text>
                <Text style={styles.tipText}>
                  For better memorization, try to visualize each word or search
                  for images online to create mental associations.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.tipCloseButton}
              onPress={dismissTip}
            >
              <Text style={styles.tipCloseText}>✕</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

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
            {/* Main word */}
            <View
              style={[
                styles.wordHeaderContainer,
                { backgroundColor: `${levelColor}15` },
              ]}
            >
              <Text style={styles.word}>{currentWord.word}</Text>
            </View>

            {/* Translation toggle */}
            <TouchableOpacity
              style={styles.translationToggleContainer}
              onPress={toggleTranslation}
              activeOpacity={0.7}
            >
              {showTranslation ? (
                <View style={styles.translationContainer}>
                  <Text style={[styles.translation, { color: levelColor }]}>
                    {currentWord.translation}
                  </Text>
                  <Text style={styles.toggleHint}>(Tap to hide)</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.translationPlaceholder,
                    { borderColor: `${levelColor}30` },
                  ]}
                >
                  <Text
                    style={[
                      styles.translationPlaceholderText,
                      { color: levelColor },
                    ]}
                  >
                    Tap to reveal translation
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Definition and example sections */}
            <View style={styles.contentSection}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionDot, { backgroundColor: levelColor }]}
                />
                <Text style={styles.sectionTitle}>Definition</Text>
              </View>
              <Text style={styles.sectionText}>{currentWord.definition}</Text>
            </View>

            <View style={styles.contentSection}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionDot, { backgroundColor: levelColor }]}
                />
                <Text style={styles.sectionTitle}>Example</Text>
              </View>
              <Text style={styles.sectionText}>
                <Text style={styles.exampleText}>{currentWord.example}</Text>
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Card count indicators */}
        <View style={styles.cardIndicatorContainer}>
          {vocabularyData.words.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentWordIndex(index);
                setShowTranslation(false);
                fadeAnim.setValue(0);
                slideAnim.setValue(50);
              }}
            >
              <View
                style={[
                  styles.cardIndicator,
                  {
                    backgroundColor:
                      currentWordIndex === index
                        ? levelColor
                        : completed.includes(index)
                        ? `${levelColor}50`
                        : "#e5e7eb",
                    width: currentWordIndex === index ? 12 : 8,
                    height: currentWordIndex === index ? 12 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  levelBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
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
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  tipContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tipContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937",
  },
  tipText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  tipCloseButton: {
    marginLeft: 12,
    padding: 4,
  },
  tipCloseText: {
    fontSize: 16,
    color: "#9ca3af",
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
  wordHeaderContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  translationToggleContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  translationContainer: {
    alignItems: "center",
  },
  translation: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  toggleHint: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  translationPlaceholder: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: "dashed",
  },
  translationPlaceholderText: {
    fontWeight: "600",
  },
  contentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  sectionText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  exampleText: {
    fontStyle: "italic",
  },
  cardIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  cardIndicator: {
    borderRadius: 6,
    margin: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    padding: 15,
    borderRadius: 12,
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
});

export default VocabularyExercise;
