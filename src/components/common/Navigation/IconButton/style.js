import { StyleSheet } from 'react-native';
import theme from '../../../../styles/theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  disabled: {
    opacity: 0.5
  }
});
