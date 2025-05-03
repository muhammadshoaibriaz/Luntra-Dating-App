import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from '../customs/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../constants/color';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

export default function Location({navigation}) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(null);
  // console.log('distance', distance);
  const lahoreCords = {
    latitude: 31.5204,
    longitude: 74.3587,
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        accessLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const accessLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        const {latitude, longitude} = position.coords;
        console.log(position);
        setLoading(false);
        const dist = getDistance({latitude, longitude}, lahoreCords);
        setDistance(dist);
      },
      error => {
        Alert.alert(
          'Location Error',
          'Could not get your location. Please try again.',
          [{text: 'OK'}],
        );
        console.log(error);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const formatDistance = meters => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} meters`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconWrapper, {backgroundColor: '#eee'}]}>
        <Ionicons name="location" size={50} color={COLOR.PRIMARY} />
      </TouchableOpacity>

      <Text style={styles.title}>
        {location ? 'Location Found!' : 'What is your Location?'}
      </Text>
      <Text style={styles.subTitle}>
        {location
          ? `Lat: ${location.latitude.toFixed(
              4,
            )}, Long: ${location.longitude.toFixed(4)}`
          : 'To find nearby matches share your location with us'}
      </Text>
      {!location ? (
        <Button
          title={'Allow Location Access'}
          onPress={requestLocationPermission}
          loading={loading}
          style={{paddingHorizontal: 34, marginTop: 30}}
        />
      ) : (
        <Button
          title={'Continue'}
          onPress={() => navigation.navigate('CompleteProfile')}
          style={{paddingHorizontal: 34, marginTop: 30}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    color: COLOR.DARK,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: COLOR.GRAY,
    width: '80%',
    lineHeight: 20,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    position: 'relative',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 100,
  },
});
