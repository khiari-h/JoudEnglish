// ExerciseSelection/components/ExerciseCard/style.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  exerciseCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  exerciseTopSection: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  exerciseIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  exerciseIcon: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginRight: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    width: 35,
    textAlign: "right",
  },
  newBadgeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  newBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  startButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  startButton: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});