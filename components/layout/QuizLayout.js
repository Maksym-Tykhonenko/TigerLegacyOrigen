import {StyleSheet, ImageBackground} from 'react-native';

const QuizLayout = ({children, blur}) => {
  return (
    <ImageBackground
      source={require('../../assets/bg/TigerQuizLife.png')}
      resizeMode="cover"
      blurRadius={blur}
      style={styles.background}>
      {children}
    </ImageBackground>
  );
};

export default QuizLayout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // alignItems: 'center',
  },
});
