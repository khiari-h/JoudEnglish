import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './style';

/**
 * Component that displays the vocabulary word card
 */
const WordCard = ({
  currentWord,
  showTranslation,
  toggleTranslation,
  levelColor,
  fadeAnim,
  slideAnim
}) => {
  if (!currentWord) return null;
  
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

        {/* Definition section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <View
              style={[styles.sectionDot, { backgroundColor: levelColor }]}
            />
            <Text style={styles.sectionTitle}>Definition</Text>
          </View>
          <Text style={styles.sectionText}>{currentWord.definition}</Text>
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
            <Text style={styles.exampleText}>{currentWord.example}</Text>
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default WordCard;