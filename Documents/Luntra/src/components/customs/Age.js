import {View, Animated, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLOR} from '../constants/color';
const {height} = Dimensions.get('screen');
const ITEM_HEIGHT = height / 10;
const VISIBLE_ITEMS = 3;

export default function Age() {
  const scrollY = useRef(new Animated.Value(18)).current;
  const flatListRef = useRef(null);

  // Then in your component:
  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 18 * ITEM_HEIGHT,
      animated: false,
    });
  }, []);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>How Old Are You?</Text>
      <Text style={styles.subTitle}>This helps us to find you best match</Text>

      <View style={styles.pickerContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={[...Array(100).keys()]} // 0 to 99
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="normal"
          contentContainerStyle={{
            paddingVertical: ITEM_HEIGHT * VISIBLE_ITEMS,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log(index);
            const inputRange = [
              (index - VISIBLE_ITEMS) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + VISIBLE_ITEMS) * ITEM_HEIGHT,
            ];

            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [0.5, 2.5, 0.5],
              extrapolate: 'clamp',
            });

            const color = scrollY.interpolate({
              inputRange,
              outputRange: [COLOR.GRAY, COLOR.PRIMARY, COLOR.GRAY],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={[
                  styles.itemView,
                  {
                    height: ITEM_HEIGHT,
                    opacity,
                  },
                ]}>
                <Animated.Text
                  style={[styles.ageText, {color, transform: [{scale}]}]}>
                  {index}
                </Animated.Text>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: COLOR.GRAY,
  },
  pickerContainer: {
    // flex: 1,
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  itemView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageText: {
    fontSize: 34,
    fontWeight: '600',
  },
  indicatorLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: COLOR.PRIMARY,
    zIndex: 10,
  },
  gradientOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    backgroundColor: 'white',
    opacity: 0.8,
    zIndex: 1,
  },
  gradientOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    backgroundColor: 'white',
    opacity: 0.8,
    zIndex: 1,
  },
});
