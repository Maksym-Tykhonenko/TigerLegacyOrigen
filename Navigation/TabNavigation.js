import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Platform, TouchableOpacity,AppState} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TabArticleScreen,
  TabMainScreen,
  TabQuizScreen,
  TabTigerMapScreen,
} from '../screen/tab';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  toggleBackgroundMusic,
  setupPlayer,
  pauseBackgroundMusic,
  playBackgroundMusic,
} from '../setUpSound/setPlayer';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isPlayMusic, setIsPlayMusic] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsPlayMusic(true);
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handlePlayMusicToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsPlayMusic(newState);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: styles.tabLabel,
        animation: 'fade',
      }}>
      <Tab.Screen
        name="TabMainScreen"
        component={TabMainScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="person" size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="game-controller" size={32} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="TabTigerMapScreen"
        component={TabTigerMapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <Icon name="map" size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabArticleScreen"
        component={TabArticleScreen}
        options={{
          tabBarLabel: 'Achieves',
          tabBarIcon: ({color, size}) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="award" size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={NillComponent}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: () => (
            <TouchableOpacity onPress={handlePlayMusicToggle}>
              <Icon
                name="play"
                size={32}
                color={isPlayMusic ? '#FF8C00' : '#666'}
              />
            </TouchableOpacity>
          ),

          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: isPlayMusic ? '#FF8C00' : '#666',
            marginTop: 5,
          },
        }}
        listeners={{tabPress: e => e.preventDefault()}}
      />
    </Tab.Navigator>
  );
};

const NillComponent = () => null;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    height: 80,
    // shadowColor: '#FF4444',
    shadowColor: '#FF8C00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingBottom: 5,
    paddingTop: 5,
    borderWidth: 1,
    // borderColor: '#FF4444',
    borderColor: '#FF8C00',
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#FF8C00',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
    }),
    marginHorizontal: 10,
    paddingTop:8
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default TabNavigation;
