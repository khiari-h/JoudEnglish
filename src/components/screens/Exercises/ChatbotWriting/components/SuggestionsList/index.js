import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './style';

/**
 * Composant affichant une liste horizontale de suggestions de messages
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.suggestions - Liste des suggestions de messages
 * @param {Function} props.onSuggestionPress - Fonction appelée lorsqu'une suggestion est sélectionnée
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const SuggestionsList = ({ suggestions, onSuggestionPress, levelColor }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {suggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.suggestionBubble, { borderColor: levelColor }]}
          onPress={() => onSuggestionPress(suggestion)}
        >
          <Text style={[styles.suggestionText, { color: levelColor }]}>
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SuggestionsList;