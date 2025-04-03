import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    padding: theme.spacing.md,
  },
  exerciseContainer: {
    flex: 1,
  },
  feedbackContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  navigationContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  }
});
