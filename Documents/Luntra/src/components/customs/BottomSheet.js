import {View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Button} from './Button';
import {COLOR} from '../constants/color';
const {width, height} = Dimensions.get('screen');
const ITEM_HEIGHT = height - 240;
const sliderWidth = width - 40;

export default function BottomSheet({filter}) {
  const [interest, setInterest] = useState(0);
  const [sortBy, setSortBy] = useState(0);
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

  return (
    <View
      style={{
        height: filter ? 500 : 0,
        backgroundColor: '#fff',
        zIndex: 111,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 1000,
        shadowColor: 'black',
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
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
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
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
            {['Online', 'Popular', 'Highly Match'].map((item, index) => (
              <TouchableOpacity
                onPress={() => setSortBy(index)}
                style={[
                  styles.interestBtn,
                  {
                    backgroundColor: index === sortBy ? COLOR.PRIMARY : '#eee',
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
              title={'Reset Filter'}
              style={{width: '48%', backgroundColor: '#eee'}}
            />
            <Button color={true} title={'Apply'} style={{width: '48%'}} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
