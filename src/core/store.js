import Vue from "vue";
import Vuex from "vuex";

export function getStoreInstance({
  state = {},
  actions = {},
  mutations = {},
  getters = {}
} = {}) {
  Vue.use(Vuex);
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  });
}
