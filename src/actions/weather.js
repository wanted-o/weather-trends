/** Get Weather */
export const GET_WEATHER_ATTEMPT = 'GET_WEATHER_ATTEMPT';
export const getWeatherAttempt = () => ({ type: GET_WEATHER_ATTEMPT });

export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
export const getWeatherSuccess = data => ({ type: GET_WEATHER_SUCCESS, data });

export const GET_WEATHER_FAILURE = 'GET_WEATHER_FAILURE';
export const getWeatherFailure = msg => ({ type: GET_WEATHER_FAILURE, msg });
