import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  exerciseContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  exerciseScrollView: {
    flex: 1,
  },
  exerciseContent: {
    padding: 16,
    paddingBottom: 30,
  },
  exerciseCard: {
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
  exerciseTypeLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  hintButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  hintContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 20,
  },
  exerciseActions: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  checkButton: {
    marginBottom: 10,
  },
  nextButton: {
    marginBottom: 10,
  },
  exitButton: {
    marginBottom: 10,
  },
  emptyExerciseContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  emptyExerciseText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  backToBrowseButton: {
    marginTop: 10,
  }
});

export default styles;