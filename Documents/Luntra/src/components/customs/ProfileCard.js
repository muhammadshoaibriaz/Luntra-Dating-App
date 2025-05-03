import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from './IconButton';
import {COLOR} from '../constants/color';

import {BlurButton} from './BlurButton';
import {useDispatch} from 'react-redux';
import {addFavorite} from '../redux/slices/favoriteSlice';

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.45;

export const ProfileCard = React.memo(({item, onClose, navigation}) => {
  // console.log('item', item);
  const dispatch = useDispatch();
  const addToFavorite = data => {
    // console.log('item', data);
    dispatch(addFavorite(data));
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('UserDetails', {item})}
      style={styles.card}>
      <LinearGradient
        colors={['transparent', COLOR.SECONDARY]}
        style={[styles.gradient, {}]}>
        <View style={styles.imageWrapper}>
          <View style={styles.kmAway}>
            <BlurButton text={'12.5km'} />
            <IconButton
              style={{
                borderColor: '#0000ff',
                borderWidth: 2,
                elevation: 10,
                shadowColor: COLOR.PRIMARY,
              }}>
              <Text style={{color: '#fff', fontSize: 10}}>85%</Text>
            </IconButton>
          </View>
          <FastImage source={item?.img} style={styles.userImage} />
          <View style={styles.userInfo}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.userName}>{item?.name}</Text>
              <FastImage
                source={require('../../assets/images/verified.png')}
                style={{width: 20, height: 20, resizeMode: 'contain', left: 4}}
                tintColor={'gold'}
              />
            </View>
            <Text style={styles.cityText}>Khanewal, Pakistan</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.iconButton} onPress={onClose}>
          <AntDesign name="close" size={30} color={COLOR.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: COLOR.PRIMARY}]}
          onPress={() => addToFavorite(item)}>
          <Ionicons name="heart" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: 'gold'}]}>
          <AntDesign name="star" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    elevation: 55,
    backgroundColor: '#fff',
    shadowColor: COLOR.SECONDARY,
    padding: 10,
    width: '100%',
    // flex: 1,
  },
  gradient: {
    zIndex: 111,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    justifyContent: 'space-between',
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  kmAway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    top: 10,
  },
  kmText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
  },
  userName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  cityText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  iconButton: {
    borderRadius: 50,
    width: 60,
    height: 60,
    elevation: 30,
    shadowColor: COLOR.PRIMARY,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: '100%',
    height: 400,
    zIndex: -1111,
    position: 'absolute',
  },
  blurButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
