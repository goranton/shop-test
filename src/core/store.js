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

export function subscribeModule(store, prefix, subscribers = []) {
  if ("subscribe" in store) {
    subscribers.forEach(subscriber => {
      const detectMutation = new RegExp(`^(${prefix})`);

      store.subscribe(
        (mutation, state) =>
          detectMutation.test(mutation.type) &&
          subscriber(mutation, state[prefix])
      );
    });
  }
}
