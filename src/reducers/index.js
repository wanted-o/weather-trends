import { combineReducers } from 'redux';
import nav from './nav';
import errorsReducer from './errors';
import weatherReducer from './weather';

const AppReducer = combineReducers({
  nav,
  errorsReducer,
  weatherReducer,
});
export default AppReducer;
