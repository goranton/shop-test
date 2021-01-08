import { GETTERS } from "./constants";
import { getLoadData } from "../../../store/helpers/loadable";

export default {
  [GETTERS.GET_GROUPS]: ({ items }) => {
    const { groups = [] } = getLoadData(items, {});
    return groups;
  },
  [GETTERS.GET_ITEMS_FOR_GROUP]: state => id => {
    const { items = [] } = getLoadData(state.items, {});

    if (!items.length) {
      return [];
    }

    return items.filter(({ groupId, price, count }) => {
      return groupId === id && price > -1 && count > 0;
    });
  },
  [GETTERS.GET_ITEMS_BY_ID]: state => (ids = []) => {
    const { items = [] } = getLoadData(state.items, {});
    return Array.isArray(ids)
      ? items.filter(({ id }) => ids.includes(id))
      : items.find(({ id }) => id === ids);
  }
};
