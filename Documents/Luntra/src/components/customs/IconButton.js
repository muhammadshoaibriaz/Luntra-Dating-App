import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const IconButton = React.memo(({children, style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.icon, style]}>
      {children}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {IconButton};
