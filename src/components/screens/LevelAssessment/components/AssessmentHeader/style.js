import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    elevation: 2, // Pour une meilleure ombre sur Android
    zIndex: 1, // Assurer que l'en-tête est au-dessus des autres éléments
  },
  backButton: {
    marginRight: 15,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: 'center', // Centrer verticalement
    alignItems: 'center', // Centrer horizontalement
    minWidth: 36, // Largeur minimale
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
});

export default styles;