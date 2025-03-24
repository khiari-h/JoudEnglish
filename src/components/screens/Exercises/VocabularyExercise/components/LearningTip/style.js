import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  tipContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tipContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1f2937",
  },
  tipText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  tipCloseButton: {
    marginLeft: 12,
    padding: 4,
  },
  tipCloseText: {
    fontSize: 16,
    color: "#9ca3af",
  },
});