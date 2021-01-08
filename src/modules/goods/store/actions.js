import { ACTIONS, MUTATIONS } from "./constants";
import goodsService from "../services/goods.service";
import { SUCCESS_STATUS } from "../../../store/helpers/loadable";

export default {
  async [ACTIONS.LOAD_ITEMS](
    {
      commit,
      state: {
        items: { status }
      }
    },
    reload = false
  ) {
    // prevent reload data on each call
    if (status === SUCCESS_STATUS && !reload) {
      return;
    }

    try {
      commit(MUTATIONS.LOAD_ITEMS_SUCCESS, await goodsService.loadNames());
    } catch (e) {
      commit(MUTATIONS.LOAD_ITEMS_FAILED, e);
    }
  },
  async [ACTIONS.SYNC_PROPERTIES]({ commit }, rate = 1) {
    try {
      const {
        Error: responseError,
        Success: responseSuccess,
        Value: { Goods: responsePayload }
      } = await goodsService.loadItems();

      if (responseError || !responseSuccess) {
        commit(MUTATIONS.SYNC_PROPERTIES_FAILED, responseError);
      }

      commit(MUTATIONS.SYNC_PROPERTIES_SUCCESS, {
        payload: responsePayload,
        rate
      });
    } catch (e) {
      commit(MUTATIONS.SYNC_PROPERTIES_FAILED, e);
    }
  }
};
