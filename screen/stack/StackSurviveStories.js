import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAppContext} from '../../store/context';
import {TigerSurvive} from '../../data/survive';
import {useNavigation} from '@react-navigation/native';
import TabSurvivalLayout from '../../components/layout/TabSurvivalLayout';

const StackSurviveStories = () => {
  const navigation = useNavigation();
  const {highScores, unlockStory} = useAppContext();

  const handleUnlock = (storyId, cost) => {
    if (!highScores.survival || highScores.survival < cost) {
      Alert.alert(
        'Insufficient Points',
        `You need ${cost} survival points to unlock this story. Keep playing to earn more points!`,
        [{text: 'OK'}],
      );
      return;
    }

    Alert.alert(
      'Unlock Story',
      `Do you want to spend ${cost} points to unlock this story?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Unlock',
          style: 'default',
          onPress: async () => {
            const success = await unlockStory(storyId, cost);
            if (!success) {
              Alert.alert('Error', 'Failed to unlock story. Please try again.');
            }
          },
        },
      ],
    );
  };

  const isStoryUnlocked = storyId => {
    return highScores.unlockedStories?.includes(storyId) || false;
  };

  return (
    <TabSurvivalLayout>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back to Map</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tiger Survival Stories</Text>
        <Text style={styles.points}>
          Available Points: {highScores.survival || 0}
        </Text>

        <ScrollView style={styles.scrollView}>
          {TigerSurvive.map(story => {
            const unlocked = isStoryUnlocked(story.id);

            return (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                onPress={() =>
                  navigation.navigate('StackSurviveStorieDetails', {
                    storyId: story.id,
                  })
                }>
                <View style={styles.storyHeader}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    {!unlocked && (
                      <View style={styles.costContainer}>
                        <Text style={styles.costText}>1 point</Text>
                      </View>
                    )}
                  </View>
                  {!unlocked && (
                    <TouchableOpacity
                      style={styles.unlockButton}
                      onPress={() => handleUnlock(story.id, 1)}>
                      <Text style={styles.unlockButtonText}>🔓 Unlock</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {unlocked ? (
                  <Text style={styles.storyContent}>Press to read</Text>
                ) : (
                  <View style={styles.lockedContent}>
                    <Text style={styles.lockedText}>
                      🔒 Unlock this story to read about {story.title}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* <View style={{height: 90}} /> */}
      </SafeAreaView>
    </TabSurvivalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },
  backButton: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  backButtonText: {
    color: '#FF8C00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginVertical: 15,
  },
  points: {
    fontSize: 18,
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  storyCard: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    backgroundColor: 'rgba(255, 140, 0, 0.8)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  costContainer: {
    marginTop: 5,
  },
  costText: {
    color: '#FF8C00',
    fontSize: 14,
    color: 'white',
  },
  unlockButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unlockButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  storyContent: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  lockedContent: {
    padding: 20,
    alignItems: 'center',
  },
  lockedText: {
    // color: '#666',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default StackSurviveStories;
