import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

import { BACKGROUND_COLOR, TEXT_COLOR, ITEMS_COLOR } from '../constants/colorsConstants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  topContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  drawerContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
  },
  flatList: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  drawerItemContainer: {
    margin: 5,
    padding: 5,
    paddingTop: 8.5,
    paddingBottom: 8.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3,
    borderRadius: 50,
    backgroundColor: BACKGROUND_COLOR,
    opacity: 0.8,
  },
  divideScreenVerticaly: {
    flexDirection: 'row',
    flex: 1,
  },
  cityName: {
    fontFamily: 'roboto-bold',
    fontSize: 22,
    lineHeight: 24,
    height: 24,
    color: TEXT_COLOR,
    alignSelf: 'center',
  },
  iconWrapper: {
    borderColor: BACKGROUND_COLOR,
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: BACKGROUND_COLOR,
  },
  selectMonth: {
    width: 25,
    height: 25,
    tintColor: BACKGROUND_COLOR,
  },
  leftSide: {
    justifyContent: 'center',
    width: width / 3,
  },
  rightSide: {
    justifyContent: 'space-around',
  },
  year: {
    fontFamily: 'roboto-regular',
    fontSize: 21,
    color: TEXT_COLOR,
  },
  month: {
    fontFamily: 'roboto-regular',
    fontSize: 25,
    color: TEXT_COLOR,
  },
  infoItemElem: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  infoItemText: {
    fontFamily: 'roboto-regular',
    fontSize: 15,
    height: 18,
    color: TEXT_COLOR,
  },
  yearItem: {
    fontFamily: 'roboto-regular',
    fontSize: 20,
    color: ITEMS_COLOR,
  },
  drawerItemYear: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: ITEMS_COLOR,
  },
  drawerItemMonth: {
    fontFamily: 'roboto-regular',
    fontSize: 18,
    color: ITEMS_COLOR,
  },
  infoItemRight: {
    height: '100%',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  offsetleftFirstLine: {
    marginLeft: 50,
  },
  offsetleftSecondLine: {
    marginLeft: 80,
  },
});
