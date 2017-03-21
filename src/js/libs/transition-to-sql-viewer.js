/**
 * Created by Denis on 17.03.2017.
 */
import ParseURL from './parseURL';

/* Парсинг данных для инструмента sql-viewer */
export default class TransitionToSqlViewer {
  constructor(url) {
    this.uri = url.split('&');
    this.paramsSqlViewer = {};
    this.params = ['geo', 'lat', 'lon', 'zoom', 'where', 'color', 'select', 'op', 'from', 'order'];
  }
  parseParamURI() {
    const objParams = {};
    this.uri.forEach((element) => {
      const arr = element.split('=');
      if (arr.length > 1) {
        objParams[arr[0]] = arr[1];
      }
    });
    console.dir(objParams);
    this.params.forEach((element) => {
      if (objParams[element]) {
        this.paramsSqlViewer[element] = objParams[element];
      }
    });

    const parseURL = new ParseURL(document.location);
    const curURI = parseURL.getArrayURI();

    this.paramsSqlViewer.lat = curURI.lat;
    this.paramsSqlViewer.lon = curURI.lon;
    this.paramsSqlViewer.zoom = curURI.zoom;
  }

  getLinkToSqlViewer() {
    this.parseParamURI();
    let link = `${document.location.protocol}//owm.io/sql-viewer?`;
    Object.keys(this.paramsSqlViewer).forEach((element) => {
      link += `&${element}=${this.paramsSqlViewer[element]}`;
    });
    return link;
  }

}
