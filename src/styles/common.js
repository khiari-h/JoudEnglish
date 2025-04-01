import { StyleSheet, Platform } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  // Layout
  layout: {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  // Components
  components: {
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      ...theme.shadows[Platform.OS].medium,
    },
    button: {
      base: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: theme.fontSize.md,
        fontWeight: '600',
      },
    },
  },

  // Typography
  typography: {
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: 'bold',
      color: theme.colors.text.dark,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.text.medium,
    },
  },
});
