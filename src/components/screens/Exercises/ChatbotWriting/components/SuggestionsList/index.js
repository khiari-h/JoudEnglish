import React from 'react';
import { ScrollView } from 'react-native';
import Button from '../../../../../ui/Button'; 
import styles from './styles';

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
        <Button
          key={index}
          title={suggestion}
          onPress={() => onSuggestionPress(suggestion)}
          variant="outlined"
          color={levelColor}
          size="small"
          style={styles.suggestionBubble}
          textStyle={styles.suggestionText}
        />
      ))}
    </ScrollView>
  );
};

export default SuggestionsList;