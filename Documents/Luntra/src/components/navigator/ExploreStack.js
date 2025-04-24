import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../constants/screens';
const Stack = createStackNavigator();
const ExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExplorePage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ExplorePage" component={screens.ExplorePage} />
      <Stack.Screen
        name="UserDetails"
        component={screens.UserDetails}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="ViewImage"
        component={screens.ViewImage}
        options={{
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export {ExploreStack};
