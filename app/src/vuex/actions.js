import Vue from 'vue';
import * as types from './mutation-types';
import * as _ from '../utils';

import { ipcRenderer } from 'electron';

const api = 'https://free-api.heweather.com/v5';

const updateCityArray = (oldArray, newCity) => {
  // first we have to uncheck the checked city
  for (let i = 0; i < oldArray.length; i++) {
    if (oldArray[i]['meta']['checked']) {
      oldArray[i]['meta']['checked'] = false;
      break;
    }
  }
  return oldArray.push(newCity);
};

export const fetchWeather = ({ commit }, city) => {
  commit(types.FETCHWEATHER_START);
  return Vue.http
    .get(`${api}/forecast`, { params: { city: city, key: HEkey } })
    .then(rs => {
      if (rs.body.HeWeather5[0].status === 'ok') {
        return commit(types.FETCHWEATHER_SUCCESS, rs.body.HeWeather5[0]);
      } else {
        return commit(types.FETCHWEATHER_FAILURE);
      }
    }, rs => commit(types.FETCHWEATHER_FAILURE));
}

export const fetchCity = ({ commit }, city) => {
  commit(types.FETCHCITY_START);
  return Vue.http
    .get(`${api}/search`, { params: { city: city, key: HEkey } })
    .then(rs => {
      if (rs.body.HeWeather5[0].status === 'ok') {
        let basic = rs.body.HeWeather5[0].basic;

        // check if this city has been stored before, if so, update it,
        // if not, push it
        let localCities = _.getLocalCache(`${HEkey}-cities`);
        let cityIndex = localCities.findIndex((el) => el.name === city);
        let checkedCity = _.findCheckedCity(HEkey);
        if (cityIndex > -1) {
          localCities[checkedCity.index]['meta']['checked'] = false;
          localCities[cityIndex]['meta']['checked'] = true;
        } else {
          let newCity = {
            name: basic.city,
            meta: {
              city: basic.city,
              cnty: basic.cnty,
              checked: true
            }
          };
          updateCityArray(localCities, newCity);
          _.setLocalCache(`${HEkey}-cities`, localCities);
        }

        ipcRenderer.send('update-city', localCities);
        return commit(types.FETCHCITY_SUCCESS, basic);
      } else {
        return commit(types.FETCHCITY_FAILURE);
      }
    }, rs => commit(types.FETCHCITY_FAILURE));
}
