import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  categoriesScrollView: {
    flexGrow: 0,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
    backgroundColor: "white",
  },
  selectedCategoryButton: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
});