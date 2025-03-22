import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant affichant la description du scénario actuel avec bouton d'aide
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.description - Description du scénario
 * @param {boolean} props.showHelp - État d'affichage de l'aide (visible/caché)
 * @param {Function} props.toggleHelp - Fonction pour basculer l'affichage de l'aide
 * @param {string} props.levelColor - Couleur associée au niveau actuel
 */
const ScenarioDescription = ({ description, showHelp, toggleHelp, levelColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        {description || "Pratiquez vos compétences d'écriture dans cette conversation."}
      </Text>
      <TouchableOpacity 
        style={styles.helpButton} 
        onPress={toggleHelp}
      >
        <Text style={[styles.helpButtonText, { color: levelColor }]}>
          {showHelp ? "Masquer l'aide" : "Afficher l'aide"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScenarioDescription;