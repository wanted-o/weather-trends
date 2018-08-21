import { GET_WEATHER_ATTEMPT, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from '../actions/weather';

const initialState = {
  weather: [],
  availableYears: [],
  cityName: '',
  isLoadingWeather: false,
  msgWeather: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_WEATHER_ATTEMPT:
      return {
        ...state,
        isLoadingWeather: true,
        msgWeather: '',
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.data.parsedArrayOfWeather,
        cityName: action.data.cityName,
        availableYears: action.data.availableYears,
        isLoadingWeather: false,
        msgWeather: '',
      };
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        isLoadingWeather: false,
        msgWeather: action.msg,
      };
    default:
      return state;
  }
};
