import CustomDate from '../libs/custom-date';

export default class PrepareWeatherData {
  constructor() {
    this.weather = {};
    this.lang = 'en';
  }
  /**
   * Формирование запроса к серверу для получения данных погоды
   */
  responseWeatherData(context, callback) {
    /* выключаю на время отсутствия интернета */
    /* const url = 'http://api.openweathermap.org/data/2.5/weather?id=524901&units=metric&appid=2d90837ddbaeda36ab487f257829b667';
     this.httpGet(url, context, callback); */
    /* локальная переменная с данными для ренеринга */
    this.prepareData(this.weatherData, context, callback);
  }
  /**
   * Получение данных от сервера с данными о погоде
   * @param data
   * @returns {*}
   */
  prepareData(data, context, callback) {
    this.weafterData = data;
    return callback(context, data);
  }
  /**
   * сеттер для инициализации данных о погоде
   * @param value
   */
  set weafterData(value) {
    this.weather = value;
  }
  /**
   * геттер для получения данных о погоде
   * @returns {*|{}}
   */
  get weatherData() {
    return this.weather;
  }
  /**
   * Метод возвращает родительский селектор по значению дочернего узла в JSON
   * @param {object} JSON
   * @param {variant} element Значение элементарного типа, дочернего узла для поиска родительского
   * @param {string} elementName Наименование искомого селектора,для поиска родительского селектора
   * @return {string} Наименование искомого селектора
   */
  getParentSelectorFromObject(object, element, elementName, elementName2) {
    Object.assign(object).forEach((elem, key) => {
      // Если сравнение производится с объектом из двух элементов ввиде интервала
      if (typeof elem[elementName] === 'object' && !elementName2) {
        if (element >= elem[elementName][0] && element < elem[elementName][1]) {
          return key;
        }
        // сравнение производится со значением элементарного типа с двумя элементами в JSON
      } else if (elementName2) {
        if (element >= elem[elementName] && element < elem[elementName2]) {
          return key;
        }
      }
      return 0;
    });
  }
  /**
   * парсинг данных погоды
   */
  mappingWeatherData() {
    const date = new CustomDate();
    return {
      cityName: this.weather.fromAPI.name,
      country: this.weather.fromAPI.sys.country,
      temperature: parseInt(this.weather.fromAPI.main.temp.toFixed(0), 10) + 0,
      temperatureMin: parseInt(this.weather.fromAPI.main.temp_min.toFixed(0), 10) + 0,
      temperatureMax: parseInt(this.weather.fromAPI.main.temp_max.toFixed(0), 10) + 0,
      weather: this.weather.naturalPhenomenon[this.weather.fromAPI.weather[0].id],
      windSpeed: `Wind: ${this.weather.fromAPI.wind.speed.toFixed(1)} m/s ${this.getParentSelectorFromObject(this.weather.windSpeed, this.weather.fromAPI.wind.speed.toFixed(1), 'speed_interval')}`,
      windSpeed2: `${this.weather.fromAPI.wind.speed.toFixed(1)} m/s`,
      windDirection: `${this.getParentSelectorFromObject(this.weather.windDirection, this.weather.fromAPI.wind.deg, 'deg_interval')}`,
      clouds: `${this.getParentSelectorFromObject(this.weather.clouds, this.weather.fromAPI.clouds.all, 'min', 'max')}`,
      humidity: `${this.weather.fromAPI.main.humidity} %`,
      pressure: `${this.weather.fromAPI.main.pressure} mb`,
      icon: `${this.weather.fromAPI.weather[0].icon}`,
      naturalPhenomenon: `${this.weather.naturalPhenomenon.description[this.weather.fromAPI.weather[0].id]}`,
      dateReport: date.getTimeDateHHMMMonthDay()
    };
  }
}
/**
 * Created by bykovdenis on 12.03.17.
 */
