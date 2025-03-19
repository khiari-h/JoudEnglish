// Dashboard/components/LevelProgressModal/style.js
import { StyleSheet, Platform } from "react-native";
import theme from "../../styles/theme";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.text.dark,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  levelsScrollView: {
    maxHeight: 400,
    paddingHorizontal: theme.spacing.md,
  },
  levelCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.xs,
    marginBottom: 12,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Remplacer la référence à theme.shadows.android.small par des valeurs explicites
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  levelCardContent: {
    flex: 1,
  },
  levelTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.sm,
  },
  levelProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.xs,
    overflow: "hidden",
    marginRight: theme.spacing.sm,
  },
  levelProgressFill: {
    height: "100%",
    borderRadius: theme.borderRadius.xs,
  },
  levelProgressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    width: 35,
  },
  levelBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: theme.spacing.sm,
  },
  levelBadgeText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: theme.fontSize.sm,
  },
  closeModalButton: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: theme.fontSize.lg,
  },
});