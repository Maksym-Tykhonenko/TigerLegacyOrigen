import {StyleSheet, Text, View} from 'react-native';
import {StackStatisticScreen} from '../stack';
import {StackSurviveStories} from '../stack';

const TabArticleScreen = () => {
  return (
    <View style={styles.container}>
      <StackStatisticScreen />
      {/* <StackSurviveStories /> */}
    </View>
  );
};

export default TabArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});
