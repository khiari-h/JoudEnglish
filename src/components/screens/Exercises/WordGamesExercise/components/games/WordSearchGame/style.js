import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gameContainer: {
    width: "100%",
  },
  gameInstructions: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
    lineHeight: 22,
  },
  wordSearchGrid: {
    marginBottom: 20,
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gridCell: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCell: {
    borderWidth: 2,
  },
  gridCellText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTracker: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "right",
  },
  wordsToFindContainer: {
    marginBottom: 16,
  },
  wordsToFindTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  wordsToFindList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordToFind: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 10,
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
  },
  foundWord: {
    textDecorationLine: "line-through",
  },
  hintContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },
});