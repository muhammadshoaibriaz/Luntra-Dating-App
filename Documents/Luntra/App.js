import React, {useEffect, useState} from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from './src/components/redux/store';
import {AuthStack} from './src/components/navigator/AuthStack';
import {StatusBar, Text, View} from 'react-native';
import {storage} from './src/components/libs/config';
import {TabNavigator} from './src/components/navigator/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};
export default function App() {
  useEffect(() => {
    checkAuth();
    changeNavigationBarColor('#ffffff', true);
  }, []);
  const [isToken, setIsToken] = useState(null);
  const checkAuth = async () => {
    try {
      const token = await storage.getString('token.name');
      if (token) {
        setIsToken(true);
      }
      console.log('token', token);
    } catch (error) {
      console.log('Error getting token');
    }
  };

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          translucent={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          animated={true}
        />
        <Provider store={store}>
          <PaperProvider>
            {isToken === null ? (
              <LoadingScreen />
            ) : isToken ? (
              <TabNavigator />
            ) : (
              <AuthStack />
            )}
          </PaperProvider>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
