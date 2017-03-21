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
    this.uriParams = ['basemap', 'actual', 'layer', 'lat', 'lon', 'zoom'];
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
    this.url.setURIParamsNotReloadPage({
      basemap: this.baseLayer,
      layer: this.filterLayer,
      actual: this.paramMap,
      zoom: this.params.zoom,
      lat: parseFloat(this.params.lat).toFixed(4),
      lon: parseFloat(this.params.lon).toFixed(4)
    });
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
    this.params.lat = parseFloat(url.getData('lat'), 10) ? parseFloat(url.getData('lat'), 10).toFixed(2) : this.params.lat;
    // Широта latitude
    this.params.lon = parseFloat(url.getData('lon'), 10) ? parseFloat(url.getData('lon'), 10).toFixed(2) : this.params.lon;
    // устанавливаем слой фильтр
    this.filterLayer = url.getData('layer') || this.filterLayer;
    // устанавливаем параметр интервала
    this.paramMap = url.getData('actual') ? url.getData('actual') : this.paramMap;
  }

  /**
   * Инициализация слоя карты начальными значениями
   * @returns {*}
   */
  getBaseMap() {
    const processDate = new CustomDate();
    if (!processDate) {
      return false;
    }
    const ms = processDate.formatDate(new Date(new Date() - (15 * 1000 * 60 * 60 * 24)));
    const dateFrom = processDate.convertDateToNumberDay(ms);
    const dateTo = processDate.convertDateToNumberDay(processDate.formatDate(new Date()));

    const appid = '9de243494c0b295cca9337e1e96b00e2';
    const httpProtocol = document.location.protocol;
    const baseURL = `${httpProtocol}//{s}.sat.owm.io/sql/{z}/{x}/{y}?appid=${appid}`;

    /* Базовые URL-ы тайлов */
    this.tileURL = {
      naturalColor: `${baseURL}&select=b4,b3,b2&color=log(1.2)&brightness%3E6000,brightness%3C4000`,  // Natural Color    4 3 2
      clear: `${baseURL}&select=b4,b3,b2&color=log(1.2)&brightness%3E6000,brightness%3C4000`,  // Natural Color    4 3 2
      labelsMap: `${httpProtocol}//{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png`, // cлой маркеров
      ndvi: `${baseURL}&select=b8,b4&from=s2&op=ndvi`,
      ndwi: `${baseURL}&select=b2,b12&from=s2&color=1%3A0b0badff%3B0.5%3A8383d3ff%3B0%3Af4f4f8ff%3B-0.3%3Adfc8aaff%3B-1%3Abd9d72ff&op=ndvi`,
      l753: `${baseURL}&select=b7,b5,b3&color=log(1.2)&brightness>6000,brightness<4000`, // Natural With Atmospheric Removal    7 5 3 (false color)
      l543: `${baseURL}&select=b8,b3,b2&from=s2&color=log(1.2)&brightness%3E6000,brightness%3C4000`,  // Color Infrared (vegetation)    5 4 3
    };

    this.tileParam = {
      // Лучшие снимки
      lnkTheBest: {
        name: 'lnkTheBest',
        description: 'best',
        param: '&order=best',
      },
      // Последние за 100 дней
      lnkLast: {
        name: 'lnkLast',
        description: 'last',
        param: '&order=last',
      },
      // Последние за 14 дней
      lnkTwoWeeks: {
        name: 'lnkActual14',
        description: 'best,oldest14',
        param: `&order=best&date>${processDate.getDateBeforeDay(14)}`,
      },
      // Последние за 100 дней
      lnkActual100: {
        name: 'lnkActual100',
        description: 'best,oldest100',
        param: `&order=best&date>${processDate.getDateBeforeDay(100) || ''}`,
      },
      // Параметризованная отрисовка лучших снимков по параметрам даты и облачности
      lnkTheBestWithParams: {
        name: 'lnkTheBestWithParams',
        description: 'best',
        param: `&order=best&where=between(${dateFrom}:${dateTo})&clouds<${1}`,
      },
      lnkCurrentSummer: {
        name: 'lnkCurrentSummer',
        description: 'best',
        param: `&order=best&where=between(${processDate.getCurrentSummerDate()[0] || ''},${processDate.getCurrentSummerDate()[1] || ''})`,
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
