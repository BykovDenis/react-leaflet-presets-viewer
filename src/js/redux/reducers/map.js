/**
 * Created by Denis on 14.03.2017.
 */
import RENDER_TILE_LAYERS from '../constants/page';

// Инициализируем объект начальным значением
const initialState = {
  lat: 36.04,
  lon: -4.76,
  zoom: 8,
  appid: '9de243494c0b295cca9337e1e96b00e2',
  baseURL: `${document.location.protocol}//{s}.sat.owm.io/sql/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&order=best'`
};

export default function Map(state = initialState, action) {
  if (action.type === RENDER_TILE_LAYERS) {
    return action.payload;
  }
  return state;
}
