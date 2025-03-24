import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Button from '../../../../../common/Button';

/**
 * Boutons de navigation pour passer entre les phrases
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onPrevious - Fonction pour aller à la phrase précédente
 * @param {Function} props.onNext - Fonction pour aller à la phrase suivante
 * @param {boolean} props.canGoToPrevious - Indique s'il est possible d'aller à la phrase précédente
 * @param {boolean} props.canGoToNext - Indique s'il est possible d'aller à la phrase suivante
 * @param {string} props.levelColor - Couleur correspondant au niveau
 */
const NavigationButtons = ({
  onPrevious,
  onNext,
  canGoToPrevious,
  canGoToNext,
  levelColor,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <Button
        title="Précédent"
        onPress={onPrevious}
        disabled={!canGoToPrevious}
        variant="outlined"
        color={levelColor}
        style={[
          styles.navButton,
          {
            opacity: canGoToPrevious ? 1 : 0.5,
          },
        ]}
      />

      <Button
        title="Suivant"
        onPress={onNext}
        disabled={!canGoToNext}
        color={levelColor}
        style={[
          styles.navButton,
          {
            opacity: canGoToNext ? 1 : 0.5,
          },
        ]}
      />
    </View>
  );
};

export default NavigationButtons;