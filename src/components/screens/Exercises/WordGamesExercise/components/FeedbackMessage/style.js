import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  correctFeedback: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#10b981",
  },
  incorrectFeedback: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
  },
  feedbackText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  correctAnswerText: {
    fontSize: 15,
    color: "#475569",
    marginTop: 8,
  },
  answerHighlight: {
    fontWeight: "600",
    color: "#334155",
  },
});