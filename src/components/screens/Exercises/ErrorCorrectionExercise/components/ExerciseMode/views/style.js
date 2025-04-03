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
  correctionInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#334155",
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
    lineHeight: 24,
  },
  correctInput: {
    borderColor: "#10b981",
    backgroundColor: "#f0fdf4",
  },
  incorrectInput: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  differencesContainer: {
    backgroundColor: "#fffbeb",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#fcd34d",
    marginBottom: 16,
  },
  differencesLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#b45309",
    marginBottom: 4,
  },
  differencesText: {
    fontSize: 14,
    color: "#78350f",
    lineHeight: 20,
  },
});

export default styles;