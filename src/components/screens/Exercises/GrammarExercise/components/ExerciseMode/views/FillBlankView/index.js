import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';

const FillBlankView = ({ exercise, inputText, setInputText, showFeedback, isCorrect }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentence}>
          {exercise.sentence.split('___').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index !== array.length - 1 && (
                <TextInput
                  style={[
                    styles.textInput,
                    showFeedback && (isCorrect ? styles.correctInput : styles.incorrectInput)
                  ]}
                  value={inputText}
                  onChangeText={setInputText}
                  editable={!showFeedback}
                />
              )}
            </React.Fragment>
          ))}
        </Text>
      </View>
    </View>
  );
};

export default FillBlankView;
