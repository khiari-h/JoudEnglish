// components/common/JoudLogo/styles.js
import { StyleSheet } from "react-native";
import theme from "../../../styles/theme";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  background: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
  },
  text: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  tagline: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.white,
    marginTop: 2,
  },
});