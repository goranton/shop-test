export const DEFAULT_STATUS = Symbol("default load status");
export const PENDING_STATUS = Symbol("pending load status");
export const SUCCESS_STATUS = Symbol("success load status");
export const FAILED_STATUS = Symbol("failed load status");

export function loadableItem(item = {}) {
  return {
    ...item,
    data: null,
    status: DEFAULT_STATUS,
    error: null
  };
}

export function loadSuccess(payload) {
  return {
    data: payload,
    status: SUCCESS_STATUS,
    error: null
  };
}

export function loadFailed(error) {
  return {
    data: null,
    status: FAILED_STATUS,
    error
  };
}
