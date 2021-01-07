import { MessageBus } from "../core/messageBus";

export default {
  props: {
    type: {
      type: Symbol,
      validator(type) {
        return MessageBus.UNION_TYPES.includes(type);
      },
      default: () => MessageBus.SUCCESS_TYPE
    },
    text: {
      type: String,
      required: true
    }
  }
};
