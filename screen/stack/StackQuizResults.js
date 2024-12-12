import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import {useAppContext} from '../../store/context';
import QuizLayout from '../../components/layout/QuizLayout';

const StackQuizResults = ({route, navigation}) => {
  const {mode, score, message} = route.params;
  console.log(score);
  const {highScores, gamesPlayed} = useAppContext();

  const isNewHighScore = score >= highScores[mode];

  const getModeName = () => {
    return mode === 'survival' ? 'Survival Mode' : 'Time Challenge';
  };

  return (
    <QuizLayout blur={5}>
      <ScrollView  contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.gameMode}>{getModeName()}</Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.scoreText}>{score}</Text>
            {isNewHighScore && (
              <Text style={styles.newHighScoreText}>New High Score! 🏆</Text>
            )}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>High Score</Text>
              <Text style={styles.statValue}>
                {Math.max(highScores[mode], score)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Games Played</Text>
              <Text style={styles.statValue}>{gamesPlayed[mode]}</Text>
            </View>
          </View>

          <View style={styles.additionalStats}>
            <Text style={styles.additionalStatsText}>
              Total Games: {gamesPlayed.survival + gamesPlayed.timeChallenge}
            </Text>
            <Text style={styles.additionalStatsText}>
              Average Score:{' '}
              {(highScores[mode] / (gamesPlayed[mode] || 1)).toFixed(1)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.retryButton]}
              onPress={() =>
                navigation.replace(
                  mode === 'survival'
                    ? 'StackFirstDeath'
                    : 'StackTimeChallengeScreen',
                )
              }>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.homeButton]}
              onPress={() => navigation.navigate('TabNavigation')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </QuizLayout>
  );
};

export default StackQuizResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    justifyContent:'center'
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameMode: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 30,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  messageText: {
    fontSize: 18,
    color: '#FFA500',
    marginBottom: 10,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FF8C00',
    textShadowColor: 'rgba(255, 140, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  newHighScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    padding: 15,
    borderRadius: 15,
    minWidth: 140,
  },
  statLabel: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#FF8C00',
  },
  homeButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  additionalStats: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  additionalStatsText: {
    fontSize: 16,
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 5,
  },
});
