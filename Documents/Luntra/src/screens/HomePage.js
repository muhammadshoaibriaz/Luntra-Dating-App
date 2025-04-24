import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Header from '../components/customs/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../components/constants/color';
import axios from 'axios';
import {Story} from '../components/customs/Story';
import SwipeCard from '../components/customs/SwipeCard';

export default function HomePage({navigation}) {
  const [story, setStory] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    try {
      const output = await axios.get('https://randomuser.me/api/?results=25');
      setStory(output?.data?.results);
    } catch (error) {
      console.log('Error while getting stories');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      <Header />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* Using FlatList instead of ScrollView */}
        <FlatList
          horizontal
          data={story}
          keyExtractor={item => item?.login?.uuid || item?.id}
          contentContainerStyle={styles.storyWrapper}
          renderItem={({item}) => <Story item={item} />}
          ListHeaderComponent={
            <TouchableOpacity style={styles.story} activeOpacity={0.8}>
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
      {/* SwipeCard component remains the same */}
      <View style={{flex: 1, paddingTop: 20}}>
        <SwipeCard navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
