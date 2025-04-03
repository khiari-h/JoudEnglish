const ListeningExercise = ({ navigation }) => {
  // ...existing hooks and state...

  const renderActions = () => (
    <AudioControls
      onNext={handleNext}
      onPrevious={handlePrevious}
      onPlay={handlePlay}
      onPause={handlePause}
      levelColor={levelColor}
    />
  );

  return (
    <BaseExercise
      title="Listening Exercise"
      level={level}
      levelColor={levelColor}
      progress={progress}
      onBack={handleGoBack}
      renderActions={renderActions}
    >
      <AudioPlayer />
      <QuestionSection />
    </BaseExercise>
  );
};
