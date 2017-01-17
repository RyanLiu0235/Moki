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
  isWeatherLoaded: false
};

const mutations = {
  [types.FETCHWEATHER_START](state) {
    state.isWeatherLoaded = false;
  },
  [types.FETCHWEATHER_SUCCESS](state, data) {
    state.isWeatherLoaded = true;
    state.basic = data.basic;
    state.daily_forecast = data.daily_forecast;
  },
  [types.FETCHWEATHER_FAILURE](state) {
    state.isWeatherLoaded = true;
  }
};

export default {
  state,
  mutations
}
