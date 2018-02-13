import invariant from 'invariant';
import maxBy from 'lodash/maxBy';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import LanguageExplanation from '../components/LanguageExplanation';
import QuizResultChart from '../components/QuizResultChart';
import Theme from '../styles/Theme';

export default class QuizResult extends React.Component {
  static propTypes = {
    voice: PropTypes.oneOf(['first-person', 'second-person']).isRequired,
    results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    voice: 'second-person',
  };

  render() {
    let { voice } = this.props;
    let primaryLanguages = this._getPrimaryLanguages();

    return (
      <View style={[styles.container, this.props.style]}>
        <QuizResultSummary
          voice={voice}
          primaryLanguages={primaryLanguages}
          style={styles.primaryLanguageSummary}
        />

        {primaryLanguages.map((language, ii) => (
          <LanguageExplanation
            key={`language-${language}`}
            voice={voice}
            language={language}
            style={[
              styles.languageExplanation,
              ii === primaryLanguages.length - 1 ? styles.lastLanguageExplanation : null,
            ]}
          />
        ))}

        <Text style={styles.text}>
          See {voice === 'first-person' ? `my` : `your`} scores for the other love languages:
        </Text>
        <QuizResultChart results={this.props.results} style={styles.chart} />
      </View>
    );
  }

  _getPrimaryLanguages() {
    let maxScore = maxBy(this.props.results, result => result.score).score;
    let topResults = this.props.results.filter(result => result.score === maxScore);
    invariant(topResults.length > 0, `There must be at least one primary love language`);
    return topResults.map(result => result.language);
  }
}

class QuizResultSummary extends React.PureComponent {
  static propTypes = {
    voice: PropTypes.oneOf(['first-person', 'second-person']).isRequired,
    primaryLanguages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    style: Text.propTypes.style,
  };

  render() {
    let { voice, primaryLanguages } = this.props;
    let message = null;

    if (primaryLanguages.length === 1) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          {voice === 'first-person' ? `My` : `Your`} primary love language is {primaryLanguages[0]}!
        </Text>
      );
    } else if (primaryLanguages.length === 2) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          {voice === 'first-person' ? `My` : `Your`} primary love languages are{' '}
          {primaryLanguages[0]} and {primaryLanguages[1]}.{' '}
          {voice === 'first-person' ? `I'm` : `You're`} "bilingual"!
        </Text>
      );
    } else if (primaryLanguages.length === 3) {
      message = (
        <Text style={[styles.text, this.props.style]}>
          {voice === 'first-person' ? `My` : `Your`} primary love languages are{' '}
          {primaryLanguages[0]}, {primaryLanguages[1]}, and {primaryLanguages[2]}.{' '}
          {voice === 'first-person' ? `I'm` : `You're`} "trilingual"!
        </Text>
      );
    } else {
      message = (
        <Text style={[styles.text, this.props.style]}>
          {voice === 'first-person' ? `I` : `You`} have many love languages. Many expressions of
          love are important to {voice === 'first-person' ? `me` : `you`}!
        </Text>
      );
    }

    return message;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    color: Theme.darkTextColor,
    fontFamily: 'chasing-hearts',
    fontSize: 24,
  },
  primaryLanguageSummary: {
    marginBottom: 28,
    marginTop: 20,
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
});
