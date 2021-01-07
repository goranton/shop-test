import { GETTERS } from "./constants";

export default {
  [GETTERS.GET_GROUPS]: ({ items: { data } }) => {
    if (!data || !("groups" in data)) {
      return [];
    }

    const { groups } = data;
    return groups;
  },
  [GETTERS.GET_ITEMS_FOR_GROUP]: ({ items: { data } }) => id => {
    if (!data || !("items" in data) || !data.items.length) {
      return [];
    }

    return data.items.filter(({ groupId, price, count }) => {
      return groupId === id && price > -1 && count > 0;
    });
  }
};
