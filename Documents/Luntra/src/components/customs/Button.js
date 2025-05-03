import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLOR} from '../constants/color';
const Button = React.memo(({title, onPress, style, textStyle, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        styles.btn,
        {backgroundColor: color ? COLOR.PRIMARY : '#eee'},
      ]}>
      <Text style={[textStyle, styles.text, {color: color ? '#fff' : '#111'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export {Button};
