// src/components/screens/Exercises/GrammarExercise/components/FeedbackDisplay/index.js
import React from "react";
import ExerciseFeedback from "../../../../../common/exerciceFeedback";

const FeedbackDisplay = ({ isCorrect, exercise, attempts, levelColor }) => {
  return (
    <ExerciseFeedback
      isCorrect={isCorrect}
      explanation={
        isCorrect ? exercise.correctFeedback : exercise.incorrectFeedback
      }
      hint={!isCorrect ? exercise.hint : undefined}
      attempts={attempts}
      style={{ marginHorizontal: 20, marginTop: 16 }}
      animationType="fadeIn"
    />
  );
};

export default FeedbackDisplay;
