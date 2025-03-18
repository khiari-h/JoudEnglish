// components/common/SectionHeader/styles.js
import { StyleSheet } from "react-native";
import theme from "../../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.colors.text.dark,
  },
  actionText: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: theme.fontSize.md,
  },
});