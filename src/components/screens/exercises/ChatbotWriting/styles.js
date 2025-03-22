import { StyleSheet } from 'react-native';

// Styles globaux partagés entre plusieurs composants
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  // Couleurs et thèmes communs
  colors: {
    background: "white",
    border: "#f1f5f9",
    lightBg: "#f8fafc",
    text: {
      primary: "#334155",
      secondary: "#64748b",
      tertiary: "#94a3b8",
    },
    input: "#f1f5f9",
  }
});

export default styles;