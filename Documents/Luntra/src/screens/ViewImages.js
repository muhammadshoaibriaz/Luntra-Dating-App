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
const DATA = [
  {
    img: require('../assets/images/img15.jpg'),
    id: 1,
    name: 'Gabriel Inferno',
    rating: 9,
    description:
      '24 hours in the lives of three young men in the French suburbs the day.',
  },
  {
    name: 'The Dark Knight',
    img: require('../assets/images/img20.jpg'),
    id: 2,
    rating: 7.5,
    description:
      'The aging patriarch of an organized crime dynasty in postwar New York City.',
  },
  {
    name: 'Fight Club',
    rating: 8.5,
    description:
      'A bounty hunting scam joins two men in an uneasy alliance against a third. ',
    img: require('../assets/images/img21.jpg'),
    id: 3,
  },
  {
    img: require('../assets/images/img22.jpg'),
    id: 4,
    name: 'Batman Begins',
    rating: 5.8,
    description:
      'A former Roman General sets out to exact vengeance against the corrupt.',
  },
  {
    img: require('../assets/images/img23.jpg'),
    id: 5,
    name: 'The God Father Part 02',
    rating: 4,
    description:
      'Los Angeles citizens with vastly separate lives collide in interweaving stories.',
  },
  {
    img: require('../assets/images/img24.jpg'),
    id: 7,
    name: 'Man Bites Dog',
    rating: 7.8,
    description:
      "A frustrated son tries to determine the fact from fiction in his dying father's life.",
  },
  {
    img: require('../assets/images/img25.jpg'),
    id: 8,
    name: 'The Departed',
    rating: 8.0,
    description:
      'n the deep south during the 1930s, three escaped convicts search for hidden treasure.',
  },
];

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
      <IconButton
        style={{position: 'absolute', top: 34, left: 10, zIndex: 11}}
        onPress={() => navigation.goBack()}>
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
            <Animated.Image
              source={item.img}
              style={styles.image}
              resizeMode="cover"
            />
          );
        }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 20,
        }}>
        <FlatList
          data={DATA}
          horizontal
          ref={bottomRef}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => onPress(index)}>
                <Animated.Image
                  source={item.img}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginLeft: 5,
                    borderWidth: 2,
                    borderColor: index === active ? '#fff' : 'transparent',
                  }}
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
});
