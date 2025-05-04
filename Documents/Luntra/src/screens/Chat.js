import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../components/constants/color';
import {IconButton} from '../components/customs/IconButton';
import {Menu} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const socket = io('http://192.168.126.21:3000');

export default function Chat({route, navigation}) {
  const {item} = route?.params;
  // console.log(item)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('token');
    const user = JSON.parse(tokens);
    setCurrentUser(user?._id);
    socket.emit('join', user._id);
  };
  console.log('currentUser', currentUser);

  useEffect(() => {
    const handleReceiveMessage = msg => {
      if (msg.sender === item._id || msg.receiver === item._id) {
        const isFromMe = msg.sender === currentUser;
        setMessages(prev => [...prev, {...msg, fromMe: isFromMe}]);
      }
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [item._id, currentUser]);

  // console.log('currentUser', currentUser);

  const sendMessage = () => {
    const payload = {
      sender: currentUser,
      receiver: item._id,
      text: message,
    };
    socket.emit('send_message', payload);
    setMessages(prev => [...prev, {...payload, fromMe: true}]);
    setMessage('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    setVisible(!visible);
  };

  const pickMedia = () => {
    launchImageLibrary({mediaType: 'mixed'}, response => {
      if (response.didCancel || response.errorCode) {
        return;
      }

      const asset = response.assets[0];

      const newMsg = {
        id: Date.now(),
        fromMe: true,
        image: asset.type.startsWith('image') ? asset.uri : undefined,
        video: asset.type.startsWith('video') ? asset.uri : undefined,
        text: '', // optional caption
      };

      setMessages(prev => [...prev, newMsg]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    });
  };

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <View
        style={[
          styles.messageContainer,
          item.fromMe ? styles.fromMe : styles.fromOther,
        ]}>
        {item.image && (
          <Image
            source={{uri: item.image}}
            style={{width: 200, height: 200, borderRadius: 8, marginBottom: 10}}
          />
        )}
        {item.video && (
          <Text style={{color: '#ddd'}}>[Video message]</Text> // Optional: use a video player here
        )}
        {item.text !== '' && (
          <Text
            selectable
            style={[
              styles.messageText,
              item.fromMe ? styles.fromMeText : styles.fromOtherText,
            ]}>
            {item?.text}
          </Text>
        )}
        <Text
          style={[
            styles.timeText,
            item.fromMe ? styles.fromMeTime : styles.fromOtherTime,
            {
              position: item.image ? 'absolute' : 'relative',
              bottom: item.image ? 0 : 100,
              right: item.image ? 8 : 0,
            },
          ]}>
          04:00AM
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Image source={item?.img} style={styles.userImage} />
          <View style={styles.user}>
            <Text style={styles.headerTitle}>{item?.name || 'Shabiii'}</Text>
            <Text style={styles.online}>Online</Text>
          </View>
        </View>

        <Menu
          onDismiss={() => setVisible(false)}
          contentStyle={{elevation: 0}}
          anchor={
            <IconButton style={styles.showMore} onPress={showMenu}>
              <Icon name="ellipsis-vertical" size={18} color="#fff" />
            </IconButton>
          }
          visible={visible}>
          <Menu.Item
            title="Block"
            onPress={() => {
              console.log('Block');
            }}
          />
          <Menu.Item
            title="Report"
            onPress={() => {
              console.log('Report');
            }}
          />
          <Menu.Item
            title="Clear Chat"
            onPress={() => {
              console.log('Clear Chat');
            }}
          />
        </Menu>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ref={flatListRef}
        contentContainerStyle={styles.messages}
      />

      {/* Input Field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={70}
        style={styles.inputContainer}>
        <IconButton onPress={pickMedia}>
          <Icon name="attach" size={28} color={COLOR.PRIMARY} />
        </IconButton>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.input}
          multiline
          maxFontSizeMultiplier={12}
        />
        <MaterialCommunityIcon
          name="send-circle"
          size={50}
          color={COLOR.PRIMARY}
          onPress={sendMessage}
          style={{top: 5}}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messages: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '86%',
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 2,
  },
  fromMe: {
    backgroundColor: COLOR.PRIMARY,
    alignSelf: 'flex-end',
  },
  fromOther: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  fromMeText: {
    color: '#fff',
  },
  fromOtherText: {
    color: '#111',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
    height: 'auto',
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 8,
  },
  user: {
    marginLeft: 8,
  },
  online: {
    color: '#fff',
    fontSize: 10,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.PRIMARY,
    paddingTop: 30,
  },
  timeText: {
    fontSize: 10,
    marginLeft: 10,
    top: 22,
  },
  fromMeTime: {
    color: '#fff',
  },
  fromOtherTime: {
    color: '#111',
  },
});
