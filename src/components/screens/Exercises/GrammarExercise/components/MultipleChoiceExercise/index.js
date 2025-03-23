import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import Button from '../../../../../ui/Button';

/**
 * Composant pour les exercices à choix multiples
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {number|null} props.selectedOption - Index de l'option sélectionnée
 * @param {Function} props.setSelectedOption - Fonction pour définir l'option sélectionnée
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const MultipleChoiceExercise = ({
  exercise,
  selectedOption,
  setSelectedOption,
  showFeedback,
  isCorrect,
  levelColor,
}) => {
  if (!exercise || !exercise.options) return null;

  // Affichage de la phrase avec un espace pour le mot manquant
  const renderSentence = () => {
    if (!exercise.sentence) return null;

    return (
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentence}>
          {exercise.sentence.replace('___', '______')}
        </Text>
      </View>
    );
  };

  // Rendu des options de réponse
  const renderOptions = () => {
    return (
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => {
          const isCorrectOption = index === exercise.answer || option === exercise.answer;
          const isSelectedOption = selectedOption === index;
          
          // Détermine le style du bouton en fonction de l'état
          let buttonStyle = styles.optionButton;
          let textStyle = styles.optionText;
          let variant = "outlined";
          
          if (showFeedback) {
            if (isCorrectOption) {
              buttonStyle = [buttonStyle, styles.correctOption];
              textStyle = [textStyle, styles.correctOptionText];
              variant = "filled";
            } else if (isSelectedOption && !isCorrectOption) {
              buttonStyle = [buttonStyle, styles.incorrectOption];
              textStyle = [textStyle, styles.incorrectOptionText];
              variant = "filled";
            }
          } else if (isSelectedOption) {
            buttonStyle = [buttonStyle, styles.selectedOption];
            textStyle = [textStyle, styles.selectedOptionText];
          }
          
          return (
            <Button
              key={index}
              title={option}
              onPress={() => !showFeedback && setSelectedOption(index)}
              disabled={showFeedback}
              variant={variant}
              color={isSelectedOption ? levelColor : '#cbd5e1'}
              size="medium"
              style={buttonStyle}
              textStyle={textStyle}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSentence()}
      {renderOptions()}
    </View>
  );
};

export default MultipleChoiceExercise;