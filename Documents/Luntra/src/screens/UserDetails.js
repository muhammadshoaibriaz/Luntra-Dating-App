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
import {IconButton} from '../components/customs/IconButton';
import {BlurButton} from '../components/customs/BlurButton';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../components/constants/color';
import {Chip} from 'react-native-elements';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3.5;

const InterestChips = React.memo(({interests}) => (
  <View style={styles.chipWrapper}>
    {interests.map((interest, index) => (
      <Chip
        key={`chip-${index}`}
        title={interest.title}
        icon={{
          name: interest.iconUnselected,
          type: 'material',
          size: 20,
        }}
        buttonStyle={styles.chipStyle}
        titleStyle={styles.chipTitle}
      />
    ))}
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
        // translucent={true}
        barStyle="light-content"
        animated={true}
      />

      {/* Top Section */}
      <View style={styles.header}>
        <IconButton
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </IconButton>
        <BlurButton text="12.5km" />
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image with Gradient */}
        {/* <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => navigation.navigate('ViewImage', {item})}> */}
        <LinearGradient
          style={styles.imageWrapper}
          colors={['transparent', COLOR.SECONDARY]}>
          <Image source={{uri: item?.picture?.large}} style={styles.image} />
        </LinearGradient>
        {/* </TouchableOpacity> */}

        {/* User Details */}
        <View style={styles.userDetails}>
          <View style={styles.userInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.username}>
                {`${item?.name?.first} ${item?.name?.last}`}
              </Text>
              <Text style={styles.userLocation}>
                {item?.location?.city?.toUpperCase() || ''}
              </Text>
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
            {item?.name?.first}'s Info
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
          data={[1, 2, 3, 4]}
          horizontal
          keyExtractor={(_, index) => `img-${index}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 14, paddingBottom: 20}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={`image gallery ${index}`}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ViewImage')}>
              <Image
                source={require('../assets/images/user.jpeg')}
                style={styles.galleryImage}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
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
  iconButton: {
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
});
