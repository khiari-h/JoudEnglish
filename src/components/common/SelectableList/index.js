import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Button from '../../ui/Button';
import styles from './style';

const SelectableList = ({
  items,
  selectedIndex,
  onSelect,
  levelColor,
  label,
  horizontal = true
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <Button
              key={index}
              title={item.title || item}
              onPress={() => onSelect(index)}
              variant="text"
              color={levelColor}
              size="small"
              style={[
                styles.item,
                isSelected && [
                  styles.selectedItem,
                  { borderColor: levelColor }
                ]
              ]}
              textStyle={[
                styles.itemText,
                isSelected && { color: levelColor }
              ]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SelectableList;
