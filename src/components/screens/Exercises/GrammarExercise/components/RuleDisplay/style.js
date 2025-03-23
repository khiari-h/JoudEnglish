import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  ruleExplanation: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  examplesContainer: {
    marginBottom: 16,
  },
  exampleItem: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  exampleText: {
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  rulesListContainer: {
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  ruleBullet: {
    fontSize: 16,
    color: '#64748b',
    marginRight: 8,
  },
  ruleText: {
    flex: 1,
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#fbbf24',
  },
  notesText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default styles;