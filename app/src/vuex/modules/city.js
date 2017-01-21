import * as types from '../mutation-types'

let cityCache = JSON.parse(window.localStorage.getItem('moki-city') || '{}');

const state = {
  cityInfo: cityCache,
  isCityLoaded: false
};

const mutations = {
  [types.FETCHCITY_START](state) {
    state.isCityLoaded = false;
  },
  [types.FETCHCITY_SUCCESS](state, city) {
    state.isCityLoaded = true;
    state.cityInfo = city;
  },
  [types.FETCHCITY_FAILURE](state) {
    state.isCityLoaded = true;
  }
};

export default {
  state,
  mutations
}
