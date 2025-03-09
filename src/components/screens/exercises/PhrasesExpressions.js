import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Imports des données de phrases
import phrasesA1Data from "../../../data/exercises/phrases/phrasesA1";
// Futurs niveaux: import phrasesA2Data from "../../../data/exercises/phrases/phrasesA2"; etc.

const PhrasesExpressions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: "A1" };

  // États pour suivre la progression
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  // Couleur basée sur le niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#3b82f6";
  };
  const levelColor = getLevelColor(level);

  // Récupérer les données de phrases en fonction du niveau
  const getPhrasesData = (level) => {
    switch (level) {
      case "A1":
        return phrasesA1Data;
      // Futurs niveaux: case 'A2': return phrasesA2Data; etc.
      default:
        return phrasesA1Data;
    }
  };

  const phrasesData = getPhrasesData(level);
  const currentCategory = phrasesData.categories[selectedCategoryIndex];
  const currentPhrases = phrasesData.phrases.filter(
    (phrase) => phrase.categoryId === currentCategory.id
  );
  const currentPhrase = currentPhrases[selectedPhraseIndex];

  // Ouvrir le modal de détails
  const openPhraseDetails = (phrase) => {
    setSelectedPhrase(phrase);
  };

  // Modal de détails de phrase
  const PhraseDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedPhrase}
      onRequestClose={() => setSelectedPhrase(null)}
    >
      {selectedPhrase && (
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Détails de la Phrase</Text>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Phrase Originale:</Text>
              <Text style={styles.detailText}>{selectedPhrase.english}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Traduction:</Text>
              <Text style={styles.detailText}>
                {selectedPhrase.translation}
              </Text>
            </View>

            {selectedPhrase.context && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Contexte:</Text>
                <Text style={styles.detailText}>{selectedPhrase.context}</Text>
              </View>
            )}

            {selectedPhrase.examples && selectedPhrase.examples.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Exemples:</Text>
                {selectedPhrase.examples.map((example, index) => (
                  <View key={index} style={styles.exampleItem}>
                    <Text style={styles.exampleSpoken}>{example.english}</Text>
                    <Text style={styles.exampleContext}>
                      Traduction: {example.translation}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {selectedPhrase.notes && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Notes:</Text>
                <Text style={styles.detailText}>{selectedPhrase.notes}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setSelectedPhrase(null)}
            >
              <Text style={styles.closeModalButtonText}>Fermer</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.exerciseTitle}>Phrases & Expressions</Text>
      </View>

      {/* Sélecteur de catégories */}
      <View style={styles.categorySelector}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {phrasesData.categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategoryIndex === index && {
                  borderColor: levelColor,
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                setSelectedCategoryIndex(index);
                setSelectedPhraseIndex(0);
              }}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategoryIndex === index && {
                    color: levelColor,
                    fontWeight: "600",
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  ((selectedPhraseIndex + 1) / currentPhrases.length) * 100
                }%`,
                backgroundColor: levelColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {selectedPhraseIndex + 1}/{currentPhrases.length}
        </Text>
      </View>

      {/* Liste des phrases */}
      <ScrollView
        style={[styles.scrollView, { backgroundColor: `${levelColor}05` }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Phrase courante */}
        <View style={styles.phraseContainer}>
          <Text style={styles.phraseTitle}>{currentCategory.name}</Text>

          <View style={styles.phraseCard}>
            <Text style={styles.phraseEnglish}>{currentPhrase.english}</Text>
            <Text style={styles.phraseTranslation}>
              {currentPhrase.translation}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => openPhraseDetails(currentPhrase)}
            >
              <Text style={styles.detailsButtonText}>Voir les détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Boutons de navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              opacity: selectedPhraseIndex > 0 ? 1 : 0.5,
              backgroundColor: `${levelColor}15`,
            },
          ]}
          onPress={() => {
            if (selectedPhraseIndex > 0) {
              setSelectedPhraseIndex(selectedPhraseIndex - 1);
            }
          }}
          disabled={selectedPhraseIndex === 0}
        >
          <Text style={[styles.navButtonText, { color: levelColor }]}>
            Précédent
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: levelColor,
              opacity:
                selectedPhraseIndex < currentPhrases.length - 1 ? 1 : 0.5,
            },
          ]}
          onPress={() => {
            if (selectedPhraseIndex < currentPhrases.length - 1) {
              setSelectedPhraseIndex(selectedPhraseIndex + 1);
            }
          }}
          disabled={selectedPhraseIndex === currentPhrases.length - 1}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de détails */}
      <PhraseDetailModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#475569',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  categorySelector: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    backgroundColor: 'white',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  phraseContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  phraseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  phraseCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  phraseEnglish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  phraseTranslation: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e293b',
  },
  detailSection: {
    marginBottom: 15,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  detailText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  exampleItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#e0e0e0',
  },
  exampleSpoken: {
    fontSize: 15,
    color: '#0f172a',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  exampleContext: {
    fontSize: 14,
    color: '#64748b',
  },
  closeModalButton: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  }
});

export default PhrasesExpressions;