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
  lastActivityCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  lastActivityContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lastActivityIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lastActivityDetails: {
    flex: 1,
  },
  lastActivityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text.dark,
    marginBottom: 2,
  },
  lastActivityTopic: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.text.light,
    width: 35,
  },
  continueButtonContainer: {
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
