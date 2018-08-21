import { StyleSheet, Dimensions, Platform } from 'react-native';
import { TEXT_COLOR } from '../constants/colorsConstants';

export const { width } = Dimensions.get('window');
export const alertBarHeight = 20;
export const offsetIos = alertBarHeight;
export const offsetAlterTop = Platform.OS === 'ios' ? offsetIos : offsetIos + 23;

export default StyleSheet.create({
  statusView: {
    position: 'absolute',
    zIndex: 100,
    top: -alertBarHeight,
    opacity: 0.9,
    height: alertBarHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
});
