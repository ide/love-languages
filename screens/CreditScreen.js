import PropTypes from 'prop-types';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';

import Theme from '../styles/Theme';

export default class CreditScreen extends React.Component {
  static navigationOptions = {
    title: 'Acknowledgements',
  };

  static iconCredits = [
    {
      name: 'Chat',
      creator: 'Shastry',
      uri: 'https://thenounproject.com/icon/1243454/',
    },
    {
      name: 'Time',
      creator: 'Viktor Vorobyev',
      uri: 'https://thenounproject.com/icon/635985/',
    },
    {
      name: 'Gift',
      creator: 'Hans Draiman',
      uri: 'https://thenounproject.com/icon/591437/',
    },
    {
      name: 'Home',
      creator: 'Viktor Vorobyev',
      uri: 'https://thenounproject.com/icon/354231/',
    },
    {
      name: 'Handshake',
      creator: 'Ralf Schmitzer',
      uri: 'https://thenounproject.com/icon/371095/',
    },
  ];

  render() {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <Text style={styles.text}>
          The love languages in this app come from the book{' '}
          <Text style={styles.bookTitle}>The 5 Love Languages</Text> by Gary Chapman. The quiz
          questions in this app are from PDFs from{' '}
          <Text style={styles.link} onPress={this._openLoveLanguagesSite}>
            5LoveLanguages.com
          </Text>{' '}
          that say:
        </Text>
        <Text style={[styles.text, styles.notice]}>
          This profile is an excerpt from <Text style={styles.bookTitle}>The 5 Love Languages</Text>
          ® (2015, Northfield Publishing). Reproduction and distribution for use, personal and/or
          professional (workshops, organizations, churches, nonprofits, small groups, etc.) is
          permitted provided the profiles are distributed free of charge.
        </Text>

        <Text style={[styles.text, styles.heading]}>Icons</Text>
        {CreditScreen.iconCredits.map(credit => (
          <IconCredit
            key={`icon-${credit.name}`}
            name={credit.name}
            creator={credit.creator}
            uri={credit.uri}
            style={[styles.text, styles.iconCredit]}
          />
        ))}

        <Text style={[styles.text, styles.heading]}>Genuine Expo software</Text>
        <Text style={styles.text}>
          This app is free and I hope it brings you and the special people in your life closer
          together ❤️🧡💛💚💙
        </Text>
      </ScrollView>
    );
  }

  _openLoveLanguagesSite = () => {
    Linking.openURL('http://www.5lovelanguages.com/');
  };
}

class IconCredit extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
    style: Text.propTypes.style,
  };

  render() {
    return (
      <Text style={this.props.style}>
        <Text style={styles.link} onPress={this._openIconPage}>
          "{this.props.name}"
        </Text>{' '}
        by {this.props.creator}, from{' '}
        <Text style={styles.link} onPress={this._openNounProjectPage}>
          the Noun Project
        </Text>{' '}
        and licensed under{' '}
        <Text style={styles.link} onPress={this._openCCPage}>
          CC BY 3.0
        </Text>.
      </Text>
    );
  }

  _openIconPage = () => {
    Linking.openURL(this.props.uri);
  };

  _openNounProjectPage = () => {
    Linking.openURL('https://thenounproject.com');
  };

  _openCCPage = () => {
    Linking.openURL('https://creativecommons.org/licenses/by/3.0/us/legalcode');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 54,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  text: {
    fontSize: 17,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
  },
  bookTitle: {
    fontStyle: 'italic',
  },
  notice: {
    color: '#666',
    marginLeft: 8,
    marginVertical: 12,
  },
  iconCredit: {
    fontSize: 14,
    marginTop: 8,
  },
  link: {
    color: Theme.primaryLightColor,
  },
});
