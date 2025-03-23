import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour le mode d'identification des erreurs
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {Array} props.selectedErrorIndices - Indices des mots sélectionnés comme erreurs
 * @param {Function} props.handleWordPress - Fonction pour gérer le clic sur un mot
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {Array} props.highlightedErrors - Indices des erreurs à mettre en évidence
 */
const IdentifyView = ({
  exercise,
  selectedErrorIndices,
  handleWordPress,
  showFeedback,
  highlightedErrors,
}) => {
  // Divise le texte en mots pour l'affichage et l'interaction
  const words = exercise.text.split(" ");

  return (
    <View style={styles.container}>
      {/* Zone de contenu principal */}
      <View style={styles.wordsContainer}>
        {words.map((word, index) => {
          // Détermine si le mot doit être mis en évidence
          const isHighlighted = showFeedback
            ? highlightedErrors.includes(index)
            : selectedErrorIndices.includes(index);

          // Styles conditionnels selon l'état du mot
          const wordContainerStyle = [
            styles.word,
            isHighlighted &&
              (showFeedback
                ? styles.highlightedErrorWord
                : styles.selectedErrorWord),
          ];

          const wordTextStyle = [
            styles.wordText,
            isHighlighted &&
              (showFeedback
                ? styles.highlightedErrorWordText
                : styles.selectedErrorWordText),
          ];

          return (
            <TouchableOpacity
              key={index}
              style={wordContainerStyle}
              onPress={() => handleWordPress(index)}
              disabled={showFeedback}
            >
              <Text style={wordTextStyle}>
                {word}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Instructions ou statistiques d'erreurs */}
      {!showFeedback ? (
        <Text style={styles.identifyInstructions}>
          Tap on words that contain errors. You need to find{" "}
          {exercise.errorPositions?.length || "?"} errors.
        </Text>
      ) : (
        <View style={styles.errorStatsContainer}>
          <Text style={styles.errorStatsText}>
            {highlightedErrors.length} {highlightedErrors.length === 1 ? "error" : "errors"} found.
          </Text>
          {/* Si des indices d'erreur spécifiques sont fournis, on peut les afficher ici */}
          {exercise.errorIndices && (
            <Text style={styles.errorIndicesText}>
              Error {highlightedErrors.length > 1 ? "indices" : "index"}: {highlightedErrors.join(", ")}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default IdentifyView;