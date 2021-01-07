export const PREFIX = "[GOODS]";

export const ACTIONS = {
  LOAD_ITEMS: `${PREFIX} load items`,
  SYNC_PROPERTIES: `${PREFIX} load names`
};

export const MUTATIONS = {
  LOAD_ITEMS_SUCCESS: `${PREFIX} load items success`,
  LOAD_ITEMS_FAILED: `${PREFIX} load items failed`,

  SYNC_PROPERTIES_SUCCESS: `${PREFIX} sync properties success`,
  SYNC_PROPERTIES_FAILED: `${PREFIX} sync properties failed`
};

export const GETTERS = {
  GET_GROUPS: `${PREFIX} get groups list`,
  GET_ITEMS_FOR_GROUP: `${PREFIX} get items for group`
};
