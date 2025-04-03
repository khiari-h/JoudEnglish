import React from 'react';
import { View, TextInput } from 'react-native';
import { AudioPlayer } from '../../../../../../../common';
import styles from './style';

const SpellWord = ({ word, userInput, setUserInput, showFeedback, isCorrect, onPlay }) => {
  return (
    <View style={styles.container}>
      <AudioPlayer onPlay={onPlay} />
      <TextInput 
        value={userInput}
        onChangeText={setUserInput}
        editable={!showFeedback}
        style={[
          styles.input,
          showFeedback && (isCorrect ? styles.correctInput : styles.incorrectInput)
        ]}
      />
    </View>
  );
};

export default SpellWord;
