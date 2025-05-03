import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Story} from '../components/customs/Story';
import {COLOR} from '../components/constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {UserCard} from '../components/customs/UserCard';
import {DATA} from '../components/libs/config';

export default function ChatPage({navigation}) {
  const renderHeader = () => (
    <View style={{flex: 1}}>
      <FlatList
        horizontal
        data={DATA}
        keyExtractor={item => item?.login?.uuid || item?.id}
        contentContainerStyle={styles.storyWrapper}
        renderItem={({item}) => <Story item={item} />}
        ListHeaderComponent={
          <TouchableOpacity style={styles.story} activeOpacity={0.8}>
            <Image
              source={require('../assets/images/avatar_3.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
            <AntDesign
              name="pluscircle"
              size={18}
              color={COLOR.PRIMARY}
              style={styles.userStory}
            />
            <Text numberOfLines={1} style={styles.storyText}>
              You
            </Text>
          </TouchableOpacity>
        }
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chat}>Chat</Text>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item?.name}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingBottom: 60}}
        renderItem={({item, index}) => {
          return <UserCard navigation={navigation} item={item} key={index} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 30,
  },
  chat: {
    fontSize: 20,
    fontWeight: '900',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  userStory: {
    position: 'absolute',
    borderColor: '#fff',
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    top: '40%',
  },
  story: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyText: {
    top: 4,
    fontSize: 13,
  },
  storyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatSection: {
    flex: 1,
  },
  stories: {
    paddingVertical: 6,
  },
});
