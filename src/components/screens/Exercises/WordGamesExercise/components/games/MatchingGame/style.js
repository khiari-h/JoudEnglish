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
  matchingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  matchingTile: {
    width: "48%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  selectedMatchingTile: {
    borderWidth: 2,
    backgroundColor: "#f8fafc",
  },
  matchedTile: {
    opacity: 0.7,
  },
  matchingText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
  },
  progressInfoContainer: {
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