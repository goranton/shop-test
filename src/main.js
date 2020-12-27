import { initApplication } from "./core/application";
import { goods, basket } from "./modules";
import storeConfig from "./store";

initApplication({
  modules: [goods, basket],
  storeConfig,
  onLoad: vueInstance => {
    vueInstance.$mount("#app");
  }
});
