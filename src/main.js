import { initApplication } from "./core/application";
import { goods, basket, message } from "./modules";
import storeConfig from "./store";

initApplication({
  modules: [goods, basket, message],
  storeConfig,
  onLoad: vueInstance => {
    vueInstance.$mount("#app");
  }
});
