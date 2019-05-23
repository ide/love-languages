import { GestureHandler } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import Sounds from '../assets/Sounds';

const { BorderlessButton } = GestureHandler;

class QuizIntroScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    numberOfQuestions: PropTypes.number.isRequired,
  };

  static navigationOptions = {
    title: `Take the Quiz`,
  };

  render() {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <Text style={styles.text}>
          The love languages quiz has {this.props.numberOfQuestions}{' '}
          {this.props.numberOfQuestions === 1 ? 'question' : 'questions'} about what you find
          meaningful. After answering question #{this.props.numberOfQuestions}, you'll learn how
          much each love language means to you.
        </Text>
        <BorderlessButton onPress={this._startQuizAsync} style={styles.startButton}>
          <Text style={styles.startButtonText}>Start the Quiz</Text>
        </BorderlessButton>
      </ScrollView>
    );
  }

  _startQuizAsync = async () => {
    this.props.navigation.navigate('QuizQuestion', { index: 0 });
    await Sounds.playEffectAsync(Sounds.completion);
  };
}

export default connect(state => ({
  numberOfQuestions: state.quiz.questions.length,
}))(QuizIntroScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  text: {
    fontFamily: 'chasing-hearts',
    fontSize: 24,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#9c27b0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
