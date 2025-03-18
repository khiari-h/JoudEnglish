// Dashboard/components/LanguageTips/styles.js
import { StyleSheet, Platform, Dimensions } from "react-native";
import theme from "../../styles/theme";

const { width } = Dimensions.get("window");

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
  tipsContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  tipCardContainer: {
    width: width - 40,
  },
  tipCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    ...Platform.select({
      android: theme.shadows.android.medium,
      ios: theme.shadows.ios.medium,
    }),
  },
  tipIconContainer: {
    backgroundColor: "#F1F2FF",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.sm,
  },
  tipDescription: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.light,
    lineHeight: 20,
  },
  // Dots indicator
  dotIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});