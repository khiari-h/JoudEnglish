import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant permettant de sélectionner un scénario de conversation
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.scenarios - Liste des scénarios disponibles
 * @param {number} props.selectedIndex - Index du scénario actuellement sélectionné
 * @param {Function} props.onScenarioChange - Fonction appelée lors du changement de scénario
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const ScenarioSelector = ({ scenarios, selectedIndex, onScenarioChange, levelColor }) => {
  const scrollViewRef = useRef(null);
  
  // Faire défiler pour centrer le scénario sélectionné
  useEffect(() => {
    if (scrollViewRef.current && scenarios.length > 0) {
      scrollViewRef.current.scrollTo({
        x: selectedIndex * 110, // Largeur approximative de chaque bouton
        animated: true,
      });
    }
  }, [selectedIndex]);
  
  // Si aucun scénario n'est disponible
  if (!scenarios || scenarios.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.categoryLabel}>Scénarios :</Text>
        <Text style={styles.noScenariosText}>Aucun scénario disponible</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.categoryLabel}>Scénarios :</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {scenarios.map((scenarioItem, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedIndex === index && [
                styles.selectedButton,
                { borderColor: levelColor },
              ],
            ]}
            onPress={() => onScenarioChange(index)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedIndex === index && { color: levelColor },
              ]}
            >
              {scenarioItem.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScenarioSelector;