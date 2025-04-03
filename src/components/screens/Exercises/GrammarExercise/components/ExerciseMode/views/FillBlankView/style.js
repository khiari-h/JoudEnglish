import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  sentence: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  textInput: {
    minWidth: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    textAlign: 'center',
    paddingVertical: 4,
  },
  correctInput: {
    borderBottomColor: '#10b981',
    color: '#10b981',
  },
  incorrectInput: {
    borderBottomColor: '#ef4444',
    color: '#ef4444',
  }
});
