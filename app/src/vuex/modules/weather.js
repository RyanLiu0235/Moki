import * as types from '../mutation-types'

const state = {
  basic: {},
  daily_forecast: {}
}

const mutations = {
  [types.FETCHWEATHER_START](state) {

  },
  [types.FETCHWEATHER_SUCCESS](state, data) {
    state.basic = data.basic;
    state.daily_forecast = data.daily_forecast;
  },
  [types.FETCHWEATHER_FAILURE](state) {

  }
}

export default {
  state,
  mutations
}
