/**
 * Created by bykovdenis on 19.03.17.
 */

import { GET_LOCATION } from '../constants/page';

// Инициализируем объект начальным значением
const params = {
  lat: 36.04,
  lon: -4.76,
  zoom: 8
};
/*eslint-disable */
const getPresetsParams = (latlon, zoom) => {
  if (!latlon) {
    return null;
  }
  params.lat = latlon[0];
  params.lon = latlon[1];
  params.zoom = zoom;
  return {
    type: GET_LOCATION,
    payload: params
  };
}

/*eslint-disable */
export default getPresetsParams;
