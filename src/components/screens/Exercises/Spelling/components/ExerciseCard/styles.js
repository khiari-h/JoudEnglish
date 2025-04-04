import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  ruleContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  ruleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    lineHeight: 22,
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  wordToCorrect: {
    fontSize: 24,
    fontWeight: '500',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorCount: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    marginBottom: 10,
  },
  correctInput: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  incorrectInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  hintButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hintContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 15,
    color: '#475569',
    fontStyle: 'italic',
  },
});

export default styles;