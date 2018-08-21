import { all } from 'redux-saga/effects';
import errors from './errors';
import weather from './weather';

export default function* sagas() {
  yield all([
    errors(),
    weather(),
  ]);
}
