import { StyleSheet, Platform } from "react-native";
import theme from "../../../../../styles/theme";

export default StyleSheet.create({
  sectionContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text.dark,
  },
  nextChallengeText: {
    color: theme.colors.text.light,
    fontSize: 14,
  },
  dailyChallengeCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    borderLeftWidth: 4,
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
    }),
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  challengeBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  challengeBadgeText: {
    color: "#D97706",
    fontWeight: "600",
    fontSize: 12,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text.dark,
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 16,
    color: theme.colors.text.medium,
    marginBottom: 20,
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.text.light,
    marginBottom: 5,
    textAlign: "right",
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  startChallengeButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  startChallengeText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
