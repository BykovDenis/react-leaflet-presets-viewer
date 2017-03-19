/**
 * Created by Denis on 14.03.2017.
 */
import { RENDER_TILE_LAYERS, RENDER_POPUP_CODE } from '../constants/page';
import BaseLayerParams from '../../libs/base-map';

// Инициализируем объект начальным значением
const params = {
  lat: 36.04,
  lon: -4.76,
  zoom: 8,
  popupCode: 0
};

const baseMap = new BaseLayerParams(params);
const baseURLs = baseMap.getBaseMap();

params.baseURLs = baseURLs;

const initialState = params;
export default function MapReducer(state = initialState, action) {
  if (action.type === RENDER_TILE_LAYERS) {
    return action.payload;
  }
  if (action.type === RENDER_POPUP_CODE) {
    const popupCode = !params.popupCode;
    return { ...initialState, popupCode };
  }
  return state;
}
