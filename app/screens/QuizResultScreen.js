import { FileSystem, GestureHandler, Permissions, takeSnapshotAsync } from 'expo';
import invariant from 'invariant';
import countBy from 'lodash/countBy';
import maxBy from 'lodash/maxBy';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import React from 'react';
import { CameraRoll, Platform, Share, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import HeaderRightButton from '../components/HeaderRightButton';
import QuizResult from '../components/QuizResult';
import Quiz from '../quiz/Quiz';
import Prompt from '../stuff/Prompt';
import Sharing from '../stuff/Sharing';
import Theme from '../styles/Theme';

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

  static navigationOptions({ navigation }) {
    let params = navigation.state.params || {};
    return {
      title: `Your Love Language`,
      headerRight: <HeaderRightButton onPress={params.saveResults}>Save</HeaderRightButton>,
    };
  }

  state = {
    didShare: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ saveResults: this._saveResultsAsync });
  }

  render() {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <QuizResult
          ref={this._setSavableResultsView}
          voice="second-person"
          results={this.props.results}
          style={styles.content}
        />
        <View style={[styles.content, styles.buttons]}>
          <BorderlessButton
            disallowInterruption
            onPress={this._shareQuizAsync}
            style={[styles.button, styles.spacedButton]}>
            <Text style={styles.buttonText}>Share Your Quiz</Text>
          </BorderlessButton>

          <BorderlessButton disallowInterruption onPress={this._restartAsync} style={styles.button}>
            <Text style={styles.buttonText}>Start Again</Text>
          </BorderlessButton>
        </View>
      </ScrollView>
    );
  }

  _setSavableResultsView = resultsView => {
    this._savableResultsView = resultsView;
  };

  _setShareableResultsView = resultsView => {
    this._shareableResultsView = resultsView;
  };

  _shareQuizAsync = async () => {
    let primaryLanguages = this._getPrimaryLanguages();
    invariant(primaryLanguages.length > 0, `There must be at least one primary language`);

    let shareTitle = 'Find out your love language!';
    await Share.share(
      {
        title: shareTitle,
        message: Sharing.getShareMessage(primaryLanguages),
        url: Sharing.expoProjectUri,
      },
      {
        dialogTitle: shareTitle,
      }
    );

    this.setState({ didShare: true });
  };

  _restartAsync = async () => {
    if (!this.state.didShare) {
      let mayShare = await Prompt.promptAsync(
        `Share Your Quiz?`,
        `Would you like to share your quiz results with a loved one or your friends before starting over?`,
        { acceptText: 'Yes', cancelText: 'Not Now' }
      );

      if (mayShare) {
        await this._shareQuizAsync();
      }
    }

    this._navigateHome();
  };

  _navigateHome() {
    let subscription = this.props.screenProps.parentNavigation.addListener('didBlur', event => {
      subscription.remove();
      this.props.navigation.popToTop({ immediate: true });
    });
    this.props.screenProps.parentNavigation.navigate('Home');
  }

  _saveResultsAsync = async () => {
    let shouldSave = await Prompt.promptAsync(
      `Save to Photos?`,
      `Would you like to save a snapshot of your results to your photos?`,
      { acceptText: 'Save', cancelText: 'Cancel' }
    );

    if (!shouldSave) {
      return;
    }

    let permissionName = Platform.OS === 'ios' ? 'Photos' : 'Camera';
    let cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPermissions.status !== 'granted') {
      await Prompt.alertAsync(
        `${permissionName} Permission Denied`,
        `This app needs permission to save a snapshot to your camera roll. Enable the ${permissionName} permission for this app in your phone's settings. In the meantime, try taking a screenshot yourself instead.`,
        { acceptText: 'OK' }
      );
      return;
    }

    let screenshotUri;
    try {
      screenshotUri = await takeSnapshotAsync(this._savableResultsView, {
        format: 'png',
        result: 'file',
      });
    } catch (e) {
      await Prompt.alertAsync(
        `Couldn't Save Snapshot`,
        `Something went wrong taking a snapshot of your results. Sorry about that. In the meantime, try taking a screenshot yourself instead.`,
        { acceptText: 'OK' }
      );
      return;
    }

    try {
      await CameraRoll.saveToCameraRoll(screenshotUri, 'photo');
    } catch (e) {
      await Prompt.alertAsync(
        `Couldn't Save Snapshot`,
        `This app needs permission to save a snapshot to your photos. Enable the ${permissionName} permission for this app in your phone's settings. In the meantime, try taking a screenshot yourself instead.`,
        { acceptText: 'OK' }
      );
      return;
    } finally {
      await FileSystem.deleteAsync(screenshotUri, { idempotent: true });
    }

    await Prompt.alertAsync(
      `Results Saved`,
      `You can now find a snapshot of your results in your device's photos.`,
      {
        acceptText: 'OK',
      }
    );
  };

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  text: {
    color: Theme.darkTextColor,
    fontFamily: 'chasing-hearts',
    fontSize: 24,
  },
  buttons: {
    marginBottom: 48,
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
  shareableResults: {
    paddingHorizontal: 40,
    paddingVertical: 40,
    position: 'absolute',
    width: 1200,
  },
});
