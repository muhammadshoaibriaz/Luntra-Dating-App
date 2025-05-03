import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

export const BlurButton = React.memo(({text}) => {
  return (
    <View style={styles.blurButtonWrapper}>
      <BlurView blurAmount={10} style={styles.blur} blurType="light">
        <Text style={styles.kmText}>{text} away</Text>
      </BlurView>
    </View>
  );
});

const styles = StyleSheet.create({
  blurButtonWrapper: {
    overflow: 'hidden',
    borderRadius: 50,
    position: 'relative',
    borderWidth: 1.3,
    borderColor: '#ddd',
  },
  blur: {
    width: 100,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kmText: {
    fontWeight: '900',
    color: '#fff',
    fontSize: 12,
  },
});
