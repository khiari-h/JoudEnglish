// ExerciseSelection/style.js
import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    padding: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  levelBadgeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  levelBadgeText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: width * 0.8,
    lineHeight: 22,
  },
  exercisesContainer: {
    paddingHorizontal: 16,
  },
});