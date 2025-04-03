// src/components/screens/Exercises/VocabularyExercise/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import BrowseMode from './components/BrowseMode';
import ExerciseMode from './components/ExerciseMode';
import ResultsMode from './components/ResultsMode';
import useVocabularyExercise from './hooks/useVocabularyExercise'; // Corrected path

const VocabularyExercise = ({ navigation }) => {
  const {
    mode,
    currentExercise,
    progress,
    handleVocabulary,
    levelColor
  } = useVocabularyExercise({ level: "A1", navigation });

  return (
    <BaseExercise
      title="Vocabulary Exercise"
      level="A1"
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
    >
      {renderContent()}
    </BaseExercise>
  );
};

export default VocabularyExercise;