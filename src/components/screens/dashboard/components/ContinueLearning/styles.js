import { StyleSheet } from 'react-native';
import theme from '../../../../../styles/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    ...theme.shadows.ios.medium,
  },
  pressed: {
    opacity: 0.9,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  exerciseInfo: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.medium,
    marginTop: 2,
  },
  timestamp: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.light,
    marginTop: 4,
  },
  progressContainer: {
    justifyContent: 'center',
  },
  progressText: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.primary.main,
  }
});
