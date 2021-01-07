export const PREFIX = "[BASKET]";
export const MUTATIONS = {
  PUSH: `${PREFIX} push to basket`,
  REMOVE: `${PREFIX} remove from basket`,
  DECREMENT: `${PREFIX} decrement items`
};

const findGoodById = (goods, goodId) => goods.find(({ id }) => id === goodId);
const removeGood = (goods, goodId) => goods.filter(({ id }) => id !== goodId);
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
    [MUTATIONS.PUSH]({ goods }, { count, goodId, total }) {
      if (count < 1) {
        throw new TypeError("Count must be great that 0");
      }

      const foundItem = findGoodById(goods, goodId);

      if (total < count + (foundItem ? foundItem.count : 0)) {
        return;
      }

      if (foundItem) {
        foundItem.count += +count;
      } else {
        goods.push({ id: goodId, count });
      }
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
    }
  }
};
