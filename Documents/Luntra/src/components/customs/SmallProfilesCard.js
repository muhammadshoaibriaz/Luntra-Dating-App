import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constants/color';
import {Image} from 'react-native';
import {BlurButton} from './BlurButton';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 2.2;
export const SmallProfilesCard = React.memo(({item, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.card}
      onPress={() => navigation.navigate('UserDetails', {item})}>
      <LinearGradient
        colors={['transparent', COLOR.GRADIENT]}
        style={styles.gradient}>
        <View style={styles.match}>
          <Text style={styles.matchText}>90% Match</Text>
        </View>
        <View style={styles.active} />
        <Image
          // source={require('../../assets/images/tolga.jpg')}
          source={{uri: item?.picture?.large}}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <BlurButton text={'12.8km'} />
          <Text style={styles.userName}>Shabii🥀</Text>
          <Text style={styles.cityText}>Khanewal, Pakistan</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    width: ITEM_WIDTH,
    height: 230,
    marginTop: 10,
    position: 'relative',
    marginHorizontal: 4,
    // backgroundColor: 'red',
  },
  kmText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  cityText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  userImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    // position: 'absolute',
    zIndex: 111,
    alignItems: 'center',
  },
  active: {
    width: 14,
    height: 14,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  match: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: COLOR.PRIMARY,
  },
  matchText: {
    color: '#fff',
    fontSize: 12,
  },
  blurButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
