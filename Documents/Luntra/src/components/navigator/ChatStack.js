import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../constants/screens';
import Login from '../auth/Login';

const Stack = createStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ChatPage" component={screens.ChatPage} />
      <Stack.Screen
        name="Chats"
        component={screens.Chat}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export {ChatStack};
