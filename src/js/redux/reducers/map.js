/**
 * Created by Denis on 14.03.2017.
 */
import { RENDER_TILE_LAYERS, GET_LOCATION, GET_PRESETS_DATA } from '../constants/page';
import BaseLayerParams from '../../libs/base-map';
import initialState from '../data/initialState';

const paramsMap = initialState.params;
const baseMap = new BaseLayerParams(paramsMap);
paramsMap.baseURLs = baseMap.getBaseMap(1, initialState.presets);
paramsMap.baseURLTemplates = baseMap.getBaseMap(0, initialState.presets);

export default function MapReducer(state = initialState, action) {
  if (action.type === RENDER_TILE_LAYERS) {
    return action.payload;
  }
  if (action.type === GET_LOCATION) {
    const params = action.payload;
    baseMap.updateParamsURI(params);
    return { ...state, params };
  }
  if (action.type === GET_PRESETS_DATA) {
    const presets = action.payload;
    return { ...state, presets };
  }
  return state;
}
