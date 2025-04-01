import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import Button from '../../../../../common/ui/Button';

/**
 * Composant pour la sélection des règles grammaticales
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.rules - Liste des règles grammaticales
 * @param {number} props.selectedRuleIndex - Index de la règle sélectionnée
 * @param {Function} props.onRuleChange - Fonction appelée lors du changement de règle
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const RuleSelector = ({
  rules,
  selectedRuleIndex,
  onRuleChange,
  levelColor,
}) => {
  // Si pas de règles, ne rien afficher
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rulesContainer}
      >
        {rules.map((rule, index) => (
          <Button
            key={index}
            title={rule.title}
            onPress={() => onRuleChange(index)}
            variant="text"
            color={levelColor}
            size="small"
            style={[
              styles.ruleButton,
              selectedRuleIndex === index && { 
                borderColor: levelColor, 
                borderWidth: 2 
              }
            ]}
            textStyle={[
              styles.ruleButtonText,
              selectedRuleIndex === index && { 
                color: levelColor, 
                fontWeight: '600' 
              }
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RuleSelector;