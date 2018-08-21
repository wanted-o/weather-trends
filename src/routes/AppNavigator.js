import React, { Component } from 'react';
import { DeviceEventEmitter, BackHandler, NetInfo, Animated, Text } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions, Header } from 'react-navigation';
import { connect } from 'react-redux';

import { AppNavigator } from './routes';
import { addListener } from '../utils/redux';
import { clearAlert } from '../actions/errors';

import { noInternetConnection } from '../constants/textConstants';

import styles, { width, offsetAlterTop } from '../styles/AppNavigator';

const timerOffset = 1600;

class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: '',
      errorMessagesCollor: 'red',
    };
    this.backPressSubscriptions = new Set();
    this.statusBarOpen = false;
    this.statusMessage = new Animated.Value(0);
  }

  componentDidMount = async () => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    DeviceEventEmitter.addListener('hardwareBackPress', this.backPressSubscribe);
    this.backPressSubscriptions.add(this.handleHardwareBack);
  }

  componentDidUpdate = () => {
    const { alertMsg } = this.props;
    if (alertMsg !== '' && this.statusBarOpen === false) this.showMessage(alertMsg);
  }


  componentWillUnmount = async () => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress');
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this.backPressSubscriptions.clear();
  }

  handleConnectivityChange = async (isConnected) => {
    if (this.state.isConnected === isConnected) return;
    this.setState({ isConnected });
    if (!isConnected) {
      this.isMessage({ code: 'net/no-internet-connection', message: noInternetConnection });
      setTimeout(this.pullUpMessage, timerOffset);
    }
  }

  backPressSubscribe = () => {
    let invokeDefault = true;
    const subscriptions = [];

    this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

    for (let i = 0; i < subscriptions.reverse().length; i += 1) {
      if (subscriptions[i]()) {
        invokeDefault = false;
        break;
      }
    }

    if (invokeDefault) {
      BackHandler.exitApp();
    }
  }

  isMessage = async ({ code, message, color = 'red' }) => {
    if (!code) return;
    this.setState({
      errorMessages: message,
      errorMessagesCollor: color,
    }, () => this.pullDownMessage());
  }

  showMessage = async (alertMessage) => {
    const {
      dispatch,
    } = this.props;
    this.isMessage({ code: 'alert', message: alertMessage });
    await dispatch(clearAlert());
    setTimeout(this.pullUpMessage, timerOffset);
  }

  pullDownMessage = () => {
    if (this.statusBarOpen) return;
    this.statusBarOpen = true;
    this.statusMessage.setValue(0);
    Animated.spring(
      this.statusMessage,
      {
        toValue: 1,
        bounciness: 0,
      },
    ).start();
  }

  pullUpMessage = () => {
    if (!this.statusBarOpen) return;
    this.statusBarOpen = false;
    this.statusMessage.setValue(1);
    Animated.spring(this.statusMessage, {
      toValue: 0,
      bounciness: 0,
    }).start();
  }

  handleHardwareBack = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const {
      dispatch,
      nav,
    } = this.props;
    const { errorMessagesCollor, errorMessages } = this.state;
    const menumMoveY = this.statusMessage.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Header.HEIGHT + offsetAlterTop],
    });
    return [
      <Animated.View
        key="alert"
        style={[styles.statusView,
          {
            backgroundColor: errorMessagesCollor,
            width,
            transform: [{ translateY: menumMoveY }],
          },
        ]}
      >
        <Text style={styles.statusText}> {errorMessages} </Text>
      </Animated.View>,
      <AppNavigator
        key="AppNavigator"
        screenProps={{}}
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />,
    ];
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  alertMsg: PropTypes.string,
};

AppWithNavigationState.defaultProps = {
  alertMsg: '',
};

const mapStateToProps = ({
  nav,
  errorsReducer: { alertMsg },
}) => ({
  nav,
  alertMsg,
});

export default connect(mapStateToProps, null, null)(AppWithNavigationState);
