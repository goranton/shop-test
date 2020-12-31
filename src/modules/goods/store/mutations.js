import { MUTATIONS } from "./constants";
import { loadFailed, loadSuccess } from "../../../store/helpers/loadable";

export default {
  [MUTATIONS.LOAD_NAMES_SUCCESS](state, payload) {
    Object.assign(state, { names: loadSuccess(payload) });
  },
  [MUTATIONS.LOAD_NAMES_FAILED](state, error) {
    Object.assign(state, { names: loadFailed(error) });
  },
  [MUTATIONS.LOAD_ITEMS_SUCCESS](state, payload) {
    Object.assign(state, { items: payload });
  },
  [MUTATIONS.LOAD_NAMES_FAILED](state, error) {
    Object.assign(state, { items: loadFailed(error) });
  }
};
