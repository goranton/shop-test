import uuidGenerator from "short-uuid";

export const SUCCESS = Symbol("success");
export const WARNING = Symbol("warning");
export const ERROR = Symbol("error");

export const MESSAGE_TYPES = [SUCCESS, WARNING, ERROR];

export function validateListener(listener, cb) {
  return typeof listener === "function" && cb(listener);
}

export function validateType(type) {
  return MESSAGE_TYPES.includes(type);
}

export function successSkeleton(payload) {
  return {
    type: SUCCESS,
    payload
  };
}

export function warningSkeleton(payload) {
  return {
    type: WARNING,
    payload
  };
}

export function errorSkeleton(payload) {
  return {
    type: ERROR,
    payload
  };
}

export default () => {
  const listeners = [];

  const notify = payload => listeners.forEach(listener => listener(payload));

  return [
    {
      add: listener => validateListener(listener, listeners.push.bind(this)),
      remove: listener =>
        validateListener(listener, () => {
          const foundIndex = listeners.indexOf(listener);
          foundIndex > -1 && listeners.splice(foundIndex, 1);
        }),
      removeAll() {
        listeners.forEach(this.remove);
      }
    },
    /**
     * Validate and notify
     * @param type
     * @param payload
     * @return {boolean|void}
     */
    ({ type, payload }) =>
      validateType(type) &&
      notify({
        id: uuidGenerator.generate(),
        type,
        payload
      })
  ];
};
