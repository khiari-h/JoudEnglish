import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../../../../../../ui/Button';
import styles from './style';

const MultipleChoiceView = ({ 
  exercise, 
  selectedOption, 
  setSelectedOption, 
  showFeedback, 
  isCorrect,
  levelColor 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{exercise.question}</Text>
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => (
          <Button
            key={index}
            title={option}
            onPress={() => !showFeedback && setSelectedOption(index)}
            disabled={showFeedback}
            variant={showFeedback && index === selectedOption ? "filled" : "outlined"}
            color={levelColor}
            style={[
              styles.optionButton,
              showFeedback && index === selectedOption && 
                (isCorrect ? styles.correctOption : styles.incorrectOption)
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default MultipleChoiceView;
