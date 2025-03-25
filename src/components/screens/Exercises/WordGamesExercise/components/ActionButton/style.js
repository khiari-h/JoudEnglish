import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  actionContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 6,
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  enabledButton: {
    backgroundColor: "#3b82f6",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});