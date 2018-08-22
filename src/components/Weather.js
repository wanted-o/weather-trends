import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import Drawer from 'react-native-drawer';
import isEqual from 'lodash/isEqual';

import DrawerMonth from './DrawerMonth';
import DrawerYear from './DrawerYear';
import WeatherItem from './WeatherItem';
import { activityResult } from '../helpers/activityResult';

import { getWeatherAttempt } from '../actions/weather';

import { tMax, tMin, temp, weatherTitle, frostDays, rainDays, sunDays } from '../constants/textConstants';

import Rain from '../images/rain.gif';
import Winter from '../images/winter.gif';
import Autumn from '../images/autumn.gif';
import Summer from '../images/summer.gif';
import Spring from '../images/spring.gif';
import SelectMonth from '../images/selectMonth.png';
import AirFrostIcon from '../images/airFrost.png';
import RainIcon from '../images/rainIcon.png';
import TempIcon from '../images/temp.png';
import SunDays from '../images/sunDays.png';

import headerStyles from '../styles/AppNavigator';
import styles from '../styles/Weather';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

class Weather extends Component {
  static navigationOptions = {
    title: weatherTitle.toUpperCase(),
    headerTitleStyle: headerStyles.headerTitleStyle,
    headerStyle: headerStyles.headerStyle,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      selectedYearData: [],
      selectedMonth: null,
    };
    this.drawer = null;
    this.drawerRef = (node) => {
      this.drawer = node;
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getWeatherAttempt());
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;
    const stateChange = (
      !isEqual(nextState.selectedYear, state.selectedYear) ||
      !isEqual(nextState.selectedYearData, state.selectedYearData) ||
      !isEqual(nextState.selectedMonth, state.selectedMonth)
    );

    const propsChange = (
      !isEqual(nextProps.weather, props.weather) ||
      !isEqual(nextProps.cityName, props.cityName) ||
      !isEqual(nextProps.availableYears, props.availableYears) ||
      !isEqual(nextProps.isLoadingWeather, props.isLoadingWeather) ||
      !isEqual(nextProps.msgWeather, props.msgWeather)
    );
    return stateChange || propsChange;
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.availableYears && nextProps.availableYears.length > 0) {
      return {
        ...prevState,
        selectedYear: nextProps.availableYears[0],
        selectedYearData: nextProps.weather.get(nextProps.availableYears[0]),
        selectedMonth: nextProps.weather.get(nextProps.availableYears[0])[0],
      };
    }
    return prevState;
  }

  toogleDrawer = () => {
    if (!this.drawer) return;
    if (this.drawer._open) this.drawer.close();
    else this.drawer.open();
  }

  selectMonth = (selectedMonth) => {
    this.setState({ selectedMonth });
  }

  selectYear = (year) => {
    const { weather } = this.props;
    this.setState({ selectedYearData: weather.get(year) });
    this.setState({ selectedYear: year });
    this.selectMonth(weather.get(year)[0]);
    this.toogleDrawer();
  }

  defineBackgroundImage = (mm) => {
    switch (mm) {
      case '1':
      case '2':
      case '12':
        return Winter;
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
        return Summer;
      case '9':
      case '10':
      case '11':
        return Rain;
      default:
        return Rain;
    }
  }

  keyExtractor = item => `${item} ${item.tmax && item.tmax}`;

  render() {
    const {
      cityName,
      availableYears,
      isLoadingWeather,
      msgWeather,
    } = this.props;
    const { selectedYearData, selectedMonth, selectedYear } = this.state;
    const month = selectedMonth && monthNames[JSON.parse(selectedMonth.mm) - 1];
    const backgroundImage = selectedMonth && this.defineBackgroundImage(selectedMonth.mm);
    return [
      selectedMonth !== null && availableYears !== null &&
      <Drawer
        key="WeatherContent"
        ref={this.drawerRef}
        type="overlay"
        content={
          <View style={styles.drawerContainer}>
            <FlatList
              contentContainerStyle={styles.flatList}
              keyExtractor={this.keyExtractor}
              data={availableYears}
              extraData={selectedYear}
              renderItem={data => (
                <DrawerYear
                  year={data.item}
                  selectYear={this.selectYear}
                  selectedYear={selectedYear}
                />
              )}
            />
            <FlatList
              contentContainerStyle={styles.flatList}
              data={selectedYearData}
              keyExtractor={this.keyExtractor}
              extraData={selectedMonth || selectedYear}
              renderItem={data => (
                <DrawerMonth
                  data={data.item}
                  monthNames={monthNames}
                  selectedMonth={selectedMonth}
                  selectMonth={this.selectMonth}
                  toogleDrawer={this.toogleDrawer}
                />
              )}
            />
          </View>
        }
        tapToClose
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <ImageBackground source={backgroundImage} style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.cityName}>{cityName}</Text>
            <TouchableOpacity
              onPress={() => this.toogleDrawer()}
            >
              <Image source={SelectMonth} style={styles.selectMonth} />
            </TouchableOpacity>
          </View>
          <View style={styles.divideScreenVerticaly}>
            <View style={styles.leftSide}>
              <Text style={styles.year}>{selectedMonth.yyyy}</Text>
              <Text style={styles.month}>{month}</Text>
            </View>
            <View style={styles.rightSide}>
              {WeatherItem(TempIcon, `${tMax} ${temp}`, selectedMonth.tmax)}
              {WeatherItem(TempIcon, `${tMin} ${temp}`, selectedMonth.tmin, styles.offsetleftFirstLine)}
              {WeatherItem(
                AirFrostIcon,
                frostDays,
                selectedMonth.af,
                styles.offsetleftSecondLine,
              )}
              {WeatherItem(RainIcon, rainDays, selectedMonth.rain !== '---' ? selectedMonth.rain : 0, styles.offsetleftFirstLine)}
              {WeatherItem(SunDays, sunDays, selectedMonth.sun)}
            </View>
          </View>
        </ImageBackground>
      </Drawer>,
      activityResult(isLoadingWeather, msgWeather !== '', msgWeather),
    ];
  }
}

Weather.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoadingWeather: PropTypes.bool,
  cityName: PropTypes.string,
  availableYears: PropTypes.arrayOf(PropTypes.string),
  msgWeather: PropTypes.string,
  weather: PropTypes.arrayOf(PropTypes.object),
};

Weather.defaultProps = {
  isLoadingWeather: false,
  cityName: '',
  msgWeather: '',
  availableYears: [],
  weather: [],
};

const mapStateToProps = ({
  weatherReducer: {
    weather,
    cityName,
    availableYears,
    isLoadingWeather,
    msgWeather,
  },
}) => ({
  weather,
  cityName,
  availableYears,
  isLoadingWeather,
  msgWeather,
});

export default connect(mapStateToProps)(Weather);
