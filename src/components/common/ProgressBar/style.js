// components/common/ProgressBar/styles.js
import { StyleSheet } from "react-native";
import theme from "../../../styles/theme";

export default StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  progressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    marginBottom: 5,
    textAlign: "right",
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.xs,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: theme.borderRadius.xs,
  },
});