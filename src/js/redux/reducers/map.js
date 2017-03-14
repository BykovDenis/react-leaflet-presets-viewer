/**
 * Created by Denis on 14.03.2017.
 */
import RENDER_TILE_LAYERS from '../constants/page';
import BaseLayerParams from '../../libs/base-map';

// Инициализируем объект начальным значением
const params = {
  lat: 36.04,
  lon: -4.76,
  zoom: 8,
};

const baseMap = new BaseLayerParams(params);
const layerURL = baseMap.getBaseMap();

const initialState = {
  lat: params.lat,
  lon: params.lon,
  zoom: params.zoom,
  baseURL: layerURL,
};

export default function Map(state = initialState, action) {
  if (action.type === RENDER_TILE_LAYERS) {
    return action.payload;
  }
  return state;
}
