import React from 'react';
import { StackNavigator } from 'react-navigation';

import QuizIntroScreen from '../screens/QuizIntroScreen';
import QuizQuestionScreen from '../screens/QuizQuestionScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import Theme from '../styles/Theme';

export default class QuizNavigatorContainer extends React.Component {
  render() {
    return <QuizNavigator screenProps={{ parentNavigation: this.props.navigation }} />;
  }
}

const QuizNavigator = StackNavigator(
  {
    QuizIntro: {
      screen: QuizIntroScreen,
    },
    QuizQuestion: {
      path: 'question/:index',
      screen: QuizQuestionScreen,
    },
    QuizResult: {
      path: 'result',
      screen: QuizResultScreen,
      navigationOptions: {
        headerLeft: null,
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'QuizIntro',
    navigationOptions: {
      headerStyle: { backgroundColor: Theme.primaryColor },
      headerTintColor: Theme.lightTextColor,
    },
  }
);
