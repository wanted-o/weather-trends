import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import mainStyles from '../styles/MainStyles';

export default () => (
  <View style={mainStyles.activitiIndicatorContainer}>
    <ActivityIndicator animating />
  </View>
);
