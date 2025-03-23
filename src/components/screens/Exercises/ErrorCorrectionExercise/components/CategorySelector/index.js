import React from "react";
import { View, FlatList } from "react-native";
import styles from "./style";
import Button from "../../../../../ui/Button";

/**
 * Composant pour la sélection des catégories d'exercices
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.categories - Liste des catégories disponibles
 * @param {string} props.selectedCategoryId - ID de la catégorie sélectionnée
 * @param {Function} props.onCategorySelect - Fonction appelée lors de la sélection d'une catégorie
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Object} props.style - Styles supplémentaires pour le conteneur
 */
const CategorySelector = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  levelColor,
  style,
}) => {
  // Si pas de catégories, ne rien afficher
  if (!categories || categories.length === 0) {
    return null;
  }

  // Fonction de rendu pour chaque item de catégorie
  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategoryId === item.id;

    return (
      <Button
        title={item.name}
        onPress={() => onCategorySelect(item.id)}
        variant={isSelected ? "outlined" : "text"}
        color={levelColor}
        size="small"
        style={[
          styles.categoryButton,
          isSelected && [
            styles.selectedCategoryButton,
            { borderColor: levelColor },
          ],
        ]}
        textStyle={
          isSelected
            ? [styles.categoryButtonText, { color: levelColor }]
            : styles.categoryButtonText
        }
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CategorySelector;
