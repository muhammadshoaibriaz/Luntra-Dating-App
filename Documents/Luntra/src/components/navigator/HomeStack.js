import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../constants/screens';
const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={screens.HomePage} />
      <Stack.Screen name="UserDetails" component={screens.UserDetails} />
      <Stack.Screen
        name="ViewImage"
        component={screens.ViewImage}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

export {HomeStack};
