import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  correctContainer: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#10b981",
  },
  incorrectContainer: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
  },
  message: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
});
