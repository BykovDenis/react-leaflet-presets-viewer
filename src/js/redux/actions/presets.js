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

const urlPresetsData = '/themes/owm/assets/data/basemap-sat.json';
const timeout = 5000;

const getHTTP = (url, callback) => {
  fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(response => response.json())
    .then((presets) => {
      callback(presets);
    })
    .catch((error) => {
      console.log(`search error ${error}`);
    });
};

const parsePresetsData = (data) => {
  state.presets = data;
};

export const getPresetsData = () => (dispatch) => {
  getHTTP(urlPresetsData, parsePresetsData);
  dispatch({
    type: GET_PRESETS_DATA,
    payload: state.presets
  });
  setInterval(() => {
    getHTTP(urlPresetsData, parsePresetsData);
    dispatch({
      type: GET_PRESETS_DATA,
      payload: state.presets
    });
  }, timeout);
};
