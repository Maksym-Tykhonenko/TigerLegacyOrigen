import React, {useState, useEffect} from 'react';
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

const StackFirstDeath = ({navigation}) => {
  const {
    getRandomQuestion,
    updateHighScore,
    saveQuizResult,
    incrementGamesPlayed,
  } = useAppContext();

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    getNextQuestion();
  }, []);

  const getNextQuestion = () => {
    const question = getRandomQuestion(usedQuestionIds);
    setCurrentQuestion(question);
    setUsedQuestionIds([...usedQuestionIds, question.id]);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAnswer = async selectedAnswer => {
    if (selectedAnswer === currentQuestion.answer) {
      const newScore = score + 1;
      setScore(newScore);
      await updateHighScore('survival', newScore);
      getNextQuestion();
    } else {
      try {
        await saveQuizResult('survival', score, null);
        await incrementGamesPlayed('survival');
        navigation.replace('StackQuizResults', {
          mode: 'survival',
          score: score,
          message: 'Game Over! You made it to:',
        });
      } catch (error) {
        console.error('Error ending game:', error);
      }
    }
  };

  if (!currentQuestion) return null;

  return (
    <QuizLayout>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.score}>Score: {score}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View
            style={[styles.questionContainer, {opacity: fadeAnim}]}>
            <Text style={styles.question}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </QuizLayout>
  );
};

export default StackFirstDeath;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 50,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    color: 'black',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
