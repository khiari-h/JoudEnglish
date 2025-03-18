// components/common/DotIndicator/styles.js
import { StyleSheet } from "react-native";
import theme from "../../../styles/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 24, // Assure une hauteur minimale pour le conteneur
  },
  dot: {
    // Même si la plupart des styles sont définis dynamiquement, 
    // nous pouvons ajouter une transition d'opacité (pour iOS)
    opacity: 1,
  },
});