import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  button: {
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white,
  },
  buttonDisabled: {
    borderColor: theme.colors.border,
    backgroundColor: '#F9FAFB',
  }
});
