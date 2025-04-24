import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLOR} from '../constants/color';
export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.loc}>Location</Text>
        <View style={styles.location}>
          <Entypo name="location-pin" size={20} color={COLOR.PRIMARY} />
          <Text style={styles.locationText}>Khanewal Punjab, Pakistan</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menuBtn}>
        <Icon name="bars" size={18} color={COLOR.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    marginLeft: 2,
  },
  loc: {
    fontWeight: '600',
    color: '#999',
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 50,
  },
});
