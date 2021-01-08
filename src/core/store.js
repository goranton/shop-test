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

export function applyContextToStore(context) {
  Vuex.Store.prototype.$context = context;
}

export function subscribeModule(store, prefix, subscribers = []) {
  subscribers.forEach(subscriber => {
    const detectMutation = new RegExp(`^(${prefix})/`);

    store.subscribe((mutation, state) => {
      const normalizeMutation = {
        ...mutation,
        type: mutation.type.slice(prefix.length + 1)
      };

      detectMutation.test(mutation.type) &&
        subscriber(normalizeMutation, state[prefix]);
    });
  });
}
