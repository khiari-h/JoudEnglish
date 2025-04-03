// src/components/screens/Exercises/ErrorCorrectionExercise/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import BrowseMode from './components/BrowseMode';
import ExerciseMode from './components/ExerciseMode';
import ResultsMode from './components/ResultsMode';
import useErrorCorrection from './hooks/useErrorCorrection';

const ErrorCorrectionExercise = ({ navigation }) => {
  const {
    mode,
    currentExercise,
    progress,
    handleCorrection,
    levelColor
  } = useErrorCorrection({ level: "A1", navigation });

  const renderContent = () => {
    switch(mode) {
      case 'browse': 
        return <BrowseMode />;
      case 'exercise': 
        return <ExerciseMode 
          exercise={currentExercise} 
          onCorrection={handleCorrection}
          levelColor={levelColor}
        />;
      case 'results': 
        return <ResultsMode />;
      default:
        return null;
    }
  };

  return (
    <BaseExercise
      title="Error Correction"
      level="A1"
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
    >
      {renderContent()}
    </BaseExercise>
  );
};

export default ErrorCorrectionExercise;
