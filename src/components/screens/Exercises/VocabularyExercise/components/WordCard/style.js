import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  wordHeaderContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  translationToggleContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  translationContainer: {
    alignItems: "center",
  },
  translation: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  toggleHint: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  translationPlaceholder: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: "dashed",
  },
  translationPlaceholderText: {
    fontWeight: "600",
  },
  contentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  sectionText: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  exampleText: {
    fontStyle: "italic",
  },
});