import { AppLoading, Asset, Font } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Sounds from './assets/Sounds';
import HomeNavigator from './navigators/HomeNavigator';
import Store from './store/Store';

export default class App extends Component {
  state = {
    isReady: false,
  };

  render() {
    return !this.state.isReady ? (
      <AppLoading
        startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={error => {
          console.warn(error);
        }}
      />
    ) : (
      <Provider store={Store}>
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <HomeNavigator style={styles.container} />
        </React.Fragment>
      </Provider>
    );
  }

  _cacheResourcesAsync = async () => {
    await Promise.all([
      Asset.fromModule(require('react-navigation/src/views/assets/back-icon.png')).downloadAsync(),
      Font.loadAsync({
        athena: require('./assets/athena-of-the-ocean.ttf'),
        'chasing-hearts': require('./assets/chasing-hearts.ttf'),
      }),
      Sounds.loadAsync(),
    ]);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
