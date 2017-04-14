/**
 * Created by bykovdenis on 19.03.17.
 */

import { GET_LOCATION, GET_PRESETS_DATA } from '../constants/page';
import initialState from '../data/initialState';

// Инициализируем объект начальным значением
const state = initialState;

export const getPresetsParams = (latlon, zoom) => {
  if (!latlon) {
    return null;
  }
  state.params.lat = latlon[0];
  state.params.lon = latlon[1];
  state.params.zoom = zoom;
  return {
    type: GET_LOCATION,
    payload: state.params
  };
};

// Файл с данными для отрисовки пересетов
const urlPresetsData = '/themes/owm/assets/data/basemap-sat.json';
// таймаут обращения к серверу
const timeout = 1800000;

const getHTTP = (url, callback, dispatch) => {
  fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(response => response.json())
    .then((presets) => {
      callback(presets, dispatch);
    })
    .catch((error) => {
      console.log(`search error ${error}`);
    });
};

const parsePresetsData = (data, dispatch) => {
  state.presets = data;
  dispatch({
    type: GET_PRESETS_DATA,
    payload: state.presets
  });
};

export const getPresetsData = () => (dispatch) => {
  getHTTP(urlPresetsData, parsePresetsData, dispatch);
  setInterval(() => {
    getHTTP(urlPresetsData, parsePresetsData, dispatch);
  }, timeout);
};
