import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import configureStore from './storeConfig';
import AppWithNavigationState from './src/routes/AppNavigator';

import RobotoBold from './src/font/Roboto/Roboto-Bold.ttf';
import RobotoRegular from './src/font/Roboto/Roboto-Regular.ttf';

console.ignoredYellowBox = ['Remote debugger'];
console.disableYellowBox = true;

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-bold': RobotoBold,
      'roboto-regular': RobotoRegular,
    })
      .then(() => this.setState({ loading: false }))
      .catch(err => console.log('er: ', err));
  }

  render() {
    return !this.state.loading ? (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    ) : (
      null
    );
  }
}

export default App;
