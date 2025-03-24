import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  textContainer: {
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
  collapsedTextContainer: {
    maxHeight: 150,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  fullTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordContainer: {
    flexDirection: 'row',
  },
  textWord: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  highlightedWord: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  collapsedText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  expandButton: {
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

export default styles;