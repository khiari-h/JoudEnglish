import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Button from '../../../../../ui/Button';

/**
 * Composant d'en-tête pour l'écran d'évaluation de niveau
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.level - Niveau d'évaluation (A1, A2, etc.)
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Function} props.onGoBack - Fonction appelée lors du retour
 * @param {string} props.title - Titre personnalisé (optionnel)
 */
const AssessmentHeader = ({
  level,
  levelColor,
  onGoBack,
  title = "Level Assessment"
}) => {
  return (
    <View style={styles.headerContainer}>
      <Button
        icon="chevron-left"
        variant="text"
        size="small"
        onPress={onGoBack}
        style={styles.backButton}
      />
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default AssessmentHeader;