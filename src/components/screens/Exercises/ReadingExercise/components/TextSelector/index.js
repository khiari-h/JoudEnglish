import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant pour sélectionner un texte à lire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.exercises - Liste des exercices/textes
 * @param {number} props.selectedExerciseIndex - Index de l'exercice sélectionné
 * @param {Function} props.onSelectText - Fonction pour sélectionner un texte
 * @param {Object} props.scrollViewRef - Référence au ScrollView
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const TextSelector = ({
  exercises,
  selectedExerciseIndex,
  onSelectText,
  scrollViewRef,
  levelColor,
}) => {
  return (
    <View style={styles.textSelectorContainer}>
      <Text style={styles.textSelectorLabel}>Texts:</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.textsScrollView}
        contentContainerStyle={styles.textsContainer}
      >
        {exercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.textButton,
              selectedExerciseIndex === index && [
                styles.selectedTextButton,
                { borderColor: levelColor },
              ],
            ]}
            onPress={() => onSelectText(index)}
          >
            <Text
              style={[
                styles.textButtonText,
                selectedExerciseIndex === index && { color: levelColor },
              ]}
            >
              {exercise.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TextSelector;