import { successSkeleton, warningSkeleton } from "../../../core/messageBus";
import persistState from "../../../store/helpers/persist";

export const PREFIX = "[BASKET]";
export const MUTATIONS = {
  PUSH: `${PREFIX} push to basket`,
  REMOVE: `${PREFIX} remove from basket`,
  DECREMENT: `${PREFIX} decrement items`,
  UPDATE: `${PREFIX} update items`,
  RESTORE: `${PREFIX} restore state`
};
export const GETTERS = {
  GET_ITEMS: `${PREFIX} get items`
};

const persistStateSubscriber = persistState(Object.values(MUTATIONS), "basket");

/**
 * Helper for find good by id in basket stack
 * @param {Array} goods - goods stack
 * @param {Number} goodId - identification number
 * @return {Array} - array with updates
 */
const findGoodById = (goods, goodId) => goods.find(({ id }) => id === goodId);
/**
 * Helper for remove good from list by id
 * @param {Array} goods - goods stack
 * @param {Number} goodId - identification number
 * @return {Array} - array with updates
 */
const removeGood = (goods, goodId) => goods.filter(({ id }) => id !== goodId);
/**
 * Helper for decrement goods count
 * @param goods
 * @param deleteCount
 * @param goodId
 * @return {Array} - array with updates
 */
const decrementGood = (goods, { count: deleteCount, goodId }) =>
  goods.map(({ count, ...good }) => {
    if (good.id !== goodId) {
      return good;
    }

    return {
      count: count - deleteCount,
      ...good
    };
  });

export default {
  state: () => ({
    goods: []
  }),
  mutations: {
    /**
     * Update goods count in basket
     * @param {Array} goods - goods stack
     * @param {Number} goodId - identification number
     * @param {Number} count - new count
     * @param {Number} total - total count of goods
     * @return {boolean|undefined}
     */
    [MUTATIONS.UPDATE]({ goods }, { count, goodId, total }) {
      if (total < count || count < 1) {
        return true;
      }
      const foundItem = findGoodById(goods, goodId);
      foundItem.count = count;
    },
    /**
     *
     * @param goods
     * @param count
     * @param goodId
     * @param total
     * @return {boolean}
     */
    [MUTATIONS.PUSH]({ goods }, { count, goodId, total }) {
      if (count < 1) {
        throw new TypeError("Count must be great that 0");
      }

      const foundItem = findGoodById(goods, goodId);
      // eslint-disable-next-line no-unused-vars
      const [_, notify] = this.$context.$message;

      if (total < count + (foundItem ? foundItem.count : 0)) {
        notify(warningSkeleton("Empty items"));
        return true;
      }

      // update or insert
      if (foundItem) {
        foundItem.count += +count;
      } else {
        goods.push({ id: goodId, count });
      }

      notify(successSkeleton("Push to basket"));
    },
    /**
     * Remove items from basket
     * @param state
     * @param {Number} goodId - identify number
     */
    [MUTATIONS.REMOVE](state, { goodId }) {
      state.goods = removeGood(state.goods, goodId);
    },
    [MUTATIONS.DECREMENT](state, { count, goodId }) {
      const { count: goodCount } = findGoodById(state.goods, goodId);

      state.goods =
        goodCount - count <= 0
          ? removeGood(state.goods, goodId)
          : decrementGood(state.goods, { count, goodId });
    },
    [MUTATIONS.RESTORE](state) {
      Object.assign(state, JSON.parse(localStorage.getItem("basket")));
    }
  },
  getters: {
    [GETTERS.GET_ITEMS]: ({ goods }) => goods
  },
  subscribers: [({ type }, state) => persistStateSubscriber(type, state)]
};
