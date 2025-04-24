import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

export const BlurButton = React.memo(({text}) => {
  return (
    <View style={styles.blurButtonWrapper}>
      <BlurView
        blurAmount={10}
        style={styles.blur}
        // reducedTransparencyFallbackColor="white"
        blurType="light">
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
  },
  blur: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  kmText: {
    fontWeight: '900',
    color: '#fff',
    fontSize: 12,
  },
});
