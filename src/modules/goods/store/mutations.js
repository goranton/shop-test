import { MUTATIONS, PRICE_DOWN, PRICE_NORMAL, PRICE_UP } from "./constants";
import {
  getLoadData,
  loadFailed,
  loadSuccess
} from "../../../store/helpers/loadable";

export default {
  /**
   * Fetch and serialize items. Mark status as success
   * @param state
   * @param payload
   */
  [MUTATIONS.LOAD_ITEMS_SUCCESS](state, payload) {
    Object.assign(state, {
      items: loadSuccess(
        // serialize response
        Object.entries(payload).reduce(
          ({ groups, items }, [groupId, { G: groupName, B: groupItems }]) => {
            const groupItemsEntries = Object.entries(groupItems);

            // push new group to stack
            groups.push({
              id: +groupId,
              name: groupName,
              count: groupItemsEntries.length
            });

            // push group items to items stack
            groupItemsEntries.forEach(([itemId, { N: itemName }]) => {
              items.push({
                id: +itemId,
                groupId: +groupId,
                name: itemName,
                // set default values for item
                count: -1,
                price: -1
              });
            });

            return { groups, items };
          },
          {
            groups: [],
            items: []
          }
        )
      )
    });
  },
  /**
   * Store error and mark as failed
   * @param {Object} state
   * @param {*} error - error instance
   */
  [MUTATIONS.LOAD_ITEMS_FAILED](state, error) {
    Object.assign(state, { items: loadFailed(error) });
  },
  /**
   * Synchronize loaded items and properties
   * @param items
   * @param payload
   * @param {Number} rate - currency rate
   */
  [MUTATIONS.SYNC_PROPERTIES_SUCCESS]({ items }, { payload, rate }) {
    const { items: loadedItems = [] } = getLoadData(items);

    Object.assign(items.data, {
      items: loadedItems.map(item => {
        const foundProperties = payload.find(({ T, G }) => {
          return T === item.id && G === item.groupId;
        });

        if (!foundProperties) {
          return item;
        }

        const { C: itemPrice, P: itemCount } = foundProperties;
        const calculatePrice = +itemPrice * rate;

        let status =
          item.price > -1 && item.price !== calculatePrice
            ? item.price > calculatePrice
              ? PRICE_DOWN
              : PRICE_UP
            : PRICE_NORMAL;

        return {
          ...item,
          price: calculatePrice,
          count: itemCount,
          status
        };
      })
    });
  },
  [MUTATIONS.SYNC_PROPERTIES_FAILED](state, error) {
    Object.assign(state, { items: loadFailed(error) });
  }
};
