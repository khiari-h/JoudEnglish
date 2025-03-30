import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import getLevelColor from "../../../../../../utils/getLevelColor";
import { SPELLING_OPTIONS } from "../../constants";
import useSpellingExercise from "../../hooks/useSpellingExercice";
import useExerciseType from "../../../../../../hooks/useExerciceType";
import { EXERCISE_TYPES } from "../../../../../../constants/exercicesTypes";

/**
 * Écran de sélection des exercices d'orthographe
 */
const SelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };
  const levelColor = getLevelColor(level);

  // États pour stocker les progressions
  const [progressData, setProgressData] = useState({
    correction: { completed: 0, total: 0, percent: 0 },
    rules: { completed: 0, total: 0, percent: 0 },
  });

  // Hooks pour récupérer les progressions
  const { getCorrectionProgress } = useSpellingExercise();
  const { getExerciseProgress } = useExerciseType(EXERCISE_TYPES.SPELLING);

  // Charger les données de progression au démarrage
  useEffect(() => {
    // Récupérer la progression pour la correction d'orthographe
    const correctionProgress = getCorrectionProgress(level) || {
      completed: 0,
      total: 0,
    };

    // Récupérer la progression pour les règles d'orthographe
    const rulesProgress = getExerciseProgress(level, "spelling_rules") || {
      completed: 0,
      total: 0,
    };

    // Calculer les pourcentages
    const correctionPercent =
      correctionProgress.total > 0
        ? Math.round(
            (correctionProgress.completed / correctionProgress.total) * 100
          )
        : 0;

    const rulesPercent =
      rulesProgress.total > 0
        ? Math.round((rulesProgress.completed / rulesProgress.total) * 100)
        : 0;

    // Mettre à jour les données de progression
    setProgressData({
      correction: {
        ...correctionProgress,
        percent: correctionPercent,
      },
      rules: {
        ...rulesProgress,
        percent: rulesPercent,
      },
    });
  }, [level, getCorrectionProgress, getExerciseProgress]);

  // Naviguer vers l'exercice sélectionné
  const navigateToExercise = (screen) => {
    navigation.navigate(screen, { level });
  };

  // Revenir à l'écran précédent
  const goBack = () => {
    navigation.goBack();
  };

  // Fonction pour obtenir la progression en fonction du type d'exercice
  const getProgressForOption = (optionId) => {
    if (optionId === "correction") {
      return progressData.correction;
    } else if (optionId === "rules") {
      return progressData.rules;
    }
    return { completed: 0, total: 0, percent: 0 };
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
        {SPELLING_OPTIONS.map((option) => {
          const progress = getProgressForOption(option.id);

          return (
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

              {/* Affichage de la progression */}
              {progress.total > 0 && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${progress.percent}%`,
                          backgroundColor: levelColor,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {progress.completed} / {progress.total} ({progress.percent}
                    %)
                  </Text>
                </View>
              )}

              <View style={styles.optionFooter}>
                <Text style={[styles.startButton, { color: levelColor }]}>
                  {progress.completed > 0 && progress.completed < progress.total
                    ? "Continue →"
                    : progress.percent === 100
                    ? "Practice Again →"
                    : "Start →"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

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

export default SelectionScreen;
