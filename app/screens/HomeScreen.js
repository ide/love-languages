import { GestureHandler } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Actions from '../store/Actions';
import Theme from '../styles/Theme';

const { BaseButton, BorderlessButton } = GestureHandler;

const AnimatedBaseButton = Animated.createAnimatedComponent(BaseButton);

class HomeScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Love Languages',
  };

  _startButtonOpacity = new Animated.Value(1);

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollContainer}>
          <Text style={styles.heading}>Love Languages</Text>
          <View style={styles.body}>
            <Text style={styles.text}>
              Love languages are different ways in which we connect with the people close to us. We
              each respond to the love languages in our own ways—some of us especially appreciate
              reaffirming compliments and others find a thoughtful gift particularly heartwarming.
            </Text>
            <Text style={styles.text}>
              With a minute or two and this app, you can discover your own love languages and help
              those close to you show they care.
            </Text>
            <AnimatedBaseButton
              disallowInterruption
              shouldActivateOnStart
              onActiveStateChange={this._handleButtonActiveStateChange}
              onPress={this._startQuiz}
              style={[styles.startButton, { opacity: this._startButtonOpacity }]}>
              <Text style={styles.startButtonText}>Take the Quiz</Text>
            </AnimatedBaseButton>
          </View>
          <BorderlessButton
            disallowInterruption
            onPress={this._showCredits}
            style={styles.creditsButton}>
            <Text style={styles.creditsButtonText}>Credits and Acknowledgements</Text>
          </BorderlessButton>
        </ScrollView>
      </SafeAreaView>
    );
  }

  _handleButtonActiveStateChange = isActive => {
    this._startButtonOpacity.setValue(isActive ? 0.7 : 1);
  };

  _startQuiz = () => {
    this.props.dispatch(Actions.startQuiz());
    this.props.navigation.goBack();
  };

  _showCredits = () => {
    this.props.navigation.navigate('Credits');
  };
}

export default connect()(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primaryColor,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  heading: {
    color: Theme.lightTextColor,
    fontFamily: 'athena',
    fontSize: 80,
    marginTop: 36,
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: Theme.lightTextColor,
    fontFamily: 'chasing-hearts',
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  activeStartButton: {
    opacity: 0.8,
  },
  startButtonText: {
    color: Theme.primaryDarkColor,
    fontSize: 17,
    fontWeight: 'bold',
  },
  creditsButton: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  creditsButtonText: {
    color: Theme.subtleTextColor,
  },
});
