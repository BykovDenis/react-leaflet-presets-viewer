/**
 * Created by bykovdenis on 12.03.17.
 */
// Данные о природных явлениях
import naturalPhenomenon from '../../api/natural-phenomenon-data';
// Данные о ветре
import windSpeed from '../../api/wind-speed-data';
// Данные о направлении ветра
import windDirection from '../../api/wind-direction-data';
import PrepareWeatherData from '../../mechanics/PrepareWeatherData';
import FETCH_WEATHER_DATA_SUCCESS from '../constants/page';

const mockAPIdata = {
  fromAPI: {
    coord: {
      lon: '0',
      lat: '0'
    },
    weather: [{
      id: ' ',
      main: ' ',
      description: ' ',
      icon: ''
    }],
    base: ' ',
    main: {
      temp: 0,
      pressure: ' ',
      humidity: ' ',
      temp_min: ' ',
      temp_max: ' '
    },
    wind: {
      speed: 0,
      deg: ' '
    },
    rain: {},
    clouds: { all: ' ' },
    dt: '',
    sys: {
      type: ' ',
      id: ' ',
      message: ' ',
      country: ' ',
      sunrise: ' ',
      sunset: ' '
    },
    id: ' ',
    name: 'Undefined',
    cod: ' '
  },
  naturalPhenomenon: naturalPhenomenon.en,
  windSpeed: windSpeed.en,
  windDirection: windDirection.en,
};

let weatherMetadata = {
  cityName: 'Moscow',
  country: 'RU',
  temperature: 4,
  temperatureMin: 4,
  temperatureMax: 5,
  windSpeed: 'Wind: 6.0 m/s Moderate breeze',
  windSpeed2: '6.0 m/s',
  windDirection: 'Southwest',
  clouds: '10',
  humidity: '64 %',
  pressure: '1013 mb',
  icon: '04d',
  naturalPhenomenon: 'clear',
  dateReport: '20:16 Mar 28'
};

function getHTTP() {
  const url = 'http://openweathermap.org/data/2.5/weather?id=524901&units=metric&appid=b1b15e88fa797225412429c1c50c122a1';
  fetch(url)
    .then(response => response.json())
    .then((weather) => {
      mockAPIdata.fromAPI = weather;
      const parseData = new PrepareWeatherData();
      parseData.weafterData = mockAPIdata;
      weatherMetadata = parseData.mappingWeatherData();
    });
}

const getDataWeather = () => (dispatch) => {
  console.log('response');
  getHTTP();
  dispatch({
    type: FETCH_WEATHER_DATA_SUCCESS,
    payload: weatherMetadata
  });
  setInterval(() => {
    getHTTP();
    dispatch({
      type: FETCH_WEATHER_DATA_SUCCESS,
      payload: weatherMetadata
    });
  }, 3000);
};

export default getDataWeather;
