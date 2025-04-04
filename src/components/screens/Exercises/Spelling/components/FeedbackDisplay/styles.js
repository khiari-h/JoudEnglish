import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  feedbackContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  correctFeedback: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  incorrectFeedback: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctSpelling: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 8,
  },
  spellingHighlight: {
    fontWeight: '600',
    color: '#334155',
  },
  feedbackExplanation: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

export default styles;