import React from 'react';
import { View } from 'react-native';
import styles from './style';
import Button from '../../../../../common/Button';

/**
 * Composant pour les boutons d'action dans l'évaluation
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {number|null} props.selectedAnswer - Index de la réponse sélectionnée
 * @param {Function} props.onValidate - Fonction pour valider la réponse
 * @param {Function} props.onNext - Fonction pour passer à la question suivante
 * @param {Function} props.onTryAgain - Fonction pour réessayer la question
 * @param {boolean} props.isLastQuestion - Indique si c'est la dernière question
 * @param {boolean} props.isLastSection - Indique si c'est la dernière section
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const ActionButtons = ({
  showFeedback,
  selectedAnswer,
  onValidate,
  onNext,
  onTryAgain,
  isLastQuestion,
  isLastSection,
  levelColor,
}) => {
  // Bouton "Check Answer" avant la validation
  if (!showFeedback) {
    return (
      <View style={styles.actionContainer}>
        <Button
          title="Check Answer"
          onPress={onValidate}
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
  }
  
  // Boutons après validation (Try Again et Next)
  return (
    <View style={styles.actionContainer}>
      <View style={styles.actionButtonsRow}>
        {/* Bouton "Try Again" */}
        <Button
          title="Try Again"
          onPress={onTryAgain}
          variant="outlined"
          color={levelColor}
          size="medium"
          style={[styles.actionButton, styles.tryAgainButton]}
        />
        
        {/* Bouton "Next Question/Section" ou "Finish" */}
        <Button
          title={
            isLastQuestion && isLastSection
              ? "Finish"
              : isLastQuestion
              ? "Next Section"
              : "Next Question"
          }
          onPress={onNext}
          color={levelColor}
          size="medium"
          style={[styles.actionButton, styles.nextButton]}
        />
      </View>
    </View>
  );
};

export default ActionButtons;