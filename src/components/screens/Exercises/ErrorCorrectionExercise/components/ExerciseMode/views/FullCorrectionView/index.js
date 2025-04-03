import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./style";

const FullCorrectionView = ({
  exercise,
  userCorrection,
  setUserCorrection,
  showFeedback,
  isCorrect,
}) => {
  return (
    <View style={styles.container}>
      {/* Texte original */}
      <View style={styles.originalTextContainer}>
        <Text style={styles.originalTextLabel}>Original text:</Text>
        <Text style={styles.originalText}>{exercise.text}</Text>
      </View>

      {/* Zone de correction */}
      <TextInput
        style={[
          styles.correctionInput,
          showFeedback &&
            (isCorrect ? styles.correctInput : styles.incorrectInput),
        ]}
        value={userCorrection}
        onChangeText={setUserCorrection}
        multiline
        placeholder="Type the corrected text here..."
        placeholderTextColor="#94a3b8"
        editable={!showFeedback}
      />
    </View>
  );
};

export default FullCorrectionView;
