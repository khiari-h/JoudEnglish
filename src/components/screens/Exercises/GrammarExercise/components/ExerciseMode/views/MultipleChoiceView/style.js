import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 12,
    paddingVertical: 14,
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  }
});
