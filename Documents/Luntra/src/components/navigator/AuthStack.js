import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../constants/screens';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator} from './TabNavigator';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="Signup" component={screens.SignUp} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="MPin" component={screens.MPin} />
      <Stack.Screen name="Onboarding" component={screens.Onboarding} />
      <Stack.Screen name="Location" component={screens.Location} />
      <Stack.Screen name="UploadProfile" component={screens.UploadProfile} />
      <Stack.Screen
        name="CompleteProfile"
        component={screens.CompleteProfile}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export {AuthStack};
