import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../constants/color';
import {Chip} from 'react-native-elements';

export default function Interest() {
  // console.log(FontAwesome5.getRawGlyphMap()); // View available icons
  const simpleDatingAppNames = [
    // Original categories
    {name: 'Gaming', icon: 'gamepad'},
    {name: 'Nature', icon: 'leaf'},
    {name: 'Music', icon: 'music'},
    {name: 'Book', icon: 'book'},
    {name: 'Language', icon: 'language'},
    {name: 'Fashion', icon: 'tshirt'},
    {name: 'Travel', icon: 'plane'},
    {name: 'Gym', icon: 'dumbbell'},
    {name: 'Food', icon: 'utensils'},
    {name: 'Finance', icon: 'chart-line'},

    // New categories
    {name: 'Art', icon: 'palette'},
    {name: 'Photography', icon: 'camera-retro'},
    {name: 'Movies', icon: 'film'},
    {name: 'TV Shows', icon: 'tv'},
    {name: 'Tech', icon: 'laptop-code'},
    {name: 'Science', icon: 'atom'},
    {name: 'History', icon: 'landmark'},
  ];
  const [selected, setSelected] = useState([]);
  const toggleChip = index => {
    setSelected(pre => {
      if (pre.includes(index)) {
        return pre.filter(i => i !== index);
      } else if (pre.length < 5) {
        return [...pre, index];
      }
      return pre;
    });
  };
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Select upto 5 interests</Text>
      <Text style={styles.subTitle}>
        Discover meaningful Connection by selecting your interests
      </Text>

      <View style={styles.pickerContainer}>
        <FlatList
          data={simpleDatingAppNames}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          renderItem={({item, index}) => {
            const isSelected = selected.includes(index);
            return (
              <Chip
                key={`chip-${index}`}
                title={item.name}
                icon={{
                  name: item.icon,
                  type: 'font-awesome-5',
                  color: isSelected ? 'white' : COLOR.GRAY,
                  size: 16,
                }}
                // type="outline"
                buttonStyle={[
                  styles.chipStyle,
                  isSelected && styles.selectedStyle,
                ]}
                titleStyle={[
                  {color: 'black', fontWeight: '800'},
                  isSelected && styles.selectedText,
                ]}
                onPress={() => toggleChip(index)}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: COLOR.GRAY,
    width: '80%',
    alignSelf: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  chipStyle: {
    margin: 2,
    borderWidth: 0,
    borderRadius: 40,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  selectedStyle: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 50,
  },
  selectedText: {
    color: 'white',
  },
});
