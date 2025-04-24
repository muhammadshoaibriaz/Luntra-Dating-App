import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {ProfileCard} from './ProfileCard';

const {width} = Dimensions.get('window');
const offset = width / 5;

const SwipeCard = ({navigation}) => {
  const [data, setData] = useState([]);
  const opacity = useRef(new Animated.Value(0)).current;
  const containerRef = useRef(null);

  const fetchRandomUser = async () => {
    try {
      const res = await fetch('https://randomuser.me/api/?results=5');
      const json = await res.json();
      return json.results;
    } catch (error) {
      console.log('Error fetching user:', error);
      return null;
    }
  };

  const removeItem = async swipedItemIndex => {
    setData(prev => prev.slice(1));
    if (data.length <= 10) {
      await fetchRandomUser().then(newUsers => {
        if (newUsers) setData(prev => [...prev, ...newUsers]);
      });
    }
  };

  useEffect(() => {
    const preload = async () => {
      const users = await fetchRandomUser();
      setData(users);
    };
    preload();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[StyleSheet.absoluteFill, {opacity}]}
        ref={containerRef}
      />
      <View style={styles.container}>
        {data.slice(0, 3).map((item, index) => (
          <Card
            key={item.login.uuid}
            item={item}
            i={index}
            removeItem={removeItem}
            data={data}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

const Card = ({data, i, item, removeItem, setAction, navigation}) => {
  let isPositive = false;
  let isNegative = false;
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-40deg', '0deg', '40deg'],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
        listener: (e, g) => {
          if (!isPositive && g.dx > offset) {
            isPositive = true;
          } else if (isPositive && g.dx < offset) {
            isPositive = false;
            setAction();
          } else if (!isNegative && g.dx < -offset) {
            isNegative = true;
          } else if (isNegative && g.dx > -offset) {
            isNegative = false;
          }
        },
      }),
      onPanResponderRelease: (e, g) => {
        if (Math.abs(g.vx) > 1 || Math.abs(g.dx) > offset) {
          Animated.spring(pan, {
            toValue: {x: width * 2 * (g.dx < 0 ? -1 : 1), y: 0},
            useNativeDriver: true,
            bounciness: 0,
          }).start();
          setTimeout(() => removeItem(i));
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        }
        isPositive = false;
        isNegative = false;
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
        isPositive = false;
        isNegative = false;
      },
    }),
  ).current;

  const swipeOut = () => {
    Animated.timing(pan, {
      toValue: {x: -width * 2, y: 0},
      useNativeDriver: true,
      duration: 250,
    }).start(() => removeItem(i));
  };

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {zIndex: data.length - i},
      ]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.item,
          {
            transform: [
              {translateX: pan.x},
              {rotate},
              {scale: 1 - i * 0.05},
              {translateY: i * 14},
            ],
            width: 92 - i * 1 + '%',
            marginTop: i * 10,
          },
        ]}>
        <ProfileCard navigation={navigation} item={item} onClose={swipeOut} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
});

export default SwipeCard;
