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

// Import des données de vocabulaire par niveau
import vocabularyA1Data from "../../../data/exercises/vocabulary/vocabularyA1";
import vocabularyA2Data from "../../../data/exercises/vocabulary/vocabularyA2";
import vocabularyB1Data from "../../../data/exercises/vocabulary/vocabularyB1";
import vocabularyB2Data from "../../../data/exercises/vocabulary/vocabularyB2";
import vocabularyC1Data from "../../../data/exercises/vocabulary/vocabularyC1";
import vocabularyC2Data from "../../../data/exercises/vocabulary/vocabularyC2";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params || { level: 'A1' };
  const navigation = useNavigation();
  
  // États pour gérer l'exercice
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState({});
  const [showTip, setShowTip] = useState(true);

  // États pour l'animation
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [tipFadeAnim] = useState(new Animated.Value(1));

  // Déterminer la couleur en fonction du niveau
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

  // Récupérer les données de vocabulaire en fonction du niveau
  const getVocabularyData = (level) => {
    const dataMap = {
      A1: vocabularyA1Data,
      A2: vocabularyA2Data,
      B1: vocabularyB1Data,
      B2: vocabularyB2Data,
      C1: vocabularyC1Data,
      C2: vocabularyC2Data,
    };
    return dataMap[level] || vocabularyA1Data;
  };

  // Récupération des données complètes de vocabulaire
  const vocabularyData = getVocabularyData(level);
  const categories = vocabularyData.exercises;
  const currentCategory = categories[selectedCategoryIndex];
  
  // Initialisation du suivi de progression pour chaque catégorie
  useEffect(() => {
    const initialCompletedWords = {};
    vocabularyData.exercises.forEach((category, categoryIndex) => {
      initialCompletedWords[categoryIndex] = [];
    });
    
    // Ne pas réinitialiser si déjà initialisé
    if (Object.keys(completedWords).length === 0) {
      setCompletedWords(initialCompletedWords);
    }
  }, [vocabularyData]);

  // Animation de la carte lorsque le mot change
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
  }, [currentWordIndex, selectedCategoryIndex]);

  // Vérifier si le mot actuel est complété
  const isCurrentWordCompleted = () => {
    return completedWords[selectedCategoryIndex]?.includes(currentWordIndex);
  };

  // Calculer la progression pour la catégorie actuelle
  const calculateProgress = () => {
    const completed = completedWords[selectedCategoryIndex]?.length || 0;
    const total = currentCategory?.words.length || 0;
    return (completed / total) * 100;
  };

  // Gérer le passage au mot suivant
  const handleNext = () => {
    // Marquer le mot actuel comme complété s'il ne l'est pas déjà
    if (!isCurrentWordCompleted()) {
      const updatedCompletedWords = { ...completedWords };
      if (!updatedCompletedWords[selectedCategoryIndex]) {
        updatedCompletedWords[selectedCategoryIndex] = [];
      }
      updatedCompletedWords[selectedCategoryIndex].push(currentWordIndex);
      setCompletedWords(updatedCompletedWords);
    }

    setShowTranslation(false);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    if (currentWordIndex < currentCategory.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Tous les mots de cette catégorie sont complétés
      const allCompleted = vocabularyData.exercises.every((category, index) => {
        return (completedWords[index]?.length || 0) === category.words.length;
      });

      if (allCompleted) {
        // Tout le vocabulaire est complété
        alert("All vocabulary exercises completed!");
        navigation.goBack();
      } else {
        // Suggérer de passer à la catégorie suivante
        let nextCategoryIndex = (selectedCategoryIndex + 1) % categories.length;
        
        // Trouver la prochaine catégorie non terminée
        while (
          completedWords[nextCategoryIndex]?.length === categories[nextCategoryIndex].words.length &&
          nextCategoryIndex !== selectedCategoryIndex
        ) {
          nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
        }
        
        if (nextCategoryIndex === selectedCategoryIndex) {
          // Si on revient à la catégorie actuelle, c'est que tout est complété
          alert("All vocabulary exercises completed!");
          navigation.goBack();
        } else {
          // Demander à l'utilisateur s'il veut passer à la catégorie suivante
          if (confirm(`You've completed this category! Move to ${categories[nextCategoryIndex].title}?`)) {
            setSelectedCategoryIndex(nextCategoryIndex);
            setCurrentWordIndex(0);
          } else {
            // Rester sur la même catégorie
            setCurrentWordIndex(0);
          }
        }
      }
    }
  };

  // Gérer le passage au mot précédent
  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  };

  // Afficher/masquer la traduction
  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  // Fermer le conseil
  const dismissTip = () => {
    Animated.timing(tipFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowTip(false);
    });
  };

  // Gérer le changement de catégorie
  const handleCategoryChange = (index) => {
    if (index !== selectedCategoryIndex) {
      setSelectedCategoryIndex(index);
      setCurrentWordIndex(0);
      setShowTranslation(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  };

  // Récupérer le mot actuel
  const currentWord = currentCategory?.words[currentWordIndex];
  const totalWords = currentCategory?.words.length || 0;
  const progress = calculateProgress();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête avec badge de niveau et titre de l'exercice */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>{level}</Text>
          </View>
          <Text style={styles.exerciseTitle}>Vocabulary</Text>
        </View>

        {/* Sélecteur de catégorie */}
        <View style={styles.categorySelector}>
          <Text style={styles.categoryLabel}>Categories:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScrollView}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategoryIndex === index && [
                    styles.selectedCategoryButton, 
                    { borderColor: levelColor }
                  ]
                ]}
                onPress={() => handleCategoryChange(index)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategoryIndex === index && { color: levelColor }
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Conseil quotidien (visible uniquement au premier chargement) */}
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

        {/* Barre de progression */}
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
            {completedWords[selectedCategoryIndex]?.length || 0}/{totalWords}
          </Text>
        </View>

        {/* Carte du mot */}
        {currentWord && (
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
              {/* Mot principal */}
              <View
                style={[
                  styles.wordHeaderContainer,
                  { backgroundColor: `${levelColor}15` },
                ]}
              >
                <Text style={styles.word}>{currentWord.word}</Text>
              </View>

              {/* Bouton pour afficher/masquer la traduction */}
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

              {/* Sections définition et exemple */}
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
        )}

        {/* Indicateurs de cartes */}
        <View style={styles.cardIndicatorContainer}>
          {currentCategory?.words.map((_, index) => (
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
                        : completedWords[selectedCategoryIndex]?.includes(index)
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

        {/* Boutons de navigation */}
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: "#475569",
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
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  categoriesScrollView: {
    flexGrow: 0,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedCategoryButton: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
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