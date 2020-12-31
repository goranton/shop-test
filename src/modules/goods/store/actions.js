import { ACTIONS, MUTATIONS } from "./constants";

export default {
  async [ACTIONS.LOAD_NAMES]({ commit }) {
    try {
      commit(MUTATIONS.LOAD_ITEMS_SUCCESS, () => {});
    } catch (e) {
      commit(MUTATIONS.LOAD_NAMES_FAILED, e);
    }
  }
};
