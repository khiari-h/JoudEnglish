import theme from '../../../styles/theme';

const NavigationButton = ({ onPress, icon, disabled, levelColor }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.button,
      { borderColor: levelColor },
      disabled && styles.buttonDisabled
    ]}
  >
    <Ionicons 
      name={icon} 
      size={24} 
      color={disabled ? '#9CA3AF' : levelColor} 
    />
  </TouchableOpacity>
);
