import { loadableItem } from "../../../store/helpers/loadable";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: () => ({
    items: loadableItem(),
    names: loadableItem()
  }),
  mutations,
  getters
};
