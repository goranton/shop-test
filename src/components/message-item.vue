<template>
  <div class="message" :class="calculateClasses">
    <div class="message__text">{{ payload }}</div>
  </div>
</template>

<script>
import { ERROR, SUCCESS, WARNING } from "../core/messageBus";

export default {
  props: {
    type: {
      type: Symbol,
      required: true
    },
    payload: {
      type: String,
      required: true
    }
  },
  name: "messageItem",
  computed: {
    calculateClasses() {
      const classes = {};

      switch (this.type) {
        case SUCCESS:
          Object.assign(classes, { "message--success": true });
          break;
        case WARNING:
          Object.assign(classes, { "message--warning": true });
          break;
        case ERROR:
          Object.assign(classes, { "message--error": true });
          break;
      }

      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/adaptive";

.message {
  &--success {
    background-color: transparentize(green, 0.5);
  }
  &--warning {
    background-color: transparentize(yellow, 0.5);
  }
  &--error {
    background-color: transparentize(red, 0.5);
  }
}

@include adaptive("phone") {
  .message {
    padding: 5px;
    font-size: 0.5rem;
  }
}

@include adaptive("tablet") {
  .message {
    padding: 10px;
    font-size: 0.7rem;
  }
}

@include adaptive("desktop") {
  .message {
    padding: 15px;
    font-size: 1rem;
  }
}
</style>
