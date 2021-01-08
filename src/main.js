import { initApplication } from "./core/application";
import { goods, basket } from "./modules";
import storeConfig from "./store";
import messageBus from "./core/messageBus";

initApplication({
  modules: [goods, basket],
  storeConfig,
  onLoad: vueInstance => {
    vueInstance.$mount("#app");
  },
  context: { $message: messageBus() }
});
