import React, {useRef} from 'react';
import {Animated, View, FlatList, StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.7;
const ITEM_HEIGHT = 400;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const STACK_OFFSET = 30; // Vertical offset between stacked items

const StackedCarousel = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const position = Animated.subtract(
            index * (ITEM_WIDTH + SPACING),
            scrollX,
          );

          // Calculate visibility and stack position
          const isVisible = index >= 0 && index < VISIBLE_ITEMS;
          const stackPosition = isVisible ? VISIBLE_ITEMS - 1 - index : 0;

          // Animation values
          const translateY = isVisible ? stackPosition * STACK_OFFSET : 0;
          const scale = isVisible ? 1 - stackPosition * 0.1 : 0.8;
          const opacity = position.interpolate({
            inputRange: [
              -ITEM_WIDTH * 2,
              -ITEM_WIDTH,
              0,
              ITEM_WIDTH * (VISIBLE_ITEMS - 1),
              ITEM_WIDTH * VISIBLE_ITEMS,
            ],
            outputRange: [0, 0.3, 1, 0.3, 0],
            extrapolate: 'clamp',
          });

          const zIndex = isVisible ? data.length - index : 0;

          return (
            <Animated.View
              style={[
                styles.itemContainer,
                {
                  // width: ITEM_WIDTH,
                  // height: ITEM_HEIGHT,
                  // marginLeft: index === 0 ? 0 : -ITEM_WIDTH * 0.3,
                  // transform: [{translateY}, {scale}],
                  // opacity,
                  // zIndex,
                },
              ]}>
              <View style={styles.item}>{item.content}</View>
            </Animated.View>
          );
        }}
        keyExtractor={item => item.id}
        initialNumToRender={VISIBLE_ITEMS + 2} // Render slightly more for smooth transitions
        windowSize={VISIBLE_ITEMS + 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT + STACK_OFFSET * 2,
    justifyContent: 'center',
  },
  flatListContent: {
    paddingHorizontal: (screenWidth - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    // position: 'absolute',
    shadowColor: '#000',
    width: 300,
    height: 400,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'gold',
  },
  item: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default StackedCarousel;
