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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: "#475569",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  wordTile: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  selectedWordTile: {
    borderWidth: 2,
  },
  wordTileText: {
    fontSize: 16,
    color: "#334155",
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
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