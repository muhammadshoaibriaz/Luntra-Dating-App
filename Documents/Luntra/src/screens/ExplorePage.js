import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLOR} from '../components/constants/color';
import {IconButton} from '../components/customs/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ExplorePage() {
  const dummyUsers = [
    {
      id: 1,
      name: 'Ayesha, 23',
      bio: 'Loves long walks and chai 🍵',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: {latitude: 31.5507, longitude: 74.3436},
    },
    {
      id: 2,
      name: 'Zara, 25',
      bio: 'Coffee addict ☕ | Book lover 📚',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      location: {latitude: 31.5525, longitude: 74.34},
    },
    {
      id: 3,
      name: 'Ali, 26',
      bio: 'Explorer 🌍 | Gym Rat 🏋️‍♂️',
      image: 'https://randomuser.me/api/portraits/men/11.jpg',
      location: {latitude: 31.5535, longitude: 74.345},
    },
    {
      id: 4,
      name: 'Hamza, 28',
      bio: 'Movie buff 🎬 | Tech nerd 👨‍💻',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      location: {latitude: 31.5485, longitude: 74.341},
    },
    {
      id: 5,
      name: 'Sara, 24',
      bio: 'Foodie 🍕 | Music lover 🎶',
      image: 'https://randomuser.me/api/portraits/women/30.jpg',
      location: {latitude: 31.549, longitude: 74.3398},
    },
    {
      id: 6,
      name: 'Ahmed, 29',
      bio: 'Hiker 🏞️ | Dog dad 🐶',
      image: 'https://randomuser.me/api/portraits/men/18.jpg',
      location: {latitude: 31.5472, longitude: 74.3444},
    },
    {
      id: 7,
      name: 'Fatima, 22',
      bio: 'Art enthusiast 🎨 | Cat lover 🐱',
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
      location: {latitude: 31.546, longitude: 74.346},
    },
    {
      id: 8,
      name: 'Bilal, 27',
      bio: 'Adventure seeker 🧗 | Coffee junkie ☕',
      image: 'https://randomuser.me/api/portraits/men/36.jpg',
      location: {latitude: 31.5501, longitude: 74.348},
    },
    {
      id: 9,
      name: 'Hina, 26',
      bio: 'Dance lover 💃 | Sea dreamer 🌊',
      image: 'https://randomuser.me/api/portraits/women/21.jpg',
      location: {latitude: 31.553, longitude: 74.349},
    },
    {
      id: 10,
      name: 'Usman, 24',
      bio: 'Basketball player 🏀 | Gamer 🎮',
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      location: {latitude: 31.551, longitude: 74.337},
    },
    {
      id: 11,
      name: 'Mehwish, 23',
      bio: 'Nature admirer 🌿 | Writer ✍️',
      image: 'https://randomuser.me/api/portraits/women/34.jpg',
      location: {latitude: 31.552, longitude: 74.347},
    },
    {
      id: 12,
      name: 'Daniyal, 30',
      bio: 'Car enthusiast 🚗 | Tech geek 🤓',
      image: 'https://randomuser.me/api/portraits/men/48.jpg',
      location: {latitude: 31.5465, longitude: 74.3422},
    },
    {
      id: 13,
      name: 'Anum, 25',
      bio: 'Netflix & chill 🍿 | Food blogger 🍱',
      image: 'https://randomuser.me/api/portraits/women/62.jpg',
      location: {latitude: 31.5499, longitude: 74.3419},
    },
    {
      id: 14,
      name: 'Haris, 28',
      bio: 'Bike rider 🏍️ | Music junkie 🎧',
      image: 'https://randomuser.me/api/portraits/men/13.jpg',
      location: {latitude: 31.5459, longitude: 74.3405},
    },
    {
      id: 15,
      name: 'Noor, 22',
      bio: 'Fitness freak 💪 | Fashionista 👗',
      image: 'https://randomuser.me/api/portraits/women/19.jpg',
      location: {latitude: 31.5515, longitude: 74.343},
    },
    {
      id: 16,
      name: 'Imran, 27',
      bio: 'Startup founder 🚀 | Bookworm 📖',
      image: 'https://randomuser.me/api/portraits/men/50.jpg',
      location: {latitude: 31.55, longitude: 74.35},
    },
    {
      id: 17,
      name: 'Mariam, 24',
      bio: 'Travel vlogger ✈️ | Nature lover 🌺',
      image: 'https://randomuser.me/api/portraits/women/58.jpg',
      location: {latitude: 31.5545, longitude: 74.3445},
    },
    {
      id: 18,
      name: 'Raza, 29',
      bio: 'Minimalist 🧘 | Photographer 📸',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
      location: {latitude: 31.5483, longitude: 74.3493},
    },
    {
      id: 19,
      name: 'Iqra, 23',
      bio: 'Food explorer 🍔 | Design lover 💻',
      image: 'https://randomuser.me/api/portraits/women/40.jpg',
      location: {latitude: 31.5477, longitude: 74.3432},
    },
    {
      id: 20,
      name: 'Rehan, 26',
      bio: 'Sky gazer 🌌 | Football fan ⚽',
      image: 'https://randomuser.me/api/portraits/men/20.jpg',
      location: {latitude: 31.5493, longitude: 74.3467},
    },
  ];

  const mapRef = useRef();
  mapRef.current?.animateToRegion(
    {
      latitude: 31.5497, // Latitude for Lahore, Pakistan
      longitude: 74.3436,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    1000,
  );
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        mapType="terrain"
        initialRegion={{
          latitude: 31.5497,
          longitude: 74.3436,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {dummyUsers?.map(user => (
          <Marker
            key={user.id}
            // tracksViewChanges={false}
            onPress={() => {
              console.log(user);
            }}
            coordinate={user.location}
            tappable={true}>
            <View>
              <Image source={{uri: user.image}} style={styles.userImage} />
              <Text style={{fontSize: 10}}>{user.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating Profile Card */}
      <View style={styles.floatingCard}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/44.jpg'}}
          style={styles.profileImage}
        />
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.profileName}>Ayesha, 23</Text>
          <Text style={styles.profileBio}>Loves long walks and chai 🍵</Text>
        </View>
        <IconButton
          style={{width: 45, height: 45, backgroundColor: COLOR.PRIMARY}}>
          <Ionicons name="heart" size={28} color="#fff" />
        </IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -11,
  },
  floatingCard: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 15,
    elevation: 15,
    shadowColor: COLOR.PRIMARY,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
