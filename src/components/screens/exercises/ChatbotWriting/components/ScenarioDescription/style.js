import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: "#64748b",
    marginRight: 10,
    lineHeight: 18,
  },
  helpButton: {
    padding: 8,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});