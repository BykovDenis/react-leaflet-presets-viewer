/**
 * Created by bykovdenis on 12.03.17.
 */
import FETCH_WEATHER_DATA_SUCCESS from '../constants/page';

// Инициализируем объект пустыми значениями
const initialState = {
  cityName: 'Moscow',
  country: 'RU',
  temperature: 6,
  temperatureMin: 4,
  temperatureMax: 5,
  windSpeed: 'Wind: 6.0 m/s Moderate breeze',
  windSpeed2: '6.0 m/s',
  windDirection: 'Southwest',
  clouds: '0',
  humidity: '64 %',
  pressure: '1013 mb',
  icon: '04d',
  naturalPhenomenon: 'clear',
  dateReport: '20:16 Mar 28'
};

export default function Weather(state = initialState, action) {
  if (action.type === FETCH_WEATHER_DATA_SUCCESS) {
    return action.payload;
  }
  return state;
}
