import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 15,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  enabledButton: {
    // La couleur sera définie via levelColor
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  retryButton: {
    marginRight: 10,
  },
  skipButton: {
    marginLeft: 10,
  },
  // Styles pour écrans plus petits
  ...Platform.select({
    ios: {
      actionButtonText: {
        fontSize: Platform.OS === 'ios' && Platform.isPad ? 16 : 14,
      },
    },
    android: {
      actionButtonText: {
        fontSize: 14,
      },
    },
  }),
});

export default styles;