import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "white",
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollViewContent: {
    paddingRight: 20,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedButton: {
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  noScenariosText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#94a3b8',
    marginTop: 4
  }
});