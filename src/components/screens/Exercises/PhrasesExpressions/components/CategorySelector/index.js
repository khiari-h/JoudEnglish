import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour la sélection des catégories de phrases
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.categories - Liste des catégories
 * @param {number} props.selectedCategoryIndex - Index de la catégorie sélectionnée
 * @param {Function} props.onSelectCategory - Fonction pour sélectionner une catégorie
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const CategorySelector = ({
  categories,
  selectedCategoryIndex,
  onSelectCategory,
  levelColor,
}) => {
  if (!categories || !categories.length) return null;

  return (
    <View style={styles.categorySelector}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategoryIndex === index && {
                borderColor: levelColor,
                borderWidth: 2,
              },
            ]}
            onPress={() => onSelectCategory(index)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategoryIndex === index && {
                  color: levelColor,
                  fontWeight: "600",
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySelector;