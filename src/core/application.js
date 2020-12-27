import {
  getRoutesStackForModules,
  getStoreConfigurationForModules
} from "./modules";
import { getRouterInstance } from "./router";
import Vue from "vue";
import App from "../App";
import { getStoreInstance } from "./store";

/**
 * @callback onLoadCallback
 * @param {Object} instance - Configured Vue instance
 */

/**
 * @callback onErrorCallback
 * @param {*} error - error instance
 */

/**
 * Instance Vue configuration based on passed params.
 *
 * @param {onLoadCallback} onLoad - raise after instance has been configured
 * @param {onErrorCallback} onError - raise when error has occurred
 *
 * @param {Array} routes - routes stack
 * @param {Object} storeConfig
 * @param modules
 */
export function initApplication({
  onLoad,
  modules = [],
  routes = [],
  storeConfig = {},
  onError = console.error
}) {
  const router = getRouterInstance();
  router.addRoutes([...routes, ...getRoutesStackForModules(modules)]);

  const store = getStoreInstance(storeConfig);

  // wait until store modules loaded
  Promise.allSettled(getStoreConfigurationForModules(modules)).then(
    storeModules => {
      // register modules in store
      storeModules.forEach(({ value }) => {
        const [name, structure] = value;
        store.registerModule(name, structure);
      });

      if (typeof onLoad === "function") {
        onLoad.call(
          null,
          new Vue({
            router,
            store,
            render: h => h(App)
          })
        );
      }
    },
    onError
  );
}
