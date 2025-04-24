import React, {useEffect, useState} from 'react';
import {AppNavigator} from './src/components/navigator/AppNavigator';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from './src/components/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/components/auth/Login';
export default function App() {
  useEffect(() => {
    changeNavigationBarColor('#ffffff', true);
    // checkAuth();
  }, []);
  // const [isToken, setIsToken] = useState(false);

  // const checkAuth = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   if (token) {
  //     setIsToken(true);
  //   } else {
  //     setIsToken(false);
  //   }
  // };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
