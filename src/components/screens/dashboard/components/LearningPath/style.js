// Dashboard/components/LearningPath/style.js
import { StyleSheet, Platform } from "react-native";
import theme from "../../styles/theme";

export default StyleSheet.create({
  sectionContainer: {
    marginVertical: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.text.dark,
  },
  seeAllText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  learningPathCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    // Remplacer la référence à theme.shadows.android.medium par des valeurs explicites
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
  learningPathContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learningPathTextContainer: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  learningPathTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: 5,
  },
  learningPathSubtitle: {
    fontSize: theme.fontSize.md,
    color: "rgba(255,255,255,0.9)",
  },
  learningPathIconContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  learningPathIcon: {
    fontSize: 32,
  },
  viewProgressButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  viewProgressText: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: theme.fontSize.md,
  },
});