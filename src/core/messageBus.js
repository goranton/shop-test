export class MessageBus {
  static SUCCESS_TYPE = Symbol("success");
  static WARNING_TYPE = Symbol("warning");
  static ERROR_TYPE = Symbol("error");

  constructor() {
    this.subscribers = [];
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
    this.subscribers.forEach(subscriber => subscriber.call(null, payload));
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
