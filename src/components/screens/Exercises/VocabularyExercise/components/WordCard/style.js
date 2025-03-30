import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  wordHeaderContainer: {
    padding: 20,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  translationToggleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  translationContainer: {
    alignItems: "center",
  },
  translation: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  toggleHint: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  translationPlaceholder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 20,
  },
  translationPlaceholderText: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4b5563",
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },
  exampleText: {
    fontStyle: "italic",
  },
});
