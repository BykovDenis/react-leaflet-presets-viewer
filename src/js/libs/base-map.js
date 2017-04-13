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
    this.uriParams = ['basemap', 'layer', 'lat', 'lon', 'zoom', 'where'];
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
      urlPresets[this.filterLayer].urlParams +
      '&appid=' + appid;

    const baseMap = [];
    baseMap.push(`${document.location.protocol}//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`);
    if (this.baseLayer === 'vector') {
      return baseMap;
    }
    baseMap.push(this.tileURL);
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
