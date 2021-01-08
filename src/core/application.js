import {
  getRoutesStackForModules,
  getStoreConfigurationForModules
} from "./modules";
import { getRouterInstance } from "./router";
import Vue from "vue";
import App from "../App";
import { getStoreInstance, subscribeModule } from "./store";
import { DEVELOPMENT } from "../constants/environments";
import messageBus from "./messageBus";

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
 * @param {String} environment
 */
export function initApplication({
  onLoad,
  modules = [],
  routes = [],
  storeConfig = {},
  onError = console.error,
  environment = process.env.NODE_ENV ?? DEVELOPMENT
}) {
  Vue.prototype.$message = messageBus();

  const router = getRouterInstance();
  router.addRoutes([...routes, ...getRoutesStackForModules(modules)]);

  const store = getStoreInstance(storeConfig);

  // wait until store modules loaded
  Promise.allSettled(getStoreConfigurationForModules(modules)).then(
    storeModules => {
      // register modules in store
      storeModules.forEach(({ value }) => {
        const [name, { subscribers, ...structure }] = value;

        // subscribe to store events
        if (Array.isArray(subscribers)) {
          subscribeModule(
            store,
            name,
            subscribers.filter(subscriber => typeof subscriber === "function")
          );
        }

        store.registerModule(name, structure);
      });

      if (typeof onLoad === "function") {
        onLoad.call(
          { environment },
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
