import React, {useState} from 'react';
import {COLOR} from '../constants/color';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or any other icon library
import {BlurView} from '@react-native-community/blur';

const {width, height} = Dimensions.get('screen');

const BOX_SIZE = width / 3.5;
export default function UploadProfile() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const imagePicker = async () => {};
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Upload Your Photos </Text>
      <Text style={styles.subTitle}>
        To Boost Your Daily Match Potential, Include Your Photos
      </Text>

      <View style={styles.pickerContainer}>
        {/* Top Row */}
        <View style={styles.row}>
          <View style={styles.largeBox}>
            <Image
              source={require('../../assets/images/img20.jpg')}
              style={styles.largeImage}
            />
            <TouchableOpacity style={styles.overlayButton}>
              <BlurView
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                blurRadius={10}
                blurType="light">
                <Ionicons name="camera-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Change Photo</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <TouchableOpacity style={styles.smallBox}>
              <Ionicons name="add-circle" size={24} color="#7A5AF8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBox}>
              <Ionicons name="add-circle" size={24} color="#7A5AF8" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Bottom Row */}
        <View style={styles.row}>
          {[...Array(3)].map((_, idx) => (
            <TouchableOpacity key={idx} style={styles.smallBox}>
              <Ionicons name="add-circle" size={28} color="#7A5AF8" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: COLOR.GRAY,
    width: '80%',
    alignSelf: 'center',
  },
  pickerContainer: {
    // backgroundColor: 'red',
    paddingHorizontal: 14,
    paddingTop: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    justifyContent: 'space-between',
  },
  largeBox: {
    width: BOX_SIZE * 2 + 10,
    height: BOX_SIZE * 2 + 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  overlayButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: '#999',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 12,
  },
  smallBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1.4,
    borderColor: '#7A5AF8',
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
