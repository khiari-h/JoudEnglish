// src/components/screens/Exercises/GrammarExercise/index.js
import React from "react";
import BaseExercise from "../../../common/BaseExercise"; // Corrected path
import ExerciseModes from "../../../common/ExerciseModes"; // Corrected path
import useUnifiedExercise from "../../../../hooks/common/useUnifiedExercise"; // Corrected path
import { getGrammarDataByLevel } from "../../../../data/exercises/grammar"; // Corrected path

const GrammarExercise = ({ navigation }) => {
  const { mode, currentTask, progress, levelColor } = useUnifiedExercise({
    type: "grammar",
    level: "A1",
    navigation,
    tasks: getGrammarDataByLevel("A1").exercises
  });

  return (
    <BaseExercise
      title="Grammar Exercise"
      level="A1"
      levelColor={levelColor}
      progress={progress}
      onBack={navigation.goBack}
    >
      <ExerciseModes mode={mode} exerciseContent={currentTask} />
    </BaseExercise>
  );
};

export default GrammarExercise;