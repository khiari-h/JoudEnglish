import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Button from '../../../../../common/ui/Button';

/**
 * Composant pour afficher le texte de lecture
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Exercice contenant le texte
 * @param {boolean} props.expanded - Si le texte est développé ou non
 * @param {Function} props.onToggleExpand - Fonction pour développer/réduire le texte
 * @param {Function} props.onWordPress - Fonction pour gérer le clic sur un mot
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ReadingText = ({
  exercise,
  expanded,
  onToggleExpand,
  onWordPress,
  levelColor,
}) => {
  if (!exercise) return null;

  // Rendu du texte complet avec mots clickables
  const renderFullText = () => {
    // Diviser le texte en mots
    return exercise.text.split(" ").map((word, index) => {
      // Nettoyer le mot de la ponctuation pour la vérification
      const cleanWord = word.replace(/[.,!?;:""]/g, "");
      const hasDefinition =
        exercise.vocabulary && exercise.vocabulary[cleanWord];

      return (
        <TouchableOpacity
          key={index}
          disabled={!hasDefinition}
          onPress={() => hasDefinition && onWordPress(cleanWord)}
          style={styles.wordContainer}
        >
          <Text
            style={[
              styles.textWord,
              hasDefinition && styles.highlightedWord,
            ]}
          >
            {word}{" "}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={[
        styles.textContainer,
        !expanded && styles.collapsedTextContainer,
      ]}
    >
      <Text style={styles.textTitle}>{exercise.title}</Text>

      {expanded ? (
        <View style={styles.fullTextContainer}>
          {renderFullText()}
        </View>
      ) : (
        <Text style={styles.collapsedText}>
          {exercise.text.substring(0, 100)}...
        </Text>
      )}

      <Button
        title={expanded ? "Collapse Text" : "Expand Text"}
        onPress={onToggleExpand}
        variant="outlined"
        color={levelColor}
        size="small"
        style={styles.expandButton}
      />
    </View>
  );
};

export default ReadingText;