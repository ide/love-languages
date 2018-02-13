import { Asset } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import Quiz from '../quiz/Quiz';
import Theme from '../styles/Theme';

export default class LanguageExplanation extends React.PureComponent {
  static propTypes = {
    voice: PropTypes.oneOf(['first-person', 'second-person']).isRequired,
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
        <Text style={styles.explanationText}>
          {_getExplanation(this.props.language, this.props.voice)}
        </Text>
      </View>
    );
  }
}

function _getExplanation(language, voice) {
  let subjectCapitalized = voice === 'first-person' ? 'I' : 'You';
  let object = voice === 'first-person' ? 'me' : 'you';
  let possessive = voice === 'first-person' ? 'my' : 'your';

  switch (language) {
    case Quiz.Languages.WORDS_OF_AFFIRMATION:
      return `Hearing a loved one say they love ${object} and appreciate & support ${object} is especially meaningful to ${object}.`;
    case Quiz.Languages.QUALITY_TIME:
      return `${subjectCapitalized} especially appreciate spending focused time with a loved one and having their undivided attention.`;
    case Quiz.Languages.RECEIVING_GIFTS:
      return `A thoughtful gift a loved one has picked for you is especially meaningful to ${object}.`;
    case Quiz.Languages.ACTS_OF_SERVICE:
      return `${subjectCapitalized} especially appreciate when a loved one makes an effort to brighten or ease ${possessive} day.`;
    case Quiz.Languages.PHYSICAL_TOUCH:
      return `Sharing touch with a loved one, even a touch on the arm or a hug, is especially meaningful to ${object}.`;
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
