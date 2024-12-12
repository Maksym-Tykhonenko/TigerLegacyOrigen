import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

const TabSurvivalLayout = ({children,blur}) => {
  return (
    <ImageBackground
      // source={require('../../assets/bg/tigerBg.png')}
      source={require('../../assets/bg/bg.png')}
      resizeMode="cover"
      blurRadius={blur}
      style={styles.background}>
      {children}
    </ImageBackground>
  );
};

export default TabSurvivalLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // alignItems: 'center',
  },
});
