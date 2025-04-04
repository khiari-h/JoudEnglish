import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  scoreText: {
    fontSize: 16,
    color: '#64748b',
  },
  resultsFeedback: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  answersReview: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  ruleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 12,
  },
  wordToCorrect: {
    color: '#334155',
  },
  reviewAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAnswerLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  reviewAnswer: {
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  correctAnswer: {
    backgroundColor: '#f0fdf4',
    color: '#10b981',
  },
  incorrectAnswer: {
    backgroundColor: '#fef2f2',
    color: '#ef4444',
  },
  correctionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  correctionLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  correctionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#10b981',
  },
  explanationText: {
    fontSize: 14,
    color: '#475569',
    fontStyle: 'italic',
    marginTop: 8,
  },
  resultsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultsButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  resultsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;