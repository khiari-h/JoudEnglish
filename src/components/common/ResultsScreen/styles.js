import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...Platform.select({
      ios: theme.shadows.ios.medium,
      android: theme.shadows.android.medium,
    }),
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.medium,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: theme.spacing.xl,
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.primary.dark,
  },
  scoreText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.medium,
    marginTop: theme.spacing.xs,
  },
  feedback: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.medium,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  details: {
    marginVertical: theme.spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    flex: 1,
  }
});
