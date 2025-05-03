import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../components/constants/color';

const ButtonView = ({onPress, title, icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.touchableBtn}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name={icon} size={20} color={COLOR.PRIMARY} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLOR.PRIMARY} />
      </View>
    </TouchableOpacity>
  );
};

export default function ProfilePage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../assets/images/avatar_3.jpg')}
          style={{width: '100%', height: '100%', borderRadius: 100}}
        />
        <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
          <Ionicons name="image" size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.headerTitle, {fontSize: 16, marginTop: 10}]}>
        Muhammad Shoaib
      </Text>
      <View style={styles.premiumCard}>
        <View style={styles.image}>
          <MaterialCommunityIcons name="crown" size={26} />
        </View>
        <View style={styles.premium}>
          <Text style={styles.premiumTitle}>Get Premium Plan</Text>
          <Text style={{color: '#ddd'}}>Lorem ipsum dollar sit amit </Text>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <ButtonView
          onPress={() => {}}
          title={'Your profile'}
          icon={'person-outline'}
        />
        <ButtonView
          onPress={() => {}}
          title={'Payment Method'}
          icon={'card-outline'}
        />
        <ButtonView
          onPress={() => {}}
          title={'Settings'}
          icon={'settings-outline'}
        />
        <ButtonView
          onPress={() => {}}
          title={'Help Center'}
          icon={'help-circle-outline'}
        />
        <ButtonView
          onPress={() => {}}
          title={'Invite Friend'}
          icon={'share-social-outline'}
        />
        <ButtonView
          title={'Privacy Policy'}
          icon={'shield-checkmark-outline'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1.4,
    borderColor: '#eee',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontWeight: '600',
    marginLeft: 8,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'relative',
    marginTop: 30,
  },
  iconButton: {
    position: 'absolute',
    zIndex: 111,
    bottom: 0,
    right: 0,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 30,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginLeft: 14,
  },
  touchableBtn: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  premiumCard: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    borderRadius: 10,
    backgroundColor: COLOR.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gold',
  },
  premium: {
    marginLeft: 10,
  },
  premiumTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 2,
  },
});
