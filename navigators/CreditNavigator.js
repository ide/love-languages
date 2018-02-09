import { DangerZone } from 'expo';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import CreditScreen from '../screens/CreditScreen';
import Theme from '../styles/Theme';

const { GestureHandler } = DangerZone;
const { BorderlessButton } = GestureHandler;

export default class CreditNavigatorContainer extends React.Component {
  render() {
    return <CreditNavigator screenProps={{ parentNavigation: this.props.navigation }} />;
  }
}

const CreditNavigator = StackNavigator(
  {
    Credits: {
      screen: CreditScreen,
      navigationOptions: ({ screenProps }) => ({
        headerRight: (
          <BorderlessButton
            onPress={() => screenProps.parentNavigation.goBack()}
            style={styles.doneButton}>
            <Text numberOfLines={1} style={styles.doneButtonText}>
              Done
            </Text>
          </BorderlessButton>
        ),
      }),
    },
  },
  {
    initialRouteName: 'Credits',
    navigationOptions: {
      headerStyle: { backgroundColor: Theme.primaryColor },
      headerTintColor: Theme.lightTextColor,
    },
  }
);

const styles = StyleSheet.create({
  doneButton: {
    paddingLeft: 10,
    paddingRight: 16,
    paddingVertical: 12,
  },
  doneButtonText: {
    color: Theme.lightTextColor,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

// export default CreditNavigator;
