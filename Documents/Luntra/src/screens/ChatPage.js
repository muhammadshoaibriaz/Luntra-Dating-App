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

export default function ChatPage({navigation, route}) {
  // const {isUserExist} = route?.params?.data;
  // console.log(isUserExist);
  const [story, setStory] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getStories();
    getUser();
  }, []);

  const getStories = async () => {
    try {
      const output = await axios.get('https://randomuser.me/api/?results=25');
      setStory(output?.data?.results);
    } catch (error) {
      console.log('Error while getting stories');
    }
  };

  const getUser = async () => {
    const results = await axios.get(
      `http://192.168.126.21:3000/api/v1/getUser`,
    );
    // console.log(results);
    setUsers(results?.data);
  };
  // Header including "Chat" title and Stories list
  const renderHeader = () => (
    <View style={{flex: 1}}>
      <FlatList
        horizontal
        data={story}
        keyExtractor={item => item?.login?.uuid || item?.id}
        contentContainerStyle={styles.storyWrapper}
        renderItem={({item}) => <Story item={item} />}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.story}
            activeOpacity={0.8}
            onPress={getUser}>
            <Image
              source={require('../assets/images/story.jpg')}
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
        data={users?.users}
        keyExtractor={item => item?._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingBottom: 60}}
        renderItem={({item, index}) => {
          return <UserCard navigation={navigation} item={item} />;
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
