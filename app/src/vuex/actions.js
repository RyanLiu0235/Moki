import Vue from 'vue';
import * as types from './mutation-types';
import key from '../key';

export const fetchWeather = ({ commit }) => {
	commit(types.FETCHWEATHER_START);
  return Vue.http
  	.get('https://free-api.heweather.com/v5/forecast', {params: {city: 'shanghai', key: key.key}})
  	.then(rs => {
  		if (rs.body.HeWeather5[0].status === 'ok') {
  			commit(types.FETCHWEATHER_SUCCESS, rs.body.HeWeather5[0]);
  		} else {
  			commit(types.FETCHWEATHER_FAILURE);
  		}
  	}, rs => commit(types.FETCHWEATHER_FAILURE));
}