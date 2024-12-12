import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const StackWelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate('TabNavigation'));
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/bg/bg.png')}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}, {scale: scaleAnim}],
            },
          ]}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.legacyText}>Tiger Legacy</Text>
        </Animated.View>

        <LottieView
          source={require('../../assets/animation/TigerJungle.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1A1A1A',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    top: '15%',
    zIndex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 10,
    // textShadowColor: 'rgba(255, 68, 68, 0.5)',
    textShadowColor: 'rgba(255, 140, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 10,
  },
  legacyText: {
    color: '#FF8C00',
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 140, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 15,
  },
  lottie: {
    width: '100%',
    height: height * 0.65,
    bottom: 0,
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default StackWelcomeScreen;
