import { SERVER_URL } from '../constants/apiConstants';
import { sendRequest } from '../helpers/apiRequests';

export const getWeather = async () =>
  sendRequest(`${SERVER_URL}/bradforddata.txt`).then(response => response);

export default getWeather;

