import React from 'react';
import { View } from 'react-native';
import styles from './style';
import Button from '../../../../../common/Button';

/**
 * Boutons d'action pour les exercices de lecture
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {number|null} props.selectedAnswer - Index de la réponse sélectionnée
 * @param {boolean} props.isCorrect - Indique si la réponse est correcte
 * @param {number} props.attempts - Nombre de tentatives
 * @param {boolean} props.canGoPrevious - Si on peut aller à la question précédente
 * @param {boolean} props.isLastQuestion - Si c'est la dernière question
 * @param {Function} props.onSubmit - Fonction pour soumettre la réponse
 * @param {Function} props.onNext - Fonction pour aller à la question suivante
 * @param {Function} props.onPrevious - Fonction pour aller à la question précédente
 * @param {Function} props.onRetry - Fonction pour réessayer
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ActionButtons = ({
  showFeedback,
  selectedAnswer,
  isCorrect,
  attempts,
  canGoPrevious,
  isLastQuestion,
  onSubmit,
  onNext,
  onPrevious,
  onRetry,
  levelColor,
}) => {
  if (!showFeedback) {
    // Bouton de vérification
    return (
      <View style={styles.actionContainer}>
        <Button
          title="Check Answer"
          onPress={onSubmit}
          disabled={selectedAnswer === null}
          color={levelColor}
          size="large"
          fullWidth
          style={[
            styles.actionButton,
            selectedAnswer === null && styles.disabledButton,
          ]}
        />
      </View>
    );
  } else if (isCorrect) {
    // Boutons Navigation (Précédent/Suivant)
    return (
      <View style={styles.actionContainer}>
        <View style={styles.buttonGroup}>
          <Button
            title="Previous"
            onPress={onPrevious}
            disabled={!canGoPrevious}
            variant="outlined"
            color={levelColor}
            size="medium"
            style={[
              styles.navButton,
              styles.prevButton,
              { opacity: canGoPrevious ? 1 : 0.5 },
            ]}
          />
          
          <Button
            title={isLastQuestion ? "Complete" : "Next Question"}
            onPress={onNext}
            color={levelColor}
            size="medium"
            style={[styles.navButton, styles.nextButton]}
          />
        </View>
      </View>
    );
  } else {
    // Boutons de réessai ou de saut
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

export default ActionButtons;