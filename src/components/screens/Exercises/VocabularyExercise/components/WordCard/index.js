import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "./style";

/**
 * Component that displays the vocabulary word card
 * Adapté pour utiliser les props fournis par VocabularyExercise
 */
const WordCard = ({
  word, // Changé de currentWord à word
  showTranslation,
  onToggleTranslation, // Changé de toggleTranslation
  isCompleted,
  fadeAnim,
  slideAnim,
  levelColor,
}) => {
  if (!word) return null;

  return (
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
          <Text style={styles.word}>{word.word}</Text>
        </View>

        {/* Translation toggle */}
        <TouchableOpacity
          style={styles.translationToggleContainer}
          onPress={onToggleTranslation} // Utilisé onToggleTranslation au lieu de toggleTranslation
          activeOpacity={0.7}
        >
          {showTranslation ? (
            <View style={styles.translationContainer}>
              <Text style={[styles.translation, { color: levelColor }]}>
                {word.translation}
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

        {/* Definition section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <View
              style={[styles.sectionDot, { backgroundColor: levelColor }]}
            />
            <Text style={styles.sectionTitle}>Definition</Text>
          </View>
          <Text style={styles.sectionText}>{word.definition}</Text>
        </View>

        {/* Example section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <View
              style={[styles.sectionDot, { backgroundColor: levelColor }]}
            />
            <Text style={styles.sectionTitle}>Example</Text>
          </View>
          <Text style={styles.sectionText}>
            <Text style={styles.exampleText}>{word.example}</Text>
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default WordCard;
