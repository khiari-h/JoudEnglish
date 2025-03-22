import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant affichant une section d'aide contextuelle
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.helpText - Texte d'aide à afficher
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const HelpSection = ({ helpText, levelColor }) => {
  return (
    <View style={[styles.container, { borderColor: `${levelColor}30` }]}>
      <Text style={styles.title}>Indice :</Text>
      <Text style={styles.text}>
        {helpText || "Aucun indice disponible pour cette étape."}
      </Text>
    </View>
  );
};

export default HelpSection;