import { Asset } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import Quiz from '../quiz/Quiz';
import Theme from '../styles/Theme';

const explanations = {
  [Quiz.Languages
    .WORDS_OF_AFFIRMATION]: `Hearing a loved one say they love you and appreciate & support you is especially meaningful to you.`,
  [Quiz.Languages
    .QUALITY_TIME]: `You especially appreciate spending focused time with a loved one and having their undivided attention.`,
  [Quiz.Languages
    .RECEIVING_GIFTS]: `A thoughtful gift a loved one has picked for you is especially meaningful to you.`,
  [Quiz.Languages
    .ACTS_OF_SERVICE]: `You especially appreciate when a loved one makes an effort to brighten or ease your day.`,
  [Quiz.Languages
    .PHYSICAL_TOUCH]: `Sharing touch with a loved one, even a touch on the arm or a hug, is especially meaningful to you.`,
};

export default class LanguageExplanation extends React.PureComponent {
  static propTypes = {
    language: PropTypes.string.isRequired,
    style: ViewPropTypes.style,
  };

  render() {
    let iconSource = Theme.languageIcons[this.props.language];
    let iconAsset = Asset.fromModule(iconSource);

    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={Theme.languageIcons[this.props.language]}
          style={[
            styles.languageIcon,
            {
              aspectRatio: iconAsset.width / iconAsset.height,
              tintColor: Theme.languageColors[this.props.language],
            },
          ]}
        />
        <Text style={styles.explanationText}>{explanations[this.props.language]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  languageIcon: {
    marginRight: 16,
    resizeMode: 'contain',
    width: 32,
  },
  explanationText: {
    color: Theme.darkTextColor,
    flex: 1,
    fontSize: 17,
  },
});
