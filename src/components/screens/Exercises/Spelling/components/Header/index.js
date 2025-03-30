import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import getLevelColor from '../../../../utils/getLevelColor';

/**
 * Composant d'en-tête pour les écrans d'exercice
 * @param {Object} props - Propriétés du composant
 * @param {string} props.level - Niveau de difficulté (A1, A2, etc.)
 * @param {string} props.title - Titre de l'écran
 * @returns {JSX.Element} - Composant Header
 */
const Header = ({ level, title }) => {
  const navigation = useNavigation();
  const levelColor = getLevelColor(level);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;