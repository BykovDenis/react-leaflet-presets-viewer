/**
 * Created by Denis on 14.03.2017.
 */
import { RENDER_TILE_LAYERS, GET_LOCATION } from '../constants/page';
import BaseLayerParams from '../../libs/base-map';

// Инициализируем объект начальным значением
const params = {
  lat: 36.0454,
  lon: -4.7654,
  zoom: 8,
};

const baseMap = new BaseLayerParams(params);
const baseURLs = baseMap.getBaseMap();

params.baseURLs = baseURLs;

const initialState = params;
export default function MapReducer(state = initialState, action) {
  if (action.type === RENDER_TILE_LAYERS) {
    return action.payload;
  }
  if (action.type === GET_LOCATION) {
    const payload = Object.assign(state, action.payload);
    baseMap.updateParamsURI(payload);
    return payload;
  }
  return state;
}
