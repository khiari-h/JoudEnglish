import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../../ui/Button';
import styles from './style';

/**
 * Composant d'en-tête générique
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Titre de l'écran
 * @param {string} props.level - Niveau (A1, A2, etc.)
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Function} props.onBack - Fonction appelée lors du retour
 */
const Header = ({ title, level, levelColor, onBack }) => {
  return (
    <View style={styles.container}>
      <Button
        title="←"
        onPress={onBack}
        variant="text"
        color="#475569"
        size="small"
        style={styles.backButton}
        textStyle={styles.backButtonText}
      />
      {level && (
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
