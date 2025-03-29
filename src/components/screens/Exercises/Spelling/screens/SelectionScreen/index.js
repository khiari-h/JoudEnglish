import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import getLevelColor from '../../utils/getLevelColor';
import { SPELLING_OPTIONS } from '../../constants';

/**
 * Écran de sélection des exercices d'orthographe
 */
const SelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  const levelColor = getLevelColor(level);

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
        {SPELLING_OPTIONS.map((option) => (
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

export default SelectionScreen;