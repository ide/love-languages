import { DangerZone } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';

import Theme from '../styles/Theme';

const { GestureHandler } = DangerZone;
const { BorderlessButton } = GestureHandler;

export default class HeaderRightButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    textStyle: Text.propTypes.style,
    style: ViewPropTypes.style,
  };

  render() {
    return (
      <BorderlessButton onPress={this.props.onPress} style={[styles.button, this.props.style]}>
        <Text numberOfLines={1} style={[styles.buttonText, this.props.textStyle]}>
          {this.props.children}
        </Text>
      </BorderlessButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 10,
    paddingRight: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: Theme.lightTextColor,
    fontSize: 17,
  },
});
