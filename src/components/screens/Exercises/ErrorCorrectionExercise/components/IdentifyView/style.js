import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  word: {
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedErrorWord: {
    borderWidth: 1,
    backgroundColor: "rgba(59, 130, 246, 0.1)", // Légère couleur bleue, sera remplacée par la couleur du niveau
  },
  highlightedErrorWord: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  wordText: {
    fontSize: 16,
    color: "#334155",
  },
  selectedErrorWordText: {
    fontWeight: "500",
  },
  highlightedErrorWordText: {
    color: "#ef4444",
    fontWeight: "500",
  },
  identifyInstructions: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
  },
  errorStatsContainer: {
    marginTop: 8,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
  },
  errorStatsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 4,
  },
  errorIndicesText: {
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
  },
});

export default styles;