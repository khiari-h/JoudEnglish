import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";

/**
 * Component for selecting vocabulary categories
 */
const CategorySelector = ({
  categories,
  selectedCategoryIndex,
  onSelectCategory, // Changé de handleCategoryChange à onSelectCategory
  levelColor,
}) => {
  return (
    <View style={styles.categorySelector}>
      <Text style={styles.categoryLabel}>Categories:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategoryIndex === index && [
                styles.selectedCategoryButton,
                { borderColor: levelColor },
              ],
            ]}
            onPress={() => onSelectCategory(index)} // Utiliser onSelectCategory au lieu de handleCategoryChange
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategoryIndex === index && { color: levelColor },
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySelector;
