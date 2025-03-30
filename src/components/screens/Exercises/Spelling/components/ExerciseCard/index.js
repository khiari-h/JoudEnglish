import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import FeedbackDisplay from "../FeedbackDisplay";
import styles from "./styles";
import { useAnimations } from "../../../../../../hooks/common";

/**
 * Composant pour afficher une carte d'exercice
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.exercise - Données de l'exercice actuel
 * @param {string} props.userAnswer - Entrée de l'utilisateur
 * @param {Function} props.setUserAnswer - Setter pour l'entrée utilisateur
 * @param {boolean} props.showFeedback - Indique si le feedback doit être affiché
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {boolean} props.hasHint - Indique si un indice est disponible
 * @param {boolean} props.showHint - Indique si l'indice doit être affiché
 * @param {Function} props.toggleHint - Fonction pour afficher/masquer l'indice
 * @param {string} props.levelColor - Couleur du niveau
 * @returns {JSX.Element} Composant ExerciseCard
 */
const ExerciseCard = ({
  exercise,
  userAnswer,
  setUserAnswer,
  showFeedback,
  isCorrect,
  hasHint,
  showHint,
  toggleHint,
  levelColor,
}) => {
  // Utilisation du hook d'animations global
  const { animatedStyles } = useAnimations({
    initialValues: { fade: 1, scale: 1 },
  });

  // Si pas d'exercice, ne rien rendre
  if (!exercise) return null;

  const isRuleExercise = exercise.rule !== undefined;

  return (
    <Animated.View style={[styles.exerciseCard, animatedStyles.combined]}>
      {/* Affichage de la règle si c'est un exercice de règle */}
      {isRuleExercise && (
        <View style={styles.ruleContainer}>
          <Text style={styles.ruleLabel}>Rule:</Text>
          <Text style={styles.ruleText}>{exercise.rule}</Text>
        </View>
      )}

      {/* Instruction */}
      <Text style={styles.instruction}>{exercise.instruction}</Text>

      {/* Affichage du mot à corriger pour les exercices de correction */}
      {!isRuleExercise && exercise.wordToCorrect && (
        <View style={styles.wordContainer}>
          <Text style={styles.wordToCorrect}>"{exercise.wordToCorrect}"</Text>
          {exercise.errorCount && (
            <Text style={styles.errorCount}>
              (Contains {exercise.errorCount} error
              {exercise.errorCount > 1 ? "s" : ""})
            </Text>
          )}
        </View>
      )}

      {/* Zone de saisie utilisateur */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            showFeedback &&
              (isCorrect ? styles.correctInput : styles.incorrectInput),
            {
              borderColor: showFeedback
                ? isCorrect
                  ? "#10b981"
                  : "#ef4444"
                : "#cbd5e1",
            },
          ]}
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder={
            isRuleExercise
              ? "Enter your answer..."
              : "Enter the correct spelling..."
          }
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!showFeedback}
        />

        {/* Bouton d'indice */}
        {hasHint && !showFeedback && (
          <TouchableOpacity
            style={[styles.hintButton, { borderColor: levelColor }]}
            onPress={toggleHint}
          >
            <Text style={[styles.hintButtonText, { color: levelColor }]}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Affichage de l'indice */}
      {showHint && !showFeedback && (
        <View
          style={[styles.hintContainer, { backgroundColor: `${levelColor}10` }]}
        >
          <Text style={styles.hintText}>{exercise.hint}</Text>
        </View>
      )}

      {/* Affichage du feedback */}
      {showFeedback && (
        <FeedbackDisplay
          isCorrect={isCorrect}
          correctAnswer={exercise.correctAnswer}
          explanation={exercise.explanation}
        />
      )}
    </Animated.View>
  );
};

export default ExerciseCard;
