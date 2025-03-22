import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    paddingVertical: 12,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64748b",
  },
});