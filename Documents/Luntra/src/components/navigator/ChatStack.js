import {createStackNavigator} from '@react-navigation/stack';
import {screens} from '../constants/screens';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatPage"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="ChatPage" component={screens.ChatPage} />
      <Stack.Screen
        name="Chats"
        component={screens.Chat}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

export {ChatStack};

const styles = StyleSheet.create({});
