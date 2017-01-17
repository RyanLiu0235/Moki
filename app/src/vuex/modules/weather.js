import * as types from '../mutation-types'

const state = {
  basic: {
    update: {}
  },
  daily_forecast: [{
    astro: {},
    cond: {},
    tmp: {},
    wind: {}
  }],
  isDataLoaded: false
};

const mutations = {
  [types.FETCHWEATHER_START](state) {
    state.isDataLoaded = false;
  },
  [types.FETCHWEATHER_SUCCESS](state, data) {
    state.isDataLoaded = true;
    state.basic = data.basic;
    state.daily_forecast = data.daily_forecast;
  },
  [types.FETCHWEATHER_FAILURE](state) {
    state.isDataLoaded = true;
  }
};

export default {
  state,
  mutations
}
