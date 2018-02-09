import { DangerZone } from 'expo';
import invariant from 'invariant';
import countBy from 'lodash/countBy';
import maxBy from 'lodash/maxBy';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Share, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';

import Sharing from '../Sharing';
import LanguageExplanation from '../components/LanguageExplanation';
import QuizResultChart from '../components/QuizResultChart';
import Quiz from '../quiz/Quiz';
import Actions from '../store/Actions';
import Theme from '../styles/Theme';

const { GestureHandler } = DangerZone;
const { BorderlessButton, ScrollView } = GestureHandler;

class QuizResultScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      parentNavigation: PropTypes.object.isRequired,
    }).isRequired,
    results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  static navigationOptions = {
    title: `Your Love Language`,
  };

  state = {
    didShare: false,
  };

  render() {
    let primaryLanguages = this._getPrimaryLanguages();

    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <QuizResultSummary
          primaryLanguages={primaryLanguages}
          style={styles.primaryLanguageSummary}
        />

        {primaryLanguages.map((language, ii) => (
          <LanguageExplanation
            key={`language-${language}`}
            language={language}
            style={[
              styles.languageExplanation,
              ii === primaryLanguages.length - 1 ? styles.lastLanguageExplanation : null,
            ]}
          />
        ))}

        <Text style={styles.text}>See your scores for the other love languages:</Text>
        <QuizResultChart results={this.props.results} style={styles.chart} />

        <View style={styles.buttons}>
          <BorderlessButton
            onPress={this._shareQuizAsync}
            style={[styles.button, styles.spacedButton]}>
            <Text style={styles.buttonText}>Share Your Quiz</Text>
          </BorderlessButton>

          <BorderlessButton onPress={this._restartAsync} style={styles.button}>
            <Text style={styles.buttonText}>Start Again</Text>
          </BorderlessButton>
        </View>
      </ScrollView>
    );
  }

  _shareQuizAsync = async () => {
    let primaryLanguages = this._getPrimaryLanguages();
    invariant(primaryLanguages.length > 0, `There must be at least one primary language`);

    await Share.share(
      {
        title: 'Find out your love language!',
        message: Sharing.getShareMessage(primaryLanguages),
        url: Sharing.expoProjectUri,
      },
      {
        dialogTitle: 'hi there!',
      }
    );

    this.setState({ didShare: true });
  };

  _restartAsync = async () => {
    if (!this.state.didShare) {
      let mayShare = await this._promptToShareAsync();
      if (mayShare) {
        await this._shareQuizAsync();
      }
    }

    this._navigateHome();
  };

  _promptToShareAsync() {
    return new Promise(resolve => {
      Alert.alert(
        `Share Your Quiz?`,
        `Would you like to share your quiz results with a loved one or your friends before starting over?`,
        [
          { text: 'Not Now', onPress: () => resolve(false), style: 'cancel' },
          { text: 'Yes', onPress: () => resolve(true) },
        ],
        { onDismiss: () => resolve(false) }
      );
    });
  }

  _navigateHome() {
    let subscription = this.props.screenProps.parentNavigation.addListener('didBlur', event => {
      subscription.remove();
      this.props.navigation.popToTop({ immediate: true });
    });
    this.props.screenProps.parentNavigation.navigate('Home');
  }

  _getPrimaryLanguages() {
    let maxScore = maxBy(this.props.results, result => result.score).score;
    let topResults = this.props.results.filter(result => result.score === maxScore);
    invariant(topResults.length > 0, `There must be at least one primary love language`);
    return topResults.map(result => result.language);
  }
}

export default connect(state => {
  let scores = countBy(state.quiz.answers, answer => answer.language);
  let results = values(Quiz.Languages)
    .map(language => ({
      language,
      score: scores[language] || 0,
    }))
    .sort((a, b) => b.score - a.score);
  return { results };
})(QuizResultScreen);

class QuizResultSummary extends React.PureComponent {
  static propTypes = {
    primaryLanguages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    style: Text.propTypes.style,
  };

  render() {
    let { primaryLanguages } = this.props;
    let message = null;

    if (primaryLanguages.length === 1) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          Your primary love language is {primaryLanguages[0]}!
        </Text>
      );
    } else if (primaryLanguages.length === 2) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          Your primary love languages are {primaryLanguages[0]} and {primaryLanguages[1]}. You're
          "bilingual"!
        </Text>
      );
    } else if (primaryLanguages.length === 3) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          Your primary love languages are {primaryLanguages[0]}, {primaryLanguages[1]}, and{' '}
          {primaryLanguages[2]}. You're "trilingual"!
        </Text>
      );
    } else {
      message = (
        <Text style={[styles.text, this.props.style]}>
          Your have many love languages. Many expressions of love are important to you!
        </Text>
      );
    }

    return message;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 32,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  text: {
    color: Theme.darkTextColor,
    fontFamily: 'chasing-hearts',
    fontSize: 24,
  },
  primaryLanguageSummary: {
    marginBottom: 28,
  },
  languageExplanation: {
    marginBottom: 12,
  },
  lastLanguageExplanation: {
    marginBottom: 28,
  },
  chart: {
    alignSelf: 'stretch',
    marginBottom: 32,
    marginTop: 32,
  },
  buttons: {
    marginBottom: 16,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: Theme.primaryColor,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  spacedButton: {
    marginBottom: 20,
  },
  buttonText: {
    color: Theme.lightTextColor,
    fontSize: 17,
    fontWeight: 'bold',
    minWidth: 180,
    textAlign: 'center',
  },
});
