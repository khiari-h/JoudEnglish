import React from "react";
import BaseExercise from "../../../common/BaseExercise";
import BrowseMode from './components/BrowseMode';
import ExerciseMode from './components/ExerciseMode';
import ResultsMode from './components/ResultsMode';
import useSpellingExercise from './hooks/useSpellingExercise';

const SpellingExercise = ({ navigation }) => {
  const {
    mode,
    currentExercise,
    progress,
    handleSpelling,
    levelColor
  } = useSpellingExercise({ level: "A1", navigation });

  const renderContent = () => {
    switch(mode) {
      case 'browse': return <BrowseMode />;
      case 'exercise': return <ExerciseMode />;
      case 'results': return <ResultsMode />;
      default: return null;
    }
  };

  return (
    <BaseExercise
      title="Spelling Exercise"
      level="A1"
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
    >
      {renderContent()}
    </BaseExercise>
  );
};

export default SpellingExercise;
