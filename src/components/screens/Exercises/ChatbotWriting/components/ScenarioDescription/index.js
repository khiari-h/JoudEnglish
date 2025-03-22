import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../../../../ui/Button';
import styles from './styles';

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
      <Button
        title={showHelp ? "Masquer l'aide" : "Afficher l'aide"}
        onPress={toggleHelp}
        variant="text"
        color={levelColor}
        size="small"
        style={styles.helpButton}
        textStyle={styles.helpButtonText}
      />
    </View>
  );
};

export default ScenarioDescription;