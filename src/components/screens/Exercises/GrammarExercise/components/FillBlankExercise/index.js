import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';

/**
 * Composant pour les exercices à trous (fill in the blank) et de transformation
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {string} props.inputText - Texte saisi par l'utilisateur
 * @param {Function} props.setInputText - Fonction pour définir le texte saisi
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const FillBlankExercise = ({
  exercise,
  inputText,
  setInputText,
  showFeedback,
  isCorrect,
  levelColor,
}) => {
  if (!exercise) return null;

  // Pour les exercices de transformation (reformulation de phrase)
  if (exercise.type === 'transformation') {
    return (
      <View style={styles.container}>
        <View style={styles.transformationContainer}>
          <Text style={styles.originalSentence}>{exercise.original}</Text>
          <Text style={styles.transformInstruction}>{exercise.instruction || "Transform the sentence:"}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.fullTextInput,
                showFeedback && isCorrect ? styles.correctTextInput : null,
                showFeedback && !isCorrect ? styles.incorrectTextInput : null,
              ]}
              value={inputText}
              onChangeText={text => !showFeedback && setInputText(text)}
              placeholder="Write your answer here..."
              multiline={true}
              editable={!showFeedback}
            />
          </View>
        </View>
      </View>
    );
  }

  // Pour les exercices de type "fill in the blank"
  const renderFillBlank = () => {
    if (!exercise.sentence) return null;

    // Diviser la phrase autour du caractère de remplacement (généralement ___)
    const parts = exercise.sentence.split('___');
    
    return (
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentence}>
          {parts[0]}
          <TextInput
            style={[
              styles.textInput,
              showFeedback && isCorrect ? styles.correctTextInput : null,
              showFeedback && !isCorrect ? styles.incorrectTextInput : null,
              { borderBottomColor: isCorrect ? '#10b981' : levelColor }
            ]}
            value={inputText}
            onChangeText={text => !showFeedback && setInputText(text)}
            placeholder="..."
            editable={!showFeedback}
          />
          {parts[1]}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderFillBlank()}
      
      {/* Afficher l'indice si disponible */}
      {exercise.hint && !showFeedback && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{exercise.hint}</Text>
        </View>
      )}
    </View>
  );
};

export default FillBlankExercise;