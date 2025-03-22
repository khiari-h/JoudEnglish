import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SpellingSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // Détermine la couleur en fonction du niveau
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

  // Options d'exercices d'orthographe
  const spellingOptions = [
    {
      id: "spelling-rules",
      title: "Spelling Rules",
      description: "Learn and practice common spelling rules for English words",
      screen: "SpellingRulesPractice",
      icon: "📏",
    },
    {
      id: "spelling-correction",
      title: "Spelling Correction",
      description: "Practice correcting commonly misspelled words",
      screen: "SpellingCorrectionPractice",
      icon: "✓",
    },
  ];

  // Naviguer vers l'exercice sélectionné
  const navigateToExercise = (screen) => {
    navigation.navigate(screen, { level });
  };

  // Revenir à l'écran précédent
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête avec niveau et titre */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.screenTitle}>Spelling Practice</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.sectionTitle}>Choose a practice mode:</Text>

        {/* Cartes d'options */}
        {spellingOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            onPress={() => navigateToExercise(option.screen)}
          >
            <View style={styles.optionHeader}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${levelColor}20` },
                ]}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <Text style={styles.optionDescription}>{option.description}</Text>
            <View style={styles.optionFooter}>
              <Text style={[styles.startButton, { color: levelColor }]}>
                Start →
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Texte explicatif */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Why Spelling Matters</Text>
          <Text style={styles.infoText}>
            Good spelling is essential for effective communication in English.
            Even with spell-checkers, understanding spelling patterns and rules
            helps improve your overall language skills and makes your writing
            more professional and credible.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#475569",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
  },
  optionDescription: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 22,
    marginBottom: 16,
  },
  optionFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  startButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
});

export default SpellingSelectionScreen;
