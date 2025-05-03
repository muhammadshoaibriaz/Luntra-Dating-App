import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '../customs/Button';
import {COLOR} from '../constants/color';

export default function SignUp({navigation}) {
  // State Variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const handlePasswordInput = value => setPassword(value);

  const handleLogin = async () => {
    try {
      const results = await axios.post(
        `http://192.168.126.21:3000/api/v1/login`,
        {
          email,
          password,
        },
      );

      const data = results.data;
      // console.log(data);
      // return;
      if (results.status === 200) {
        await AsyncStorage.setItem('token', JSON.stringify(data?.isUserExist));
        navigation.navigate('ChatPage', {data});
      }
    } catch (error) {
      if (error.response) {
        const {status, data} = error.response;

        if (status === 401) {
          Alert.alert('Error', 'Invalid Email or Password');
        } else if (status === 400) {
          Alert.alert('Error', data.message || 'Bad Request');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } else {
        // Network or other errors
        Alert.alert(
          'Error',
          'Unable to connect. Please check your internet connection.',
        );
      }

      console.log('Error logging in:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subHeading}>
        Fill your information below or register with your social account.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          placeholder="Shabii"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={t => setName(t)}
        />
      </View>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          placeholder="example@gmail.com"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={t => setEmail(t)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={handlePasswordInput}
          placeholder="••••••••"
        />
      </View>

      {/* Forgot Password */}
      <View style={styles.forgotButton}>
        <CheckBox
          checked={checked}
          checkedColor={COLOR.PRIMARY}
          onPress={() => setChecked(!checked)}
          containerStyle={{
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        />
        <Text style={styles.forgotPasswordText}>
          Agree with{' '}
          <Text style={{color: COLOR.PRIMARY, textDecorationLine: 'underline'}}>
            Terms & Condition?
          </Text>
        </Text>
      </View>

      <Button
        onPress={() => navigation.navigate('MPin')}
        title="Sign Up"
        style={{width: '100%', marginTop: 20}}
      />
      {/* Continue with Social Media */}
      <View style={styles.signUpWith}>
        <View style={styles.bar} />
        <Text style={[styles.text]}>or sign up with</Text>
        <View style={styles.bar} />
      </View>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook-official" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Already have an account?
        <TouchableOpacity>
          <Text
            style={{
              top: 5,
              left: 4,
              color: COLOR.PRIMARY,
              textDecorationLine: 'underline',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7,
    textAlign: 'center',
    width: '80%',
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
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    width: '70%',
    marginTop: 30,
    alignSelf: 'center',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: '#ddd',
    width: '30%',
    height: 1.5,
    marginTop: 4,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontWeight: '600',
  },
  signUpWith: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 14,
  },
});
