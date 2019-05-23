import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HeaderRightButton from '../components/HeaderRightButton';
import CreditScreen from '../screens/CreditScreen';
import Theme from '../styles/Theme';

const CreditNavigator = createStackNavigator(
  {
    Credits: {
      screen: CreditScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <HeaderRightButton
            onPress={() => navigation.goBack(null)}
            textStyle={styles.doneButtonText}>
            Done
          </HeaderRightButton>
        ),
      }),
    },
  },
  {
    initialRouteName: 'Credits',
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: Theme.primaryColor },
      headerTintColor: Theme.lightTextColor,
    },
  }
);

export default CreditNavigator;

const styles = StyleSheet.create({
  doneButtonText: {
    fontWeight: 'bold',
  },
});

