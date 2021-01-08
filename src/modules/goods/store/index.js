import { loadableItem } from "../../../store/helpers/loadable";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export { PREFIX } from "./constants";

export default {
  state: () => ({
    items: loadableItem()
  }),
  actions,
  mutations,
  getters
};
