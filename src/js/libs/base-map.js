/**
 * Created by Denis on 14.03.2017.
 */
import CustomDate from './custom-date';
import ParseURL from './parseURL';

class BaseLayerParams {

  constructor(params) {
    this.params = params;
    this.baseLayer = 'satellite';
    this.paramMap = '';
    this.filterLayer = 'naturalColor';
    // Определяем параметры, которые будем анализировать в адресной строке
    this.uriParams = ['basemap', 'layer', 'lat', 'lon', 'zoom', 'where', 'actual'];
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
      zoom: this.params.zoom,
      lat: parseFloat(this.params.lat, 10).toFixed(4),
      lon: parseFloat(this.params.lon, 10).toFixed(4),
    };
    if (this.paramMap) {
      uri.actual = this.paramMap;
    }
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
  }

  /**
   * Инициализация слоя карты начальными значениями
   * @returns {*}
   */
  getBaseMap(showAppId = true, urlPresets) {
    const processDate = new CustomDate();
    if (!processDate) {
      return false;
    }

    const appid = showAppId ? '9de243494c0b295cca9337e1e96b00e2' : '{APIKEY}';
    const httpProtocol = document.location.protocol;
    this.tileURL =
      httpProtocol +
      urlPresets[this.filterLayer].url +
      '?appid=' + appid +
      urlPresets[this.filterLayer].urlParams;

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
          `${processDate.getCurrentSummerDate()[0] || ''},${processDate.getCurrentSummerDate()[1] || ''}`}`
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
    if (!(/where/).test(urlPresets[this.filterLayer].urlParams)) {
      this.paramMap = 'lnkTheBest';
      this.setDefaultGetParams();
      this.updateURIparams();
      baseMap.push(`${this.tileURL}${this.tileParam[this.paramMap].param}`);
    } else {
      this.url.removeURIParamNotReloadPage('actual');
      baseMap.push(this.tileURL);
    }
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
