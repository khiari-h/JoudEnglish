import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    flex: 1,
    minHeight: 48,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tryAgainButton: {
    marginRight: 8,
  },
  nextButton: {
    marginLeft: 8,
  },
});

export default styles;