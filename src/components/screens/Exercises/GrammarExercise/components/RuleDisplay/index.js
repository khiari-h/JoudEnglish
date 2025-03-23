import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher une règle grammaticale avec ses explications et exemples
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.rule - La règle grammaticale à afficher
 */
const RuleDisplay = ({ rule }) => {
  if (!rule) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ruleTitle}>{rule.title}</Text>
      <Text style={styles.ruleExplanation}>{rule.explanation}</Text>
      
      {/* Exemples */}
      {rule.examples && rule.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          <Text style={styles.sectionTitle}>Examples:</Text>
          {rule.examples.map((example, index) => (
            <View key={index} style={styles.exampleItem}>
              <Text style={styles.exampleText}>{example.english}</Text>
              <Text style={styles.exampleTranslation}>{example.french}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Règles */}
      {rule.rules && rule.rules.length > 0 && (
        <View style={styles.rulesListContainer}>
          <Text style={styles.sectionTitle}>Rules:</Text>
          {rule.rules.map((ruleItem, index) => (
            <View key={index} style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>{ruleItem}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Notes supplémentaires si disponibles */}
      {rule.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.sectionTitle}>Notes:</Text>
          <Text style={styles.notesText}>{rule.notes}</Text>
        </View>
      )}
    </View>
  );
};

export default RuleDisplay;