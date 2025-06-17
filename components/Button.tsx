import React, { FC, useState } from 'react'
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
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  variant?: 'primary' | 'outline'
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  variant = 'primary',
  containerStyle,
  textStyle,
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
        variant === 'outline' ? styles.outline : styles.primary,
        containerStyle,
        pressed && styles.pressed,
        hovered && styles.hovered,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      <Text
        style={[
          Styles.textCaptionSmall,
          variant === 'outline' ? styles.outlineText : styles.primaryText,
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  // variants
  primary: {
    backgroundColor: Colors.black,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.black,
  },

  // text
  primaryText: { color: Colors.white },
  outlineText: { color: Colors.black },

  // states
  pressed: { opacity: 0.5 },
  hovered: { opacity: 0.75 },
  disabled: { opacity: 0.3 }
});
