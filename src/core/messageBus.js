import uuidGenerator from "short-uuid";

export class MessageBus {
  static SUCCESS_TYPE = Symbol("success");
  static WARNING_TYPE = Symbol("warning");
  static ERROR_TYPE = Symbol("error");

  static UNION_TYPES = [
    MessageBus.SUCCESS_TYPE,
    MessageBus.WARNING_TYPE,
    MessageBus.ERROR_TYPE
  ];

  constructor() {
    this.subscribers = [];
  }

  static validateMessage(message) {
    return "id" in message && "type" in message && "payload" in message;
  }

  subscribe(subscriber) {
    if (typeof subscriber !== "function") {
      throw new TypeError(
        `Subscribe callback must be a function. ${typeof subscriber} given`
      );
    }

    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const foundIndex = this.subscribers.findIndex(
      callback => callback === subscriber
    );
    this.subscribers.splice(foundIndex, 1);
  }

  notify(type, payload) {
    this.subscribers.forEach(subscriber =>
      subscriber.call(null, {
        id: uuidGenerator.generate(),
        type,
        payload
      })
    );
  }

  success(payload) {
    this.notify(MessageBus.SUCCESS_TYPE, payload);
  }

  warning(payload) {
    this.notify(MessageBus.WARNING_TYPE, payload);
  }

  error(payload) {
    this.notify(MessageBus.ERROR_TYPE, payload);
  }
}
