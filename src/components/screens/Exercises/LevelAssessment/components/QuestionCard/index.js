import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './style';

// Import des composants
import AnswerOptions from '../AnswerOptions';
import FeedbackDisplay from '../FeedbackDisplay';

/**
 * Carte de question pour l'évaluation de niveau
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.sectionTitle - Titre de la section
 * @param {Object} props.question - Données de la question
 * @param {number|null} props.selectedAnswer - Index de la réponse sélectionnée
 * @param {Function} props.onSelectAnswer - Fonction pour sélectionner une réponse
 * @param {boolean} props.showFeedback - Indique si le feedback est visible
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Animated.Value} props.fadeAnim - Valeur d'animation pour les effets de fondu
 */
const QuestionCard = ({
  sectionTitle,
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  levelColor,
  fadeAnim,
}) => {
  if (!question) return null;

  return (
    <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
      {/* Titre de la section */}
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      
      {/* Texte de la question */}
      <Text style={styles.questionText}>{question.text}</Text>
      
      {/* Options de réponse */}
      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
        showFeedback={showFeedback}
        correctAnswer={question.correctAnswer}
        levelColor={levelColor}
      />
      
      {/* Feedback après réponse */}
      {showFeedback && (
        <FeedbackDisplay
          isCorrect={selectedAnswer === question.correctAnswer}
          explanation={question.explanation}
        />
      )}
    </Animated.View>
  );
};

export default QuestionCard;