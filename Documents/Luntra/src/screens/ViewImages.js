import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IconButton} from '../components/customs/IconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DATA} from '../components/libs/config';

const {width, height} = Dimensions.get('screen');

export default function ViewImage({navigation}) {
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const topRef = useRef();
  const bottomRef = useRef();
  useEffect(() => {
    bottomRef.current.scrollToIndex({index: active, viewPosition: 0.5});
  }, [active]);
  const onMomentumScrollEnd = e => {
    const newItem = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newItem) {
      setActive(newItem);
    }
  };

  const onPress = index => {
    topRef.current.scrollToIndex({index});
    setActive(index);
  };
  return (
    <View style={styles.container}>
      <IconButton style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={20} color="#fff" />
      </IconButton>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={topRef}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <Animated.FastImage
              source={item.img}
              style={styles.image}
              resizeMode="cover"
            />
          );
        }}
      />
      <View style={styles.flatListWrapper}>
        <FlatList
          data={DATA}
          horizontal
          ref={bottomRef}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => onPress(index)}>
                <Animated.FastImage
                  source={item.img}
                  style={[
                    styles.smallImage,
                    {borderColor: index === active ? '#fff' : 'transparent'},
                  ]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height,
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 2,
  },
  flatListWrapper: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  backButton: {position: 'absolute', top: 34, left: 10, zIndex: 11},
});
