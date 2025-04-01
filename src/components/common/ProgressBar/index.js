// components/common/ProgressBar/index.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ProgressBar = ({
  current,
  total,
  levelColor,
  showText = true,
  style
}) => {
  const progress = Math.round((current / total) * 100);
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.progressTrack}>
        <View 
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: levelColor }
          ]}
        />
      </View>
      {showText && (
        <Text style={styles.progressText}>
          {current} / {total}
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;

