import parserURI from 'uri-parse-lib';

/**
 * Created by Denis on 13.01.2017.
 */
export default class ParseURL {
  /**
   * constructor
   * object document.location
   */
  constructor(location) {
    this.location = location;
    this.parseURL = parserURI(location.href);
  }

  /**
   * Определяем параметры location.search с которыми быдем работать
   * @param params
   */
  set setUriSearch(params) {
    // Задаем массив возможножных значений в URI адресной строки
    this.uriParams = params;
  }

  /**
   * Обрабатываем URI, URL строки
   * @param uri
   * @returns {*}
   */
  getArrayURI() {
    return this.parseURL.query ? this.parseURL.query : [];
  }

  /**
   * Получаем массив строк ключ=значение
   * @param uri
   * @returns {*}
   */
  getData(key) {
    const url = this.getArrayURI();
    return url[key] || false;
  }

  /**
   * Сравнение запрошенных данных с данными URL
   * @param key
   * @param value
   */
  compareData(key, value) {
    const url = this.getArrayURI();
    return (url[key] === value);
  }

  /**
   * Обновляем/добавляем URI параметр в URL
   * @param key
   * @param value
   */
  setURIParams(data) {
    const url = this.getArrayURI();
    let search = '';
    // берем данные из массива и формируем строку
    if (this.uriParams.length) {
      this.uriParams.forEach((elem) => {
        if (!url[elem] && data[elem]) {
          search += `&${elem}=${data[elem]}`;
        }
        if (url[elem] && !data[elem]) {
          search += `&${elem}=${url[elem]}`;
        }
        if (url[elem] && data[elem]) {
          search += `&${elem}=${data[elem]}`;
        }
      });
      if (search.substr(1) !== this.location.search.substr(1)) {
        this.location.search = search ? `?${search.substr(1)}` : '';
        console.log(search);
      }
    }
  }

  /**
   * Обновление параметров URL без перезагрузки страницы черз pushState
   * @param data
   */
  setURIParamsNotReloadPage(data) {
    const url = this.getArrayURI();
    let search = '';
    // берем данные из массива и формируем строку
    if (this.uriParams.length) {
      this.uriParams.forEach((elem) => {
        if (!url[elem] && data[elem]) {
          search += `&${elem}=${data[elem]}`;
        }
        if (url[elem] && !data[elem]) {
          search += `&${elem}=${url[elem]}`;
        }
        if (url[elem] && data[elem]) {
          search += `&${elem}=${data[elem]}`;
        }
      });
      if (search.substr(1) !== this.location.search.substr(1)) {
        history.pushState({ foo: 'bar' }, 'Title', `?${search.substr(1)}`);
      }
    }
  }

  removeURIParamNotReloadPage(remElem) {
    const url = this.getArrayURI();
    url.uri = '';
    Object.keys(url).forEach((elem) => {
      if (elem === 'uri') {
        return;
      }
      if (elem === remElem) {
        delete url[remElem];
      } else {
        url.uri += `&${elem}=${url[elem]}`;
        console.log(url.uri);
      }
    });
    console.log(url.uri);
    window.history.pushState({ foo: 'bar' }, 'Title', `?${url.uri.substr(1)}`);
  }

  setDefaultURI(locationSearch) {
    this.location.search = locationSearch;
  }

}
