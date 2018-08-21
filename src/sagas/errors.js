import { put, takeLatest } from 'redux-saga/effects';

import { IS_ERROR, showAlert } from '../actions/errors';
import { undefinedError } from '../constants/textConstants';
import { getWeatherFailure } from '../actions/weather';

function* errorsSaga(props) {
  try {
    switch (props.screen) {
      case 'weather':
        yield put(getWeatherFailure(props.msg)); break;
      default:
        break;
    }
    yield put(showAlert(props.msg));
  } catch (error) {
    yield put(showAlert(undefinedError));
  }
}

export default function* mySagas() {
  yield takeLatest(IS_ERROR, errorsSaga);
}
