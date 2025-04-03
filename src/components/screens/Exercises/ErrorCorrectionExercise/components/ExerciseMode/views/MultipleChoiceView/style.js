import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  originalTextContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalTextLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  originalText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  choicesLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 12,
  },
  choices: {
    marginBottom: 16,
  },
  choiceOption: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedChoiceOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctChoiceOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  incorrectChoiceOption: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  choiceOptionInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  choiceIndicator: {
    width: 28,
    height: 28, 
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  correctChoiceIndicator: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  incorrectChoiceIndicator: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },
  choiceIndicatorText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#64748b",
  },
  choiceOptionText: {
    flex: 1,
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  correctChoiceText: {
    color: "#10b981",
    fontWeight: "500",
  },
  incorrectChoiceText: {
    color: "#ef4444",
    fontWeight: "500",
  },
  choiceExplanationContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  choiceExplanationLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 4,
  },
  choiceExplanationText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    fontStyle: "italic",
  },
});

export default styles;