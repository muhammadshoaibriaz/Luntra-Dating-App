import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {COLOR} from '../constants/color';
export const Story = React.memo(({item}) => {
  return (
    <View style={styles.storyContainer}>
      <TouchableOpacity
        style={styles.story}
        onPress={() => {}}
        activeOpacity={1}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/images/user.jpeg')}
            style={styles.image}
          />
        </View>
        <Text numberOfLines={1} style={styles.text}>
          Shabii🥀
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  story: {
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 100,
    justifyContent: 'center',
    zIndex: -1,
    backgroundColor: COLOR.PRIMARY,
  },
  text: {
    fontSize: 11,
    marginTop: 2,
  },
  storyContainer: {
    paddingVertical: 8,
  },
});
