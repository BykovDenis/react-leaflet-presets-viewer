/**
 * Created by Denis on 14.03.2017.
 */
import CustomDate from './custom-date';
import ParseURL from './parseURL';

class BaseLayerParams {

  constructor(params) {
    this.params = params;
    this.baseLayer = 'satellite';
    this.filterLayer = 'naturalColor';
    this.paramMap = 'lnkTheBest';
    // Определяем параметры, которые будем анализировать в адресной строке
    this.uriParams = ['basemap', 'actual', 'layer', 'lat', 'lon', 'zoom', 'where'];
    this.url = this.initialMechanicalURI();
    if (this.url) {
      this.setDefaultGetParams();
      this.updateURIparams();
    }
  }

  /**
   * Установка механизма работы с адресной строкой
   * @returns {ParseURL}
   */
  initialMechanicalURI() {
    // Определяем текущий слой проверяем адресную строку
    const url = new ParseURL(document.location);
    url.setUriSearch = this.uriParams;
    return url;
  }

  /**
   * Обновление значение URI параметров URL
   */
  updateURIparams() {
    const uri = {
      basemap: this.baseLayer,
      layer: this.filterLayer,
      actual: this.paramMap,
      zoom: this.params.zoom,
      lat: parseFloat(this.params.lat, 10).toFixed(4),
      lon: parseFloat(this.params.lon, 10).toFixed(4),
    };
    if (this.params.where) {
      uri.where = this.params.where;
    }
    this.url.setURIParamsNotReloadPage(uri);
  }

  /**
   *  Установка по умолчанию или на основании get параметров
   * @param url
   */
  setDefaultGetParams() {
    const url = new ParseURL(document.location);
    // Базовая подложка
    this.baseLayer = url.getData('basemap') ? url.getData('basemap') : this.baseLayer;
    // Zoom
    this.params.zoom = parseInt(url.getData('zoom'), 10) >= 3 && parseInt(url.getData('zoom'), 10) <= 18 ? url.getData('zoom') : this.params.zoom;
    // Широта latitude
    this.params.lat = parseFloat(url.getData('lat'), 10) ? parseFloat(url.getData('lat'), 10).toFixed(4) : this.params.lat;
    // Широта latitude
    this.params.lon = parseFloat(url.getData('lon'), 10) ? parseFloat(url.getData('lon'), 10).toFixed(4) : this.params.lon;
    // устанавливаем слой фильтр
    this.filterLayer = url.getData('layer') || this.filterLayer;
    // устанавливаем параметр интервала
    this.paramMap = url.getData('actual') ? url.getData('actual') : this.paramMap;
    if (url.getData('where')) {
      this.params.where = url.getData('where');
    }
  }

  /**
   * Инициализация слоя карты начальными значениями
   * @returns {*}
   */
  getBaseMap(showAppId = true) {
    const processDate = new CustomDate();
    if (!processDate) {
      return false;
    }

    const appid = showAppId ? '9de243494c0b295cca9337e1e96b00e2' : '{APIKEY}';
    const httpProtocol = document.location.protocol;
    const baseURL = `${httpProtocol}//{s}.sat.owm.io/sql/{z}/{x}/{y}?appid=${appid}`;

    /* Базовые URL-ы тайлов */
    this.tileURL = {
      naturalColor: `${baseURL}&select=b4,b3,b2&from=s2&color=log(1.2)`,  // Natural Color    4 3 2
      clear: `${baseURL}&select=b4,b3,b2&from=s2&color=log(1.2)`,  // Natural Color    4 3 2
      labelsMap: `${httpProtocol}//{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png`, // cлой маркеров
      ndvi: `${baseURL}&select=b8,b4&from=s2&op=ndvi`,
      ndwi: `${baseURL}&select=b2,b12&from=s2&color=1%3A0b0badff%3B0.5%3A8383d3ff%3B0%3Af4f4f8ff%3B-0.3%3Adfc8aaff%3B-1%3Abd9d72ff&op=ndvi`,
      l753: `${baseURL}&select=b7,b5,b3&from=s2&color=log(1.2)`, // Natural With Atmospheric Removal    7 5 3 (false color)
      l543: `${baseURL}&select=b8,b3,b2&from=s2&color=log(1.2)`,  // Color Infrared (vegetation)    5 4 3
    };

    this.tileParam = {
      // Лучшие снимки
      lnkTheBest: {
        name: 'lnkTheBest',
        description: 'best',
        param: `&order=best${this.params.where ? `&where=${this.params.where}` : ''}`,
      },
      // Последние за 100 дней
      lnkLast: {
        name: 'lnkLast',
        description: 'last',
        param: `&order=last${this.params.where ? `&where=${this.params.where}` : ''}`,
      },
      // Последние за 14 дней
      lnkTwoWeeks: {
        name: 'lnkActual14',
        description: 'best,oldest14',
        param: `&order=best&date>${processDate.getDateBeforeDay(14)}`,
        paramTemplate: `&order=best&date>${processDate.getDateBeforeDay(14)}`,
      },
      // Последние за 100 дней
      lnkActual100: {
        name: 'lnkActual100',
        description: 'best,oldest100',
        param: `&order=best&date>${processDate.getDateBeforeDay(100) || ''}`,
        paramTemplate: `&order=best&date>${processDate.getDateBeforeDay(100) || ''}`,
      },
      // Параметризованная отрисовка лучших снимков по параметрам даты и облачности
      lnkTheBestWithParams: {
        name: 'lnkTheBestWithParams',
        description: 'best',
        param: `&order=best&${this.params.where ? `&where=${this.params.where}` : ''}&clouds<${1}`,
      },
      lnkCurrentSummer: {
        name: 'lnkCurrentSummer',
        description: 'best',
        param: `&order=best&where=${this.params.where ?
          this.params.where :
          `${processDate.getCurrentSummerDate()[0]},${processDate.getCurrentSummerDate()[1]}`}`,
      },
      lnkCurrentSpring: {
        name: 'lnkCurrentSummer',
        description: 'best',
        param: `&order=best&where=between(${processDate.getCurrentSpringDate()[0]},${processDate.getCurrentSpringDate()[1]})`,
      },
      lnkLastSummer: {
        name: 'lnkLastSummer',
        description: 'best',
        param: `&order=best&where=between(${processDate.getLastSummerDate()[0]},${processDate.getLastSummerDate()[1]})`,
      },
    };

    const baseMap = [];
    baseMap.push(`${document.location.protocol}//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`);
    if (this.baseLayer === 'vector') {
      return baseMap;
    }
    baseMap.push(`${this.tileURL[this.filterLayer]}${this.tileParam[this.paramMap].param}`);
    if (this.baseLayer === 'satellite') {
      return baseMap;
    }
    baseMap.push(`${document.location.protocol}//{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png`);

    return baseMap;
  }

  updateParamsURI(store) {
    const url = new ParseURL(document.location);
    url.setUriSearch = this.uriParams;
    url.setURIParamsNotReloadPage(store);
  }
}

export default BaseLayerParams;
