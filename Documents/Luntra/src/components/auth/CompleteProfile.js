import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../constants/color';
import {Button} from '../customs/Button';
import {storage} from '../libs/config';
export default function CompleteProfile({navigation}) {
  const onPress = async () => {
    try {
      await storage.set('token.name', 'registered');
    } catch (error) {
      console.error('Error handling token:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.infoText}>
          Don't worry, only you can see your personal data. No one else will be
          able to see it.
        </Text>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/images/avatar_3.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 100}}
          />
          <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
            <Ionicons name="image" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title={'Complete Profile'}
        onPress={onPress}
        // onPress={() => navigation.replace('TabNavigator')}
        style={{
          marginTop: 30,
          width: '100%',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
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
  content: {
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    width: '95%',
    marginTop: 10,
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
});
