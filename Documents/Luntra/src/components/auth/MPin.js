import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ToastAndroid,
} from 'react-native';
import {COLOR} from '../constants/color';
import {Button} from '../customs/Button';

export default function MPin({route, navigation}) {
  const otpCode = '3454';
  const [timer, setTimer] = useState(60);
  const [pins, setPins] = useState(otpCode.split(''));
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handlePinChange = (index, value) => {
    const updatedPins = [...pins];
    updatedPins[index] = value;
    setPins(updatedPins);

    if (value && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = pins.join('');
    if (enteredCode === otpCode) {
      navigation.navigate('PickImage', {
        ...route.params,
      });
    } else {
      ToastAndroid.show('Invalid OTP code', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.verifyCode}>Verify Code</Text>
        <Text style={styles.infoText}>
          Please enter the code we just sent to email{' '}
          <Text style={styles.phoneText}>example@email.com</Text>
        </Text>

        <View style={styles.inputContainer}>
          {pins.map((pin, index) => (
            <TextInput
              key={index}
              ref={refs[index]}
              value={pin}
              onChangeText={val => handlePinChange(index, val)}
              maxLength={1}
              style={styles.input}
              autoComplete="sms-otp"
            />
          ))}
        </View>

        <Text style={styles.timerText}>
          Send again after{' '}
          {timer > 0 ? (
            `${timer}s`
          ) : (
            <Text onPress={() => setTimer(30)} style={styles.resendText}>
              Resend OTP
            </Text>
          )}
        </Text>
      </View>
      <Button
        title={'Verify'}
        onPress={() => navigation.navigate('Onboarding')}
        style={{marginTop: 30}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
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
  headerText: {
    fontSize: 16,
    marginRight: 20,
  },
  content: {
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    margin: 4,
    fontSize: 18,
    backgroundColor: '#eee',
  },
  resendText: {
    color: COLOR.PRIMARY,
    fontWeight: '600',
  },
  verifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'teal',
    borderRadius: 6,
    marginVertical: 10,
    bottom: 10,
    position: 'absolute',
    width: '95%',
    alignSelf: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  verifyCode: {
    fontSize: 20,
    fontWeight: '600',
  },
  phoneText: {
    color: COLOR.PRIMARY,
    fontWeight: '600',
  },
});
