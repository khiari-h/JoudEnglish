import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  resultsContent: {
    padding: 16,
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
    lineHeight: 24,
  },
  exercisesReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  reviewItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewItemNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  reviewStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctStatusBadge: {
    backgroundColor: "#10b981",
  },
  incorrectStatusBadge: {
    backgroundColor: "#ef4444",
  },
  reviewStatusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  reviewItemText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
  },
  reviewItemSolution: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 8,
  },
  reviewItemExplanation: {
    fontSize: 13,
    color: "#64748b",
    fontStyle: "italic",
    lineHeight: 18,
  },
  resultsButtons: {
    marginTop: 10,
  },
  tryAgainButton: {
    marginBottom: 10,
  },
  backToBrowseButton: {
    marginBottom: 10,
  },
});

export default styles;