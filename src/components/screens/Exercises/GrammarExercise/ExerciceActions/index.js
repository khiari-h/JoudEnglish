import React from 'react';
import { View } from 'react-native';
import styles from './style';
import Button from '../../../../../ui/Button';

/**
 * Composant pour les actions d'exercice (vérifier, suivant, précédent, etc.)
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {number} props.attempts - Nombre de tentatives
 * @param {Function} props.onCheck - Fonction pour vérifier la réponse
 * @param {Function} props.onNext - Fonction pour passer à l'exercice suivant
 * @param {Function} props.onPrevious - Fonction pour revenir à l'exercice précédent
 * @param {Function} props.onRetry - Fonction pour réessayer l'exercice
 * @param {boolean} props.isLastExercise - Indique si c'est le dernier exercice
 * @param {boolean} props.canCheck - Indique si la vérification est possible
 * @param {number} props.currentExerciseIndex - Index de l'exercice actuel
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ExerciseActions = ({
  showFeedback,
  isCorrect,
  attempts,
  onCheck,
  onNext,
  onPrevious,
  onRetry,
  isLastExercise,
  canCheck = true,
  currentExerciseIndex,
  levelColor,
}) => {
  // Rendu des boutons d'action en fonction de l'état
  if (!showFeedback) {
    // Bouton "Check" quand l'utilisateur n'a pas encore validé sa réponse
    return (
      <View style={styles.actionContainer}>
        <Button
          title="Check"
          onPress={onCheck}
          disabled={!canCheck}
          color={levelColor}
          size="large"
          fullWidth
          style={[
            styles.actionButton,
            !canCheck ? styles.disabledButton : styles.enabledButton
          ]}
        />
      </View>
    );
  } else if (isCorrect) {
    // Boutons "Previous" et "Next" quand la réponse est correcte
    return (
      <View style={styles.actionContainer}>
        <View style={styles.buttonGroup}>
          <Button
            title="Previous"
            onPress={onPrevious}
            disabled={currentExerciseIndex === 0}
            variant="outlined"
            color={levelColor}
            size="medium"
            style={[
              styles.navButton,
              styles.prevButton,
              { opacity: currentExerciseIndex > 0 ? 1 : 0.5 }
            ]}
          />
          
          <Button
            title={isLastExercise ? 'Finish' : 'Next'}
            onPress={onNext}
            color={levelColor}
            size="medium"
            style={[styles.navButton, styles.nextButton]}
          />
        </View>
      </View>
    );
  } else {
    // Boutons "Try Again" et "Skip" quand la réponse est incorrecte
    return (
      <View style={styles.actionContainer}>
        <View style={styles.buttonGroup}>
          <Button
            title="Try Again"
            onPress={onRetry}
            variant="outlined"
            color={levelColor}
            size="medium"
            style={[styles.navButton, styles.retryButton]}
          />
          
          {attempts > 1 && (
            <Button
              title="Skip"
              onPress={onNext}
              color={levelColor}
              size="medium"
              style={[styles.navButton, styles.skipButton]}
            />
          )}
        </View>
      </View>
    );
  }
};

export default ExerciseActions;