import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLOR} from '../constants/color';
import {Button} from '../customs/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Age from '../customs/Age';
import Interest from '../customs/Interest';
import UploadProfile from './UploadProfile';

const Onboard = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Tell us about yourself!</Text>
      <Text style={styles.subTitle}>
        To give you a better experience we need to know your gender
      </Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[styles.iconWrapper, {backgroundColor: 'blue'}]}>
          <Ionicons name="male" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconWrapper, {backgroundColor: '#eee'}]}>
          <Ionicons name="female" size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Onboarding({navigation}) {
  const steps = 4;
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const stepWidth = screenWidth / steps; // Calculate width for each step

  const [count, setCount] = useState(1);
  const animatedValue = useRef(new Animated.Value(stepWidth)).current;

  const animatedWidth = () => {
    if (count === 4) {
      navigation.navigate('Location');
    } else {
      const newWidth = (count + 1) * stepWidth;
      Animated.timing(animatedValue, {
        toValue: newWidth,
        useNativeDriver: false,
      }).start();
      setCount(preCount => preCount + 1);
    }
  };

  const goBack = () => {
    if (count === 1) {
      navigation.goBack();
    } else {
      const newWidth = (count - 1) * stepWidth;
      Animated.timing(animatedValue, {
        toValue: newWidth,
        useNativeDriver: false,
      }).start();
      setCount(preCount => preCount - 1);
    }
  };

  const renderComponent = () => {
    if (count === 1) {
      return <Onboard />;
    }
    if (count === 2) {
      return <Age />;
    }
    if (count === 3) {
      return <Interest />;
    }
    if (count === 4) {
      return <UploadProfile />;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity style={styles.backArrow} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '60%'}}>
          <View style={styles.animateBar}>
            <Animated.View
              style={[
                styles.bar,
                {
                  width: animatedValue.interpolate({
                    inputRange: [0, screenWidth],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={{color: COLOR.PRIMARY, marginLeft: 10}}>{count}/4</Text>
        </View>
        <View style={[styles.backArrow, {borderWidth: 0}]} />
      </View>
      <View style={{flex: 1}}>{renderComponent()}</View>
      <Button
        title={'Next'}
        onPress={animatedWidth}
        style={{bottom: 10, width: '100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  animateBar: {
    height: 10,
    backgroundColor: '#eee',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 40,
    overflow: 'hidden',
  },
  bar: {
    backgroundColor: COLOR.PRIMARY,
    height: '100%',
    borderRadius: 50,
  },
  backArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1.4,
    borderColor: '#eee',
    alignItems: 'center',
    borderRadius: 50,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
