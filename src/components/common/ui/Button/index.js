import React from 'react';
import { Pressable, Text } from 'react-native';
import theme from '../../../../styles/theme';

const Button = ({
  title,
  onPress,
  variant = 'filled',
  color,
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  children,
  ...props
}) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    if (variant === 'outlined' || variant === 'text') return 'transparent';
    return color || theme.colors.primary.main;
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.border;
    return color || theme.colors.primary.main;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.light;
    if (variant === 'outlined' || variant === 'text') return color || theme.colors.primary.main;
    return theme.colors.white;
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return theme.spacing.sm;
      case 'large': return theme.spacing.lg;
      default: return theme.spacing.md;
    }
  };

  const buttonStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: getPadding(),
    backgroundColor: getBackgroundColor(),
    borderRadius: theme.borderRadius.md,
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: getBorderColor(),
    }),
    opacity: disabled ? 0.6 : 1,
  };

  const labelStyle = {
    color: getTextColor(),
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={({ pressed }) => [
        buttonStyle,
        style,
        pressed && { opacity: 0.8 },
      ]}
      android_ripple={variant !== 'text' ? {
        color: theme.colors.primary.light,
        borderless: false,
      } : null}
      {...props}
    >
      {({ pressed }) => (
        <>
          {typeof children === 'function' 
            ? children({ pressed })
            : children || (
              <Text style={[labelStyle, textStyle]}>
                {title}
              </Text>
            )
          }
        </>
      )}
    </Pressable>
  );
};

export default Button;
