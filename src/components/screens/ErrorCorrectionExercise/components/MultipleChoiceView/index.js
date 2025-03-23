import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour le mode choix multiple
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {number|null} props.selectedChoiceIndex - Index de l'option sélectionnée
 * @param {Function} props.handleChoiceSelect - Fonction pour sélectionner une option
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {number} props.correctChoiceIndex - Index de l'option correcte
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const MultipleChoiceView = ({
  exercise,
  selectedChoiceIndex,
  handleChoiceSelect,
  showFeedback,
  correctChoiceIndex,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      {/* Texte original */}
      <View style={styles.originalTextContainer}>
        <Text style={styles.originalTextLabel}>Original text:</Text>
        <Text style={styles.originalText}>{exercise.text}</Text>
      </View>

      {/* Titre des choix */}
      <Text style={styles.choicesLabel}>Choose the correct version:</Text>

      {/* Options de choix */}
      <View style={styles.choices}>
        {exercise.choices &&
          exercise.choices.map((choice, index) => {
            // Détermine les styles conditionnels pour chaque option
            const isSelected = selectedChoiceIndex === index;
            const isCorrect = index === correctChoiceIndex;
            const isWrongSelection = showFeedback && isSelected && !isCorrect;

            // Styles pour le conteneur de l'option
            const optionContainerStyle = [
              styles.choiceOption,
              isSelected && [styles.selectedChoiceOption, { borderColor: levelColor }],
              showFeedback && isCorrect && styles.correctChoiceOption,
              isWrongSelection && styles.incorrectChoiceOption,
            ];

            // Styles pour le texte de l'option
            const optionTextStyle = [
              styles.choiceOptionText,
              isSelected && !showFeedback && { color: levelColor },
              showFeedback && isCorrect && styles.correctChoiceText,
              isWrongSelection && styles.incorrectChoiceText,
            ];

            return (
              <TouchableOpacity
                key={index}
                style={optionContainerStyle}
                onPress={() => handleChoiceSelect(index)}
                disabled={showFeedback}
              >
                <View style={styles.choiceOptionInner}>
                  {/* Indicateur de l'option (A, B, C, etc.) */}
                  <View style={[
                    styles.choiceIndicator,
                    isSelected && { backgroundColor: levelColor, borderColor: levelColor },
                    showFeedback && isCorrect && styles.correctChoiceIndicator,
                    isWrongSelection && styles.incorrectChoiceIndicator,
                  ]}>
                    <Text style={[
                      styles.choiceIndicatorText,
                      isSelected && { color: "white" },
                      showFeedback && (isCorrect || isWrongSelection) && { color: "white" },
                    ]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  
                  {/* Texte de l'option */}
                  <Text style={optionTextStyle}>{choice}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>

      {/* Explication optionnelle (visible uniquement après la réponse) */}
      {showFeedback && exercise.choiceExplanations && exercise.choiceExplanations[selectedChoiceIndex] && (
        <View style={styles.choiceExplanationContainer}>
          <Text style={styles.choiceExplanationLabel}>
            Why this {selectedChoiceIndex === correctChoiceIndex ? "is correct" : "is incorrect"}:
          </Text>
          <Text style={styles.choiceExplanationText}>
            {exercise.choiceExplanations[selectedChoiceIndex]}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MultipleChoiceView;