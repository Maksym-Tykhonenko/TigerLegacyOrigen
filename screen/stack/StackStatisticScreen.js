import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {useAppContext} from '../../store/context';
import {Achievements} from '../../data/achievs';
import TabSurvivalLayout from '../../components/layout/TabSurvivalLayout';

const StackStatisticScreen = () => {
  const {highScores, gamesPlayed, quizHistory} = useAppContext();

  const checkAchievementUnlocked = achievement => {
    switch (achievement.id) {
      case 'FIRST_GAME':
        return gamesPlayed.survival + gamesPlayed.timeChallenge > 0;

      case 'PLAY_10_GAMES':
        return gamesPlayed.survival + gamesPlayed.timeChallenge >= 10;

      case 'SURVIVAL_MASTER':
        return highScores.survival >= 10;

      case 'TIME_MASTER':
        return highScores.timeChallenge >= 15;

      case 'PERFECT_ROUND':
        return quizHistory.some(game => game.score >= 20);

      case 'QUICK_LEARNER':
        return gamesPlayed.timeChallenge >= 5;

      case 'SURVIVOR':
        return gamesPlayed.survival >= 5;

      case 'TIGER_EXPERT':
        return highScores.survival >= 15 || highScores.timeChallenge >= 20;

      default:
        return false;
    }
  };

  const calculateProgress = achievement => {
    switch (achievement.id) {
      case 'FIRST_GAME':
        return Math.min(
          (gamesPlayed.survival + gamesPlayed.timeChallenge) * 100,
          100,
        );

      case 'PLAY_10_GAMES':
        return Math.min(
          ((gamesPlayed.survival + gamesPlayed.timeChallenge) / 10) * 100,
          100,
        );

      case 'SURVIVAL_MASTER':
        return Math.min((highScores.survival / 10) * 100, 100);

      case 'TIME_MASTER':
        return Math.min((highScores.timeChallenge / 15) * 100, 100);

      case 'PERFECT_ROUND':
        if (!quizHistory || quizHistory.length === 0) return 0;
        const bestScore = Math.max(...quizHistory.map(game => game.score || 0));
        return Math.min((bestScore / 20) * 100, 100);

      case 'QUICK_LEARNER':
        return Math.min((gamesPlayed.timeChallenge / 5) * 100, 100);

      case 'SURVIVOR':
        return Math.min((gamesPlayed.survival / 5) * 100, 100);

      case 'TIGER_EXPERT':
        const survivalProgress = (highScores.survival / 15) * 100;
        const timeProgress = (highScores.timeChallenge / 20) * 100;
        return Math.min(Math.max(survivalProgress, timeProgress), 100);

      default:
        return 0;
    }
  };

  return (
    <TabSurvivalLayout blur={10}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Achievements</Text>
        <ScrollView style={styles.scrollView}>
          {Achievements.map(achievement => {
            const isUnlocked = checkAchievementUnlocked(achievement);
            const progress = calculateProgress(achievement);

            return (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  isUnlocked && styles.achievementCardUnlocked,
                ]}>
                <View style={styles.achievementHeader}>
                  <View style={styles.achievementIcon}>
                    {isUnlocked ? (
                      <Text style={styles.achievementEmoji}>
                        {achievement.icon}
                      </Text>
                    ) : (
                      <Text style={styles.lockedEmoji}>🔒</Text>
                    )}
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, {width: `${progress}%`}]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(progress)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={{height: 90}} />
      </SafeAreaView>
    </TabSurvivalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',

    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  achievementCardUnlocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor: '#FF8C00',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
    backgroundColor: 'rgba(255, 140, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  lockedEmoji: {
    fontSize: 20,
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    // color: '#999',
    color: 'white',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: 'bold',
    minWidth: 45,
    textAlign: 'right',
  },
});

export default StackStatisticScreen;
