export const PREFIX = "[GOODS]";

export const ACTIONS = {
  LOAD_ITEMS: `${PREFIX} load items`,
  LOAD_NAMES: `${PREFIX} load names`
};

export const MUTATIONS = {
  LOAD_ITEMS_SUCCESS: `${PREFIX} load items success`,
  LOAD_ITEMS_FAILED: `${PREFIX} load items failed`,

  LOAD_NAMES_SUCCESS: `${PREFIX} load names success`,
  LOAD_NAMES_FAILED: `${PREFIX} load names failed`
};

export const GETTERS = {
  GET_RAW_ITEMS: `${PREFIX} get raw items`,
  GET_RAW_NAMES: `${PREFIX} get raw names`
};
