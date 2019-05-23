import { createStackNavigator } from 'react-navigation';

import CreditNavigator from './CreditNavigator';
import QuizNavigator from './QuizNavigator';
import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Credits: {
      path: 'credits',
      screen: CreditNavigator,
    },
    Quiz: {
      path: 'quiz',
      screen: QuizNavigator,
    },
  },
  {
    initialRouteName: 'Quiz',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

// Override the INIT action so that we can display the home screen above the quiz screen
const defaultGetStateForAction = HomeNavigator.router.getStateForAction;
HomeNavigator.router.getStateForAction = (action, state) => {
  let defaultState = defaultGetStateForAction(action, state);

  if (action.type === 'Navigation/INIT') {
    defaultState.routes.push({
      key: 'Init-home',
      routeName: 'Home',
    });
    defaultState.index = defaultState.routes.length - 1;
  }

  return defaultState;
};

export default HomeNavigator;
