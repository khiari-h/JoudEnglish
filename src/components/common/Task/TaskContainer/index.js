import React from 'react';
import { View } from 'react-native';
import styles from './style';

const TaskContainer = ({ 
  children, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default TaskContainer;
