import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButton: {
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    marginRight: 10,
  },
  nextButton: {
    marginLeft: 10,
  },
  navButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});