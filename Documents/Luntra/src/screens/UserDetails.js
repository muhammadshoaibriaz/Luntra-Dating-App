import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {IconButton} from '../components/customs/IconButton';
import {BlurButton} from '../components/customs/BlurButton';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../components/constants/color';
import {Chip} from 'react-native-elements';

import {addFavorite} from '../components/redux/slices/favoriteSlice';
import {DATA} from '../components/libs/config';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3.5;

const InterestChips = React.memo(({interests}) => (
  <View style={styles.chipWrapper}>
    <FlatList
      data={interests}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
      renderItem={(interest, index) => {
        console.log(interest);
        return (
          <Chip
            key={`chip-${index}`}
            title={interest?.item?.title}
            icon={{
              name: interest?.item?.iconUnselected,
              type: 'material',
              size: 20,
            }}
            buttonStyle={styles.chipStyle}
            titleStyle={styles.chipTitle}
          />
        );
      }}
    />
  </View>
));

export default function UserDetails({route, navigation}) {
  const {item} = route?.params;

  const interests = useMemo(
    () => [
      {
        id: 1,
        iconSelected: 'music-note',
        iconUnselected: 'music-off',
        title: 'Music',
      },
      {
        id: 2,
        iconSelected: 'sports-soccer',
        iconUnselected: 'sports',
        title: 'Football',
      },
      {
        id: 3,
        iconSelected: 'menu-book',
        iconUnselected: 'book',
        title: 'Reading',
      },
      {id: 4, iconSelected: 'code', iconUnselected: 'laptop', title: 'Coding'},
      {
        id: 5,
        iconSelected: 'local-dining',
        iconUnselected: 'fastfood',
        title: 'Foodie',
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
        animated={true}
      />

      {/* Top Section */}
      <View style={styles.header}>
        <IconButton
          style={styles.iconButtons}
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </IconButton>
        <BlurButton text="12.5km" />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        <LinearGradient
          style={styles.imageWrapper}
          colors={['transparent', COLOR.SECONDARY]}>
          <Image source={item?.img} style={styles.image} />
        </LinearGradient>

        {/* User Details */}
        <View style={styles.userDetails}>
          <View style={styles.userInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.username}>Muhammad Shoaib</Text>
              <Text style={styles.userLocation}>Khanewal</Text>
            </View>
            <IconButton style={{backgroundColor: COLOR.PRIMARY}}>
              <MaterialIcons name="message" size={20} color="#fff" />
            </IconButton>
          </View>

          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionText}>
            Just a good soul looking to vibe with someone who enjoys late-night
            talks, good music, and spontaneous adventures. Let’s make memories,
            not just matches.
          </Text>

          <Text style={styles.description}>Interests</Text>
          <InterestChips interests={interests} />
          <Text style={[styles.description, {marginTop: 20}]}>
            Shabii🥀's Info
          </Text>
          <View style={styles.info}>
            <Text>Age</Text>
            <Text>22 years</Text>
          </View>
          <View style={styles.info}>
            <Text>Height</Text>
            <Text>175 cm</Text>
          </View>
          <View style={styles.info}>
            <Text>Speaks</Text>
            <Text>Urdu</Text>
          </View>
        </View>

        {/* Gallery */}
        <Text style={[styles.description, styles.galleryLabel]}>Gallery</Text>
        <FlatList
          data={DATA}
          horizontal
          keyExtractor={(_, index) => `img-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 14, paddingBottom: 20}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={`image gallery ${index}`}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ViewImage')}>
              <Image source={item?.img} style={styles.galleryImage} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={COLOR.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: COLOR.PRIMARY}]}
          onPress={() => addFavorite(item)}>
          <Ionicons name="heart" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, {backgroundColor: 'gold'}]}>
          <AntDesign name="star" size={30} color="black" />
        </TouchableOpacity>
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
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 34,
    zIndex: 111,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButtons: {
    backgroundColor: '#ffffff30',
  },
  imageWrapper: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  userDetails: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 20,
    zIndex: 111,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  username: {
    fontWeight: '900',
    fontSize: 18,
  },
  userLocation: {
    color: COLOR.GRAY,
    textTransform: 'uppercase',
    fontSize: 12,
    marginTop: 4,
  },
  description: {
    fontWeight: '700',
    marginTop: 12,
  },
  descriptionText: {
    color: COLOR.GRAY,
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chipStyle: {
    backgroundColor: '#eee',
    borderColor: COLOR.GRAY,
    marginRight: 8,
    marginTop: 10,
  },
  chipTitle: {
    color: 'black',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  galleryLabel: {
    marginBottom: 10,
    marginLeft: 14,
  },
  galleryImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    resizeMode: 'cover',
    borderRadius: 12,
    marginRight: 6,
  },
  iconButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    elevation: 30,
    shadowColor: COLOR.PRIMARY,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#111',
    padding: 6,
    borderRadius: 60,
    position: 'absolute',
    bottom: 10,
  },
});
