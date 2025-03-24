import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Indicateurs de progression des questions
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.totalQuestions - Nombre total de questions
 * @param {number} props.currentIndex - Index de la question actuelle
 * @param {Array} props.completedQuestions - Indices des questions complétées
 * @param {Function} props.onSelectQuestion - Fonction pour sélectionner une question
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const QuestionIndicators = ({
  totalQuestions,
  currentIndex,
  completedQuestions,
  onSelectQuestion,
  levelColor,
}) => {
  // Si pas de questions, ne rien afficher
  if (!totalQuestions) return null;
  
  // Créer un tableau d'indices pour les questions
  const questionIndices = Array.from({ length: totalQuestions }, (_, i) => i);
  
  return (
    <View style={styles.questionIndicatorContainer}>
      {questionIndices.map((index) => {
        // Déterminer la couleur et la taille en fonction de l'état
        const isCurrentQuestion = currentIndex === index;
        const isCompleted = completedQuestions.includes(index);
        
        const backgroundColor = isCurrentQuestion
          ? levelColor
          : isCompleted
          ? `${levelColor}50` // Couleur semi-transparente pour les questions complétées
          : "#e5e7eb";
          
        const size = isCurrentQuestion ? 12 : 8;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectQuestion(index)}
          >
            <View
              style={[
                styles.questionIndicator,
                {
                  backgroundColor,
                  width: size,
                  height: size,
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuestionIndicators;