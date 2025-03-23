import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  sentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sentence: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
    textAlign: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    minWidth: 60,
    textAlign: 'center',
    fontSize: 16,
    padding: 4,
    color: '#334155',
  },
  correctTextInput: {
    borderBottomColor: '#10b981',
    color: '#10b981',
  },
  incorrectTextInput: {
    borderBottomColor: '#ef4444',
    color: '#ef4444',
  },
  transformationContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalSentence: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
  transformInstruction: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  fullTextInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 8,
    fontSize: 16,
    color: '#334155',
  },
  hintContainer: {
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#fbbf24',
  },
  hintText: {
    fontSize: 14,
    color: '#92400e',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default styles;