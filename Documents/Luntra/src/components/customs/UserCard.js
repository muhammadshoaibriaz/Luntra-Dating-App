import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export const UserCard = React.memo(({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.userCard}
      activeOpacity={1}
      onPress={() => navigation.navigate('Chats', {item})}>
      <Image source={item?.img} style={styles.image} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item?.name}</Text>
        <Text style={styles.message}>Hy there! How are you?</Text>
        <Text style={styles.timeStamp}>04:32 AM</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    // backgroundColor: 'red',
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
    position: 'relative',
  },
  username: {
    fontWeight: '800',
    fontSize: 16,
  },
  message: {
    marginTop: 4,
    color: '#555',
  },
  timeStamp: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 12,
  },
});
