import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../components/customs/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../components/constants/color';
import {Story} from '../components/customs/Story';

import {useFocusEffect} from '@react-navigation/native';
import {DATA} from '../components/libs/config';
import CountryPicker from 'react-native-country-picker-modal';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {Button} from '../components/customs/Button';
import SwipeCard from '../components/customs/SwipeCard';
const {width, height} = Dimensions.get('screen');
const ITEM_HEIGHT = height - 240;
const sliderWidth = width - 40;
export default function HomePage({navigation}) {
  const [depA, setDepA] = React.useState(false);
  const [depB, setDepB] = React.useState(false);
  const [interest, setInterest] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold on!',
        'Are you sure you want to exit?',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [depA, depB]);

  const [country, setCountry] = useState(null);

  const handleSelectCountry = country => {
    setCountry(country);
    console.log(country);
  };

  const [distance, setDistance] = useState([15, 50]);
  const [age, setAge] = useState([10, 40]);

  const handleDistanceChange = values => {
    setDistance(values);
  };
  const handleAgeChange = values => {
    setAge(values);
  };

  const minValue = 0;
  const maxValue = 60;
  const step = 10;
  const minAge = 0;
  const maxAge = 60;

  // Create an array of labels (0, 10, 20, 30, 40, 50, 60)
  const labels = [];
  for (let i = minValue; i <= maxValue; i += step) {
    labels.push(`${i} km`);
  }
  const ages = [];
  for (let i = minAge; i <= maxAge; i += step) {
    ages.push(`${i}`);
  }

  const bottomRef = useRef(null);
  const handleFilter = () => {
    bottomRef.current.open();
  };
  return (
    <View style={styles.container}>
      <Header handleFilter={handleFilter} />

      <View style={styles.storyFlatList}>
        <FlatList
          horizontal
          data={DATA}
          keyExtractor={item => `header stories ${item?.id}`}
          contentContainerStyle={styles.storyWrapper}
          renderItem={({item, index}) => (
            <Story item={item} key={`story-${index}`} />
          )}
          ListHeaderComponent={
            <TouchableOpacity style={styles.story} activeOpacity={0.8}>
              <Image
                source={require('../assets/images/avatar_2.jpg')}
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
                Yous
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
      {/* BottomSheet */}
      <BottomSheet
        ref={bottomRef}
        height={ITEM_HEIGHT - 30}
        closeOnPressBack
        closeOnPressMask
        dragOnContent
        draggable
        customModalProps={{
          statusBarTranslucent: true,
          animationType: 'slide',
          transparent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            // display: 'none',
          },
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sheetWrapper}>
            <Text style={styles.filterText}>Filter</Text>
            {/* <View style={styles.inputContainer}> */}
            <Text style={styles.label}>Select Country</Text>
            <CountryPicker
              countryCodes={country}
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              onSelect={handleSelectCountry}
              countryCode={!country ? 'PK' : country?.cca2}
            />
            <Text style={styles.title}>Interested In</Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
              {['Women', 'Men', 'Both'].map((item, index) => (
                <TouchableOpacity
                  onPress={() => setInterest(index)}
                  style={[
                    styles.interestBtn,
                    {
                      backgroundColor:
                        index === interest ? COLOR.PRIMARY : '#eee',
                    },
                  ]}
                  key={`gender - ${index}`}>
                  <Text
                    style={{
                      color: index === interest ? '#eee' : '#111',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.title}>Sort by</Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
              {['Online', 'Popular', 'Highly Match'].map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSortBy(index)}
                  style={[
                    styles.interestBtn,
                    {
                      backgroundColor:
                        index === sortBy ? COLOR.PRIMARY : '#eee',
                    },
                  ]}
                  key={`match - ${index}`}>
                  <Text style={{color: index === sortBy ? '#eee' : '#111'}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.title}>Distance</Text>
            <MultiSlider
              min={minValue}
              max={maxValue}
              step={10}
              values={distance}
              sliderLength={sliderWidth}
              onValuesChange={handleDistanceChange}
              markerStyle={styles.marker}
              selectedStyle={styles.selected}
              unselectedStyle={styles.unselected}
              containerStyle={styles.sliderContainer}
            />
            <View style={styles.labelsContainer}>
              {labels.map((label, index) => (
                <Text
                  key={index}
                  style={[styles.label, {fontWeight: '500', fontSize: 12}]}>
                  {label}
                </Text>
              ))}
            </View>
            <Text style={styles.title}>Age</Text>
            <MultiSlider
              min={minAge}
              max={maxAge}
              step={step}
              values={age}
              onValuesChange={handleAgeChange}
              markerStyle={styles.marker}
              selectedStyle={styles.selected}
              unselectedStyle={styles.unselected}
              containerStyle={styles.sliderContainer}
              sliderLength={sliderWidth}
            />
            <View style={styles.labelsContainer}>
              {ages.map((label, index) => (
                <Text
                  key={index}
                  style={[styles.label, {fontWeight: '500', fontSize: 12}]}>
                  {label}
                </Text>
              ))}
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                // onPress={() => bottomRef.current.close()}
                title={'Reset Filter'}
                style={{width: '48%', backgroundColor: '#eee'}}
              />
              <Button
                onPress={() => bottomRef.current.close()}
                color={true}
                title={'Apply'}
                style={{width: '48%'}}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storyFlatList: {flexDirection: 'row', alignItems: 'center'},
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
  inputContainer: {
    marginTop: 10,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 45,
    fontSize: 16,
    backgroundColor: '#eee',
    paddingLeft: 14,
    borderRadius: 8,
    marginTop: 6,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  sheetWrapper: {
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: 18,
    fontWeight: '800',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  interestBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  sliderContainer: {
    // backgroundColor: 'red',
    marginTop: 2,
    height: 30,
  },
  marker: {
    backgroundColor: COLOR.PRIMARY,
    width: 18,
    height: 18,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 2,
    top: 3,
  },
  selected: {
    backgroundColor: COLOR.PRIMARY,
    height: 6,
    width: '100%',
  },
  unselected: {
    backgroundColor: '#eee',
    height: 6,
    width: '100%',
    borderRadius: 30,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sliderWidth,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 24,
  },
});
