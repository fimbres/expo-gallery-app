import React, { FC, ReactElement, useState } from 'react'
import {
  Pressable,
  Text,
  Platform,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native'

import { Colors } from '../constants/colors'
import { Styles } from '../constants/styles'

interface ButtonProps extends PressableProps {
  title: string
  icon?: ReactElement;
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  variant?: 'primary' | 'ghost'
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  variant = 'primary',
  containerStyle,
  textStyle,
  icon,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onHoverIn={e => {
        if (Platform.OS === 'web') setHovered(true)
      }}
      onHoverOut={e => {
        if (Platform.OS === 'web') setHovered(false)
      }}
      style={({ pressed }) => [
        styles.base,
        variant === 'ghost' ? styles.outline : styles.primary,
        containerStyle,
        pressed && styles.pressed,
        hovered && styles.hovered,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      {icon}
      <Text
        style={[
          Styles.textTitleSmall,
          variant === 'ghost' ? styles.outlineText : styles.primaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  base: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.black,
  },
  outline: {
    backgroundColor: 'transparent',
  },
  primaryText: { color: Colors.white },
  outlineText: { color: Colors.black },
  pressed: { opacity: 0.5 },
  hovered: { opacity: 0.75 },
  disabled: { opacity: 0.3 }
});
