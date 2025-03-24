import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  answerOptions: {
    marginBottom: 10,
  },
  answerOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedAnswerOption: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
  },
  correctAnswerOption: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  answerOptionText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  correctAnswerText: {
    color: '#10b981',
    fontWeight: '500',
  },
});

export default styles;