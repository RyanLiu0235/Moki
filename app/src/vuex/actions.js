import Vue from 'vue';
import * as types from './mutation-types';
import { key } from '../key';

const api = 'https://free-api.heweather.com/v5';

export const fetchWeather = ({ commit }, city) => {
  commit(types.FETCHWEATHER_START);
  return Vue.http
    .get(`${api}/forecast`, { params: { city: city, key: key } })
    .then(rs => {
      if (rs.body.HeWeather5[0].status === 'ok') {
        commit(types.FETCHWEATHER_SUCCESS, rs.body.HeWeather5[0]);
      } else {
        commit(types.FETCHWEATHER_FAILURE);
      }
    }, rs => commit(types.FETCHWEATHER_FAILURE));
}

export const fetchCity = ({ commit }, city) => {
  commit(types.FETCHCITY_START);
  return Vue.http
    .get(`${api}/search`, { params: { city: city, key: key } })
    .then(rs => {
      if (rs.body.HeWeather5[0].status === 'ok') {
        commit(types.FETCHCITY_SUCCESS, rs.body.HeWeather5[0].basic);
      } else {
        commit(types.FETCHCITY_FAILURE);
      }
    }, rs => commit(types.FETCHCITY_FAILURE));
}
