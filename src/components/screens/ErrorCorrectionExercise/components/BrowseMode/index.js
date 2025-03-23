import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./style";
import Button from "../../../../../common/Button";

/**
 * Composant pour la navigation et la sélection des exercices
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.exercisesData - Données des exercices disponibles
 * @param {string} props.selectedCategory - ID de la catégorie sélectionnée
 * @param {Function} props.setSelectedCategory - Fonction pour changer la catégorie
 * @param {Array} props.exercises - Liste des exercices filtrés par catégorie
 * @param {Function} props.startExercise - Fonction pour démarrer un exercice
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const BrowseMode = ({
  exercisesData,
  selectedCategory,
  setSelectedCategory,
  exercises,
  startExercise,
  levelColor,
}) => {
  // Rendu d'une catégorie
  const renderCategoryItem = ({ item }) => (
    <Button
      title={item.name}
      onPress={() => setSelectedCategory(item.id)}
      variant={selectedCategory === item.id ? "outlined" : "text"}
      color={levelColor}
      size="small"
      style={[
        styles.categoryButton,
        selectedCategory === item.id && { borderColor: levelColor }
      ]}
      textStyle={
        selectedCategory === item.id ? { color: levelColor } : { color: "#64748b" }
      }
    />
  );

  return (
    <ScrollView
      style={styles.browseContainer}
      contentContainerStyle={styles.browseContent}
    >
      <Text style={styles.sectionTitle}>Select Error Type</Text>

      {exercisesData && exercisesData.categories && (
        <FlatList
          horizontal
          data={exercisesData.categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesListContent}
        />
      )}

      <View style={styles.exerciseModesContainer}>
        <Text style={styles.exerciseModesTitle}>Choose Exercise Mode:</Text>

        {/* Mode de correction complète */}
        <Button
          title="Full Correction"
          onPress={() => startExercise("full")}
          variant="text"
          disabled={exercises.length === 0}
          color={levelColor}
          style={[styles.modeCard, { borderColor: levelColor }]}
          textStyle={styles.modeTitle}
          icon={
            <View style={[styles.modeIconContainer, { backgroundColor: `${levelColor}20` }]}>
              <Text style={[styles.modeIcon, { color: levelColor }]}>✏️</Text>
            </View>
          }
        >
          <View style={styles.modeDetails}>
            <Text style={styles.modeDescription}>
              Correct the entire sentence by editing the text
            </Text>
          </View>
        </Button>

        {/* Mode d'identification d'erreurs */}
        <Button
          title="Identify Errors"
          onPress={() => startExercise("identify")}
          variant="text"
          disabled={exercises.length === 0}
          color={levelColor}
          style={[styles.modeCard, { borderColor: levelColor }]}
          textStyle={styles.modeTitle}
          icon={
            <View style={[styles.modeIconContainer, { backgroundColor: `${levelColor}20` }]}>
              <Text style={[styles.modeIcon, { color: levelColor }]}>🔍</Text>
            </View>
          }
        >
          <View style={styles.modeDetails}>
            <Text style={styles.modeDescription}>
              Tap on words that contain errors
            </Text>
          </View>
        </Button>

        {/* Mode de choix multiples */}
        <Button
          title="Multiple Choice"
          onPress={() => startExercise("multiple_choice")}
          variant="text"
          disabled={exercises.length === 0}
          color={levelColor}
          style={[styles.modeCard, { borderColor: levelColor }]}
          textStyle={styles.modeTitle}
          icon={
            <View style={[styles.modeIconContainer, { backgroundColor: `${levelColor}20` }]}>
              <Text style={[styles.modeIcon, { color: levelColor }]}>📝</Text>
            </View>
          }
        >
          <View style={styles.modeDetails}>
            <Text style={styles.modeDescription}>
              Choose the correct version from options
            </Text>
          </View>
        </Button>
      </View>

      <View style={styles.categoryDescription}>
        {selectedCategory && exercisesData && (
          <Text style={styles.categoryDescriptionText}>
            {exercisesData.categories.find((c) => c.id === selectedCategory)
              ?.description ||
              "Improve your English by identifying and correcting common errors."}
          </Text>
        )}

        <Text style={styles.exerciseCount}>
          {exercises.length} {exercises.length === 1 ? "exercise" : "exercises"}{" "}
          available
        </Text>
      </View>
    </ScrollView>
  );
};

export default BrowseMode;