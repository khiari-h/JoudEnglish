import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  sentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sentence: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionButton: {
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#10b981',
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: '#ef4444',
    fontWeight: '500',
  },
});

export default styles;