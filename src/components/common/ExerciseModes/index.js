const ExerciseModes = ({ mode, exerciseContent, onModeChange }) => {
  const modes = {
    browse: <BrowseMode content={exerciseContent.browse} />,
    exercise: <ExerciseMode content={exerciseContent.exercise} />,
    results: <ResultsMode content={exerciseContent.results} />
  };
  return modes[mode] || null;
};

export default ExerciseModes;
