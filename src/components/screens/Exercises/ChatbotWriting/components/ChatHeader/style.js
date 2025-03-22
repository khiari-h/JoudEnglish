import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#475569",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
});