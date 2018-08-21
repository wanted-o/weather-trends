import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR } from '../constants/colorsConstants';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  activitiIndicatorContainer: {
    position: 'absolute',
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
});
