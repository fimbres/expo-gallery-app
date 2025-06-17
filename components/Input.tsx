import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { Colors } from '../constants/colors';
import { Styles } from '../constants/styles';

export const Input: FC<TextInputProps> = ({ ...props }) => {
  return (
    <TextInput
      placeholderTextColor={Colors.placeholder}
      style={[Styles.textCaptionSmall, styles.input]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.border,
    color: Colors.black,
  },
});
