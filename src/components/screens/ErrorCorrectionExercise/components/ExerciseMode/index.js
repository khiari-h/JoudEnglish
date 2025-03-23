import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  Animated 
} from "react-native";
import styles from "./style";
import Button from "../../../../../common/Button";

// Import des sous-composants (à implémenter ultérieurement)
import FullCorrectionView from "../FullCorrectionView";
import IdentifyView from "../IdentifyView";
import MultipleChoiceView from "../MultipleChoiceView";
import FeedbackDisplay from "../FeedbackDisplay";
import ProgressBar from "../ProgressBar";

/**
 * Composant pour le mode exercice qui gère les différents types d'exercices
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.exercises - Liste des exercices
 * @param {number} props.currentExerciseIndex - Index de l'exercice actuel
 * @param {string} props.userCorrection - Correction entrée par l'utilisateur (mode full)
 * @param {Function} props.setUserCorrection - Fonction pour définir la correction
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {string} props.correctionMode - Mode de correction (full, identify, multiple_choice)
 * @param {Array} props.selectedErrorIndices - Indices des mots identifiés comme erreurs
 * @param {Function} props.handleWordPress - Fonction pour gérer le clic sur un mot
 * @param {number} props.selectedChoiceIndex - Index de l'option sélectionnée
 * @param {Function} props.handleChoiceSelect - Fonction pour sélectionner une option
 * @param {boolean} props.showHint - Indique si l'indice est visible
 * @param {Function} props.setShowHint - Fonction pour afficher/masquer l'indice
 * @param {Array} props.highlightedErrors - Indices des erreurs mises en évidence
 * @param {Function} props.checkCorrection - Fonction pour vérifier la correction
 * @param {Function} props.goToNextExercise - Fonction pour passer à l'exercice suivant
 * @param {Function} props.setViewMode - Fonction pour changer de mode d'affichage
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Animated.Value} props.fadeAnim - Valeur d'animation pour le fade
 * @param {Animated.Value} props.scaleAnim - Valeur d'animation pour le scale
 */
const ExerciseMode = ({
  exercises,
  currentExerciseIndex,
  userCorrection,
  setUserCorrection,
  showFeedback,
  isCorrect,
  correctionMode,
  selectedErrorIndices,
  handleWordPress,
  selectedChoiceIndex,
  handleChoiceSelect,
  showHint,
  setShowHint,
  highlightedErrors,
  checkCorrection,
  goToNextExercise,
  setViewMode,
  levelColor,
  fadeAnim,
  scaleAnim,
}) => {
  if (exercises.length === 0 || currentExerciseIndex >= exercises.length) {
    return (
      <View style={styles.emptyExerciseContainer}>
        <Text style={styles.emptyExerciseText}>No exercises available.</Text>
        <Button
          title="Back to Browse"
          onPress={() => setViewMode("browse")}
          color={levelColor}
          size="medium"
          style={styles.backToBrowseButton}
        />
      </View>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.exerciseContainer}>
      {/* Barre de progression */}
      <ProgressBar 
        currentIndex={currentExerciseIndex}
        totalCount={exercises.length}
        color={levelColor}
      />

      <ScrollView
        style={styles.exerciseScrollView}
        contentContainerStyle={styles.exerciseContent}
      >
        <Animated.View
          style={[
            styles.exerciseCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.exerciseTypeLabel}>
            {correctionMode === "full"
              ? "Full Correction"
              : correctionMode === "identify"
              ? "Identify Errors"
              : "Multiple Choice"}
          </Text>

          <Text style={styles.instructionText}>
            {correctionMode === "full"
              ? "Edit the text to correct all errors:"
              : correctionMode === "identify"
              ? "Tap on words that contain errors:"
              : "Select the correct version:"}
          </Text>

          {/* Contenu spécifique à chaque mode d'exercice */}
          {correctionMode === "full" && (
            <FullCorrectionView 
              exercise={currentExercise}
              userCorrection={userCorrection}
              setUserCorrection={setUserCorrection}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
            />
          )}

          {correctionMode === "identify" && (
            <IdentifyView 
              exercise={currentExercise}
              selectedErrorIndices={selectedErrorIndices}
              handleWordPress={handleWordPress}
              showFeedback={showFeedback}
              highlightedErrors={highlightedErrors}
            />
          )}

          {correctionMode === "multiple_choice" && (
            <MultipleChoiceView 
              exercise={currentExercise}
              selectedChoiceIndex={selectedChoiceIndex}
              handleChoiceSelect={handleChoiceSelect}
              showFeedback={showFeedback}
              correctChoiceIndex={currentExercise.correctChoiceIndex}
              levelColor={levelColor}
            />
          )}

          {/* Bouton d'indice */}
          {!showFeedback && (
            <Button
              title={showHint ? "Hide Hint" : "Show Hint"}
              onPress={() => setShowHint(!showHint)}
              variant="outlined"
              color={levelColor}
              size="small"
              style={styles.hintButton}
            />
          )}

          {/* Affichage de l'indice */}
          {showHint && (
            <View
              style={[
                styles.hintContainer,
                { backgroundColor: `${levelColor}10` },
              ]}
            >
              <Text style={styles.hintText}>{currentExercise.hint}</Text>
            </View>
          )}

          {/* Affichage du feedback */}
          {showFeedback && (
            <FeedbackDisplay 
              isCorrect={isCorrect}
              correctionMode={correctionMode}
              exercise={currentExercise}
            />
          )}
        </Animated.View>
      </ScrollView>

      {/* Actions du bas d'écran */}
      <View style={styles.exerciseActions}>
        {!showFeedback ? (
          <Button
            title="Check Answer"
            onPress={checkCorrection}
            color={levelColor}
            size="large"
            fullWidth
            disabled={
              (correctionMode === "full" && userCorrection.trim() === "") ||
              (correctionMode === "identify" && selectedErrorIndices.length === 0) ||
              (correctionMode === "multiple_choice" && selectedChoiceIndex === null)
            }
            style={styles.checkButton}
          />
        ) : (
          <Button
            title={currentExerciseIndex < exercises.length - 1 ? "Next Exercise" : "See Results"}
            onPress={goToNextExercise}
            color={levelColor}
            size="large"
            fullWidth
            style={styles.nextButton}
          />
        )}

        <Button
          title="Exit"
          onPress={() => setViewMode("browse")}
          variant="outlined"
          color={levelColor}
          size="medium"
          fullWidth
          style={styles.exitButton}
        />
      </View>
    </View>
  );
};

export default ExerciseMode;