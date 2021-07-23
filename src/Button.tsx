import React from 'react'
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

interface Props {
  text?: string
  onPress: () => void
  style?: ViewStyle
  viewStyle?: ViewStyle
  textStyle?: TextStyle
  pressStyle?: {
    view: ViewStyle
    text: TextStyle
  }
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  text,
  onPress,
  style,
  viewStyle,
  textStyle,
  pressStyle,
  disabled,
  children,
}) => {
  return (
    <Pressable onPress={onPress} style={style} disabled={disabled}>
      {({ pressed }) => (
        <View style={[styles.view, viewStyle, pressed ? { ...pressedStyles.view, ...pressStyle?.view } : null]}>
          <Text style={[styles.text, textStyle, pressed ? { ...pressedStyles.text, ...pressStyle?.text } : null]}>
            {text || children}
          </Text>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'steelblue',
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
})

const pressedStyles = StyleSheet.create({
  view: {
    opacity: 0.5,
  },
  text: {},
})
