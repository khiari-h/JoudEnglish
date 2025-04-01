import React from 'react';
import { View } from 'react-native';
import Button from '../../ui/Button';
import styles from './styles';

const ExerciseActions = ({
  showFeedback,
  canCheck,
  onCheck,
  onNext,
  onPrevious,
  onRetry,
  isLastQuestion,
  levelColor,
}) => {
  if (showFeedback) {
    return (
      <View style={styles.container}>
        {onPrevious && (
          <Button
            title="Previous"
            onPress={onPrevious}
            variant="outlined"
            color={levelColor}
            style={styles.button}
          />
        )}
        <Button
          title={isLastQuestion ? "Finish" : "Next"}
          onPress={onNext}
          color={levelColor}
          style={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Check Answer"
        onPress={onCheck}
        color={levelColor}
        disabled={!canCheck}
        style={styles.button}
      />
    </View>
  );
};

export default ExerciseActions;
