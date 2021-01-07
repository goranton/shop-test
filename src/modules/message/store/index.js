import {
  errorSkeleton,
  successSkeleton,
  warningSkeleton
} from "../../../core/messageBus";

export const PREFIX = "[MESSAGE]";
export const METHODS = {
  PUSH_SUCCESS_MESSAGE: `${PREFIX} push success message`,
  PUSH_WARNING_MESSAGE: `${PREFIX} push warning message`,
  PUSH_ERROR_MESSAGE: `${PREFIX} push error message`,
  FETCH_MESSAGE: `${PREFIX} fetch message`
};

export const GETTERS = {
  GET_MESSAGES: `${PREFIX} get messages`,
  GET_FETCH: `${PREFIX} get fetch message`
};

export default {
  state: () => ({
    list: [],
    current: null
  }),
  methods: {
    [METHODS.PUSH_SUCCESS_MESSAGE]: ({ list }, payload) =>
      list.push(successSkeleton(payload)),
    [METHODS.PUSH_WARNING_MESSAGE]: ({ list }, payload) =>
      list.push(warningSkeleton(payload)),
    [METHODS.PUSH_ERROR_MESSAGE]: ({ list }, payload) => {
      list.push(errorSkeleton(payload));
    },
    [METHODS.FETCH_MESSAGE]: ({ list, ...state }) => {
      const [message] = list.splice(-1);
      state.current = message;
    }
  },
  getters: {
    [GETTERS.GET_MESSAGES]: ({ list }) => list,
    [GETTERS.GET_FETCH]: ({ current }) => current
  }
};
