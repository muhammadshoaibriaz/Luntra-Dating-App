import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {SmallProfilesCard} from '../components/customs/SmallProfilesCard';
import {FlatList} from 'react-native-gesture-handler';
import {DATA} from '../components/libs/config';

export default function FavoritePage({navigation}) {
  const data = useSelector(state => state.favorite);
  const [active, setActive] = useState(0);
  const exploreTopics = [
    'All',
    'Online',
    'Nearby',
    'Trending',
    'Matched by Interests',
    'Missed Connections',
    'Global Explore',
    'Boosted Profiles',
  ];
  const renderItem = useCallback(
    ({item, index}) => (
      <SmallProfilesCard
        navigation={navigation}
        item={item}
        key={`smallProfileCards - ${index}`}
      />
    ),
    [navigation],
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chat}>Favorites</Text>
      </View>
      <View style={{paddingVertical: 4}}>
        <FlatList
          data={exploreTopics}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => `key - ${item}`}
          contentContainerStyle={styles.containerStyle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={`index ${index}`}
                onPress={() => setActive(index)}
                style={[
                  styles.explore,
                  {
                    backgroundColor: index === active ? '#6d53f4' : '#6d53f410',
                  },
                ]}>
                <Text style={{color: index === active ? '#fff' : 'black'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item?.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          removeClippedSubviews={true}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 14,
    paddingTop: 10,
    marginTop: 30,
  },
  chat: {
    fontSize: 20,
    fontWeight: '900',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  explore: {
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 14,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  containerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
