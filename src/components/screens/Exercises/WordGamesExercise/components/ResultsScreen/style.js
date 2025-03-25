import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f1f5f9",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  scoreText: {
    fontSize: 16,
    color: "#64748b",
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  gamesReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewGameType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },
  reviewScore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  reviewGameTitle: {
    fontSize: 14,
    color: "#64748b",
  },
  resultsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});