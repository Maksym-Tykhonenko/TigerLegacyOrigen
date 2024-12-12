import {StyleSheet, ImageBackground} from 'react-native';

const TabLayout = ({children, blur}) => {
  return (
    <ImageBackground
      // source={require('../../assets/bg/tigerEye.png')}
      source={require('../../assets/bg/bg.png')}
      resizeMode="cover"
      blurRadius={blur}
      style={styles.background}>
      {children}
    </ImageBackground>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
});