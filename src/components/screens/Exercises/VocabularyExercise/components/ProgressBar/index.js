import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Progress bar component to show completion status
 */
const ProgressBar = ({ progress, completed, total, levelColor }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: levelColor },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{completed}/{total}</Text>
    </View>
  );
};

export default ProgressBar;