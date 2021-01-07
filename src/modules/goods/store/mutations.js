import { MUTATIONS } from "./constants";
import { loadFailed, loadSuccess } from "../../../store/helpers/loadable";

export default {
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
              // set default values for item
              items.push({
                id: +itemId,
                groupId: +groupId,
                name: itemName,
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
  [MUTATIONS.LOAD_ITEMS_FAILED](state, error) {
    Object.assign(state, { items: loadFailed(error) });
  },
  [MUTATIONS.SYNC_PROPERTIES_SUCCESS]({ items }, payload) {
    const loadedItems = items.data?.items;

    if (loadedItems && loadedItems.length) {
      Object.assign(items.data, {
        items: [...loadedItems].map(item => {
          const foundProperties = payload.find(({ T, G }) => {
            return T === item.id && G === item.groupId;
          });

          if (!foundProperties) {
            return item;
          }

          const { C: itemPrice, P: itemCount } = foundProperties;

          return {
            ...item,
            price: +itemPrice,
            count: itemCount
          };
        })
      });
    }
  },
  [MUTATIONS.SYNC_PROPERTIES_FAILED](state, error) {
    Object.assign(state, { items: loadFailed(error) });
  }
};
