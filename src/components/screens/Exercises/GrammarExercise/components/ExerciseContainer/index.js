import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

// Import des composants d'exercices spécifiques
import MultipleChoiceExercise from '../MultipleChoiceExercise';
import FillBlankExercise from '../FillBlankExercise';

/**
 * Conteneur pour les différents types d'exercices de grammaire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {number|null} props.selectedOption - Option sélectionnée (pour choix multiples)
 * @param {Function} props.setSelectedOption - Fonction pour définir l'option sélectionnée
 * @param {string} props.inputText - Texte saisi par l'utilisateur (pour remplir les blancs)
 * @param {Function} props.setInputText - Fonction pour définir le texte saisi
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ExerciseContainer = ({
  exercise,
  selectedOption,
  setSelectedOption,
  inputText,
  setInputText,
  showFeedback,
  isCorrect,
  levelColor,
}) => {
  if (!exercise) return null;

  // Déterminer le type d'exercice à afficher
  const renderExerciseContent = () => {
    // Exercice à choix multiples (fill in the blank avec options)
    if (exercise.type === 'fillInTheBlank' && exercise.options) {
      return (
        <MultipleChoiceExercise
          exercise={exercise}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          levelColor={levelColor}
        />
      );
    } 
    // Exercice de type "fill in the blank" sans options ou transformation
    else if (exercise.type === 'fillInTheBlank' || exercise.type === 'transformation') {
      return (
        <FillBlankExercise
          exercise={exercise}
          inputText={inputText}
          setInputText={setInputText}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          levelColor={levelColor}
        />
      );
    }
    // Pour les types d'exercices non pris en charge
    else {
      return (
        <View style={styles.unsupportedContainer}>
          <Text style={styles.unsupportedText}>
            This exercise type is not supported yet.
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{exercise.question}</Text>
      {renderExerciseContent()}
    </View>
  );
};

export default ExerciseContainer;