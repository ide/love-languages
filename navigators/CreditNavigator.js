import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HeaderRightButton from '../components/HeaderRightButton';
import CreditScreen from '../screens/CreditScreen';
import Theme from '../styles/Theme';

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
          <HeaderRightButton
            onPress={() => screenProps.parentNavigation.goBack()}
            textStyle={styles.doneButtonText}>
            Done
          </HeaderRightButton>
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
  doneButtonText: {
    fontWeight: 'bold',
  },
});
