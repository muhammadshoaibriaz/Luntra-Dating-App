import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {screens} from '../constants/screens';
import {HomeStack} from './HomeStack';
import {ExploreStack} from './ExploreStack';
import {ChatStack} from './ChatStack';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerTransparent: true,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Explore') {
              iconName = 'flame';
            } else if (route.name === 'Favorite') {
              iconName = 'heart';
            } else if (route.name === 'Chat') {
              iconName = 'comment-discussion';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return (
              <Octicons
                name={iconName}
                color={color}
                size={focused ? 26 : 22}
                style={{alignSelf: 'center'}}
              />
            );
          },
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
            bottom: 4,
            paddingTop: 8,
            height: 60,
            elevation: 0,
            borderRadius: 60,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 16,
            display: focusedRouteName(route) ? 'flex' : 'none',
          },
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          sceneStyle: {
            backgroundColor: '#fff',
          },
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Favorite" component={screens.FavoritePage} />
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name="Profile" component={screens.ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export {AppNavigator};

const focusedRouteName = route => {
  const route_name = getFocusedRouteNameFromRoute(route);
  const hiddenScreens = ['UserDetails', 'Chats', 'ViewImage'];
  return !(route_name && hiddenScreens.includes(route_name));
};
