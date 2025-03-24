import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './style';

/**
 * Learning tip component that displays a helpful tip
 */
const LearningTip = ({ tipFadeAnim, dismissTip }) => {
  return (
    <Animated.View
      style={[styles.tipContainer, { opacity: tipFadeAnim }]}
    >
      <View style={styles.tipContent}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipTextContainer}>
          <Text style={styles.tipTitle}>Learning Tip</Text>
          <Text style={styles.tipText}>
            For better memorization, try to visualize each word or search
            for images online to create mental associations.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.tipCloseButton}
        onPress={dismissTip}
      >
        <Text style={styles.tipCloseText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LearningTip;