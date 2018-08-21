import { put, call, takeLatest } from 'redux-saga/effects';

import { getWeatherSuccess, GET_WEATHER_ATTEMPT } from '../actions/weather';
import { isError } from '../actions/errors';
import { parseWeatherFromTxt } from '../helpers/parseWeather';

import { noInternetConnection } from '../constants/textConstants';
import { getWeather } from '../requests/api';

function* getWeatherSaga() {
  try {
    const data = yield call(getWeather);
    if (data && data !== 'File not found."') {
      const {
        cityName,
        parsedArrayOfWeather,
        availableYears,
      } = yield parseWeatherFromTxt(data);
      yield put(getWeatherSuccess({ parsedArrayOfWeather, cityName, availableYears }));
    } else {
      yield put(isError(data, 'weather'));
    }
  } catch (error) {
    yield put(isError(noInternetConnection, 'weather'));
  }
}

export default function* mySagas() {
  yield takeLatest(GET_WEATHER_ATTEMPT, getWeatherSaga);
}
