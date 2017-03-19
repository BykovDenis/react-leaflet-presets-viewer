/**
 * Created by bykovdenis on 19.03.17.
 */

import { RENDER_POPUP_CODE } from '../constants/page';

// Инициализируем объект начальным значением
const params = {
  lat: 36.04,
  lon: -4.76,
  zoom: 8,
  params: 1
};

const getPresetsParams = () =>
  (dispatch) => {
    dispatch({
      type: RENDER_POPUP_CODE,
      payload: params
    });
  };

export default getPresetsParams;
