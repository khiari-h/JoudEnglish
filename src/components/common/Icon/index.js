import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../../../styles/common';

const Icon = ({
  name,
  size = 24,
  color,
  background,
  isEmoji,
  style
}) => {
  const containerStyle = [
    commonStyles.iconContainer,
    background && { backgroundColor: background },
    style
  ];

  return (
    <View style={containerStyle}>
      {isEmoji ? (
        <Text style={[commonStyles.icon, color && { color }]}>{name}</Text>
      ) : (
        <Ionicons name={name} size={size} color={color} />
      )}
    </View>
  );
};

export default Icon;
