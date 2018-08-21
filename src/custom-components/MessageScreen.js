import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { LINES, BACKGROUND_COLOR } from '../constants/colorsConstants';
import styles from '../styles/MessageScreen';

const MessageScreen = ({ text, textColor }) => (
  <View
    style={[styles.container, { backgroundColor: textColor === LINES && BACKGROUND_COLOR }]}
  >
    <Text
      style={[styles.text, { color: textColor }]}
    >
      {text}
    </Text>
  </View>
);

export default MessageScreen;

MessageScreen.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

MessageScreen.defaultProps = {
  textColor: LINES,
};
