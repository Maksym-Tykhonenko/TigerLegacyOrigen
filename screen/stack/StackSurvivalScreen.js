import React, {useState, useEffect, useRef, useCallback} from 'react';
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

const StackSurvivalScreen = ({navigation}) => {
  const {
    getRandomQuestion, 
    updateHighScore, 
    saveQuizResult, 
    incrementGamesPlayed
  } = useAppContext();
  
  const handleGameOver = useCallback(async () => {
    if (isGameOver) return;
    setIsGameOver(true);

    const finalScore = scoreRef.current;
    
    setTimeout(async () => {
      try {
        await saveQuizResult('survival', finalScore);
        await updateHighScore('survival', finalScore);
        await incrementGamesPlayed('survival');
        
        navigation.replace('StackQuizResults', {
          mode: 'survival',
          score: finalScore,
          message: 'Game Over! Your score:',
        });
      } catch (error) {
        console.error('Error in handleGameOver:', error);
      }
    }, 0);
  }, [isGameOver, navigation, saveQuizResult, updateHighScore, incrementGamesPlayed]);

  return (
    <View style={styles.container}>
      {/* Rest of the component remains unchanged */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackSurvivalScreen; 