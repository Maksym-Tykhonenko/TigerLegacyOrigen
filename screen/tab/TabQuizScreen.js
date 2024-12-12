import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useAppContext} from '../../store/context';
import TabLayout from '../../components/layout/TabLayout';

const TabQuizScreen = ({navigation}) => {
  const {highScores, gamesPlayed} = useAppContext();

  return (
    <TabLayout blur={20}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.mainTitle}>Tiger Quiz Challenge</Text>
            <Text style={styles.subtitle}>
              Test your knowledge about tigers
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Games</Text>
                <Text style={styles.statValue}>
                  {gamesPlayed.survival + gamesPlayed.timeChallenge}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Best Score</Text>
                <Text style={styles.statValue}>
                  {Math.max(highScores.survival, highScores.timeChallenge)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Score</Text>
                <Text style={styles.statValue}>
                  {highScores.timeChallenge + highScores.survival}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.challengeCard, styles.deathCard]}
              onPress={() => navigation.navigate('StackFirstDeath')}>
              <View style={[styles.cardOverlay, styles.deathOverlay]}>
                <Text style={styles.cardTitle}>Survival Mode</Text>
                <Text style={styles.heartText}>❤️</Text>

                <Text style={styles.cardDescription}>
                  One life, one chance! How far can you go without making a
                  mistake?
                </Text>
                <View style={styles.cardStats}>
                  <Text style={styles.cardStatText}>
                    High Score: {highScores.survival}
                  </Text>
                  <Text style={styles.cardStatText}>
                    Games: {gamesPlayed.survival}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.challengeCard}
              onPress={() => navigation.navigate('StackTimeChallengeScreen')}>
              <View style={[styles.cardOverlay, styles.timeOverlay]}>
                <Text style={styles.cardTitle}>Time Challenge</Text>
                <Text style={styles.timerText}>90s</Text>
                <Text style={styles.cardDescription}>
                  Race against time! Answer as many questions as you can in 90
                  seconds
                </Text>
                <View style={styles.cardStats}>
                  <Text style={styles.cardStatText}>
                    High Score: {highScores.timeChallenge}
                  </Text>
                  <Text style={styles.cardStatText}>
                    Games: {gamesPlayed.timeChallenge}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{height: 50}} />
      </SafeAreaView>
    </TabLayout>
  );
};

export default TabQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    // color: '#FF4444',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFA500',
    // color: '#FF4444',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 30,
    gap: 10,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    padding: 15,
    borderRadius: 15,
    minWidth: 100,
    borderWidth: 1,
    // borderColor: '#FF4444',
    borderColor: '#FFA500',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFA500',
    marginBottom: 5,
    // color: '#FF4444'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    // color: '#FF4444'
  },
  challengeCard: {
    height: 220,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 140, 0, 0.7)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deathCard: {
    backgroundColor: '#4A90E2',
  },
  cardOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeOverlay: {
    backgroundColor: 'rgba(255, 140, 0, 0.3)',
  },
  deathOverlay: {
    backgroundColor: 'rgba(74, 144, 226, 0.85)',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  heartText: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  cardStatText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
});
