// components/common/AnimatedCard/styles.js
import { StyleSheet, Platform } from "react-native";
import theme from "../../../styles/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
    ...Platform.select({
      android: theme.shadows.android.medium,
      ios: theme.shadows.ios.medium,
    }),
  },
});