import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import Button from '../../../../../ui/Button';

/**
 * Composant d'en-tête pour les exercices de grammaire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.level - Niveau de l'exercice (A1, A2, B1, etc.)
 * @param {string} props.levelColor - Couleur correspondant au niveau
 * @param {Object} props.navigation - Objet de navigation
 * @param {string} props.title - Titre de l'exercice (optionnel)
 */
const ExerciseHeader = ({
  level,
  levelColor,
  navigation,
  title = "Grammar Exercise"
}) => {
  return (
    <View style={styles.headerContainer}>
      <Button
        icon="chevron-left"
        variant="text"
        size="small"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.exerciseTitle}>{title}</Text>
    </View>
  );
};

export default ExerciseHeader;