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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  // State Variables
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordInput = value => setPassword(value);

  const handleLogin = async () => {
    try {
      const results = await axios.post(
        `http://192.168.126.21:3000/api/v1/login`,
        {
          name,
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
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          BackHandler.exitApp();
        }}>
        <AntDesign name="arrowleft" size={22} />
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text
        style={styles.heading}
        onPress={() => alert('Why don’t you know my name? 😡')}>
        Hello there 👋
      </Text>
      <Text style={styles.subHeading}>
        Please enter your username/email and password to sign in.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username / Email</Text>
        <TextInput
          value={name}
          placeholder="Username"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={t => setName(t)}
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

      {/* Remember Me Checkbox */}
      <CheckBox
        title="Remember me"
        containerStyle={styles.checkboxContainer}
        checkedColor="#a1614b"
      />

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={[styles.text, styles.forgotPasswordText]}>
          Forgot Password
        </Text>
      </TouchableOpacity>

      {/* Continue with Social Media */}
      <Text style={[styles.text, styles.continueText]}>or continue with</Text>
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

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={[styles.text, styles.signInButtonText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  backButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 30,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomColor: '#a1614b',
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    padding: 0,
    backgroundColor: 'white',
    borderColor: '#fff',
    width: '100%',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#a1614b',
    alignSelf: 'center',
    marginTop: 20,
  },
  continueText: {
    alignSelf: 'center',
    marginTop: 20,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 30,
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#a1614b',
    borderRadius: 6,
    width: '100%',
    alignSelf: 'center',
    marginTop: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
  },
  text: {
    fontWeight: '600',
  },
});
