import { GestureHandler } from 'expo';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';

import Sounds from '../assets/Sounds';
import Quiz from '../quiz/Quiz';
import Actions from '../store/Actions';
import Theme from '../styles/Theme';

const { RectButton } = GestureHandler;

class QuizQuestionScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    question: PropTypes.arrayOf(PropTypes.object).isRequired,
    answer: PropTypes.object,
    numberOfQuestions: PropTypes.number.isRequired,
  };

  static navigationOptions({ navigation }) {
    let routeParams = navigation.state.params;
    let questionIndex = routeParams.index;
    return {
      title: `Question ${questionIndex + 1} / 30`,
    };
  }

  constructor(props) {
    super(props);

    let routeParams = this.props.navigation.state.params;
    let questionIndex = routeParams.index;
    invariant(questionIndex >= 0, 'Question index must be positive');
    invariant(
      questionIndex < this.props.numberOfQuestions,
      'Question index must be less than the number of questions'
    );
  }

  render() {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <Text style={styles.prompt}>{Quiz.prompt}</Text>
        {this.props.question.map((choice, ii) => (
          <QuizQuestionChoice
            key={choice.text}
            text={choice.text}
            selected={choice === this.props.answer}
            onSelect={() => {
              this._selectChoiceAsync(choice);
            }}
            style={[
              styles.choice,
              ii === this.props.question.length - 1 ? styles.lastChoice : null,
            ]}
          />
        ))}
      </ScrollView>
    );
  }

  async _selectChoiceAsync(choice) {
    let routeParams = this.props.navigation.state.params;
    let currentQuestionIndex = routeParams.index;

    this.props.dispatch(Actions.chooseAnswer(currentQuestionIndex, choice));

    await this._navigateToNextScreenAsync();
  }

  async _navigateToNextScreenAsync() {
    let routeParams = this.props.navigation.state.params;
    let currentQuestionIndex = routeParams.index;
    let nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < this.props.numberOfQuestions) {
      this.props.navigation.navigate('QuizQuestion', {
        index: nextQuestionIndex,
      });
      await Sounds.playEffectAsync(Sounds.buttonPress);
    } else {
      this.props.navigation.navigate('QuizResult');
      await Sounds.playEffectAsync(Sounds.completion);
    }
  }
}

export default connect((state, ownProps) => {
  let { questions, answers } = state.quiz;
  let routeParams = ownProps.navigation.state.params;
  return {
    question: questions[routeParams.index],
    answer: answers[routeParams.index],
    numberOfQuestions: questions.length,
  };
})(QuizQuestionScreen);

class QuizQuestionChoice extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    style: ViewPropTypes.style,
  };

  render() {
    return (
      <RectButton
        disallowInterruption
        underlayColor={this.props.selected ? Theme.lightTextColor : Theme.primaryColor}
        onPress={this.props.onSelect}
        style={[
          styles.choiceButton,
          this.props.selected ? styles.selectedChoiceButton : null,
          this.props.style,
        ]}>
        <Text style={[styles.choiceText, this.props.selected ? styles.selectedChoiceText : null]}>
          {this.props.text}
        </Text>
      </RectButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  prompt: {
    fontFamily: 'chasing-hearts',
    fontSize: 24,
    marginBottom: 32,
  },
  choice: {
    marginBottom: 28,
  },
  lastChoice: {
    marginBottom: 0,
  },
  choiceButton: {
    borderColor: Theme.primaryColor,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    minHeight: 80,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedChoiceButton: {
    backgroundColor: Theme.primaryColor,
  },
  choiceText: {
    color: Theme.darkTextColor,
    fontSize: 17,
  },
  selectedChoiceText: {
    color: Theme.lightTextColor,
  },
});
