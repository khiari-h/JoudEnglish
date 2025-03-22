import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    maxHeight: 60,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  contentContainer: {
    padding: 10,
    alignItems: "center",
  },
  suggestionBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: "white",
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
  },
});