import React from 'react';
import { createStackNavigator } from 'react-navigation';

import QuizIntroScreen from '../screens/QuizIntroScreen';
import QuizQuestionScreen from '../screens/QuizQuestionScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import Theme from '../styles/Theme';

// export default class QuizNavigatorContainer extends React.Component {
//   render() {
//     return <QuizNavigator navigation={this.props.navigation} screenProps={{ parentNavigation: this.props.navigation }} />;
//   }
// }

const QuizNavigator = createStackNavigator(
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
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: Theme.primaryColor },
      headerTintColor: Theme.lightTextColor,
    },
  }
);

export default QuizNavigator;
