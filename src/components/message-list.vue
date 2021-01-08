<template>
  <div class="messages">
    <message-item
      class="messages__item"
      v-for="{ id, ...payload } in messages"
      :key="id"
      v-bind="payload"
    />
  </div>
</template>

<script>
import { validateMessage } from "../core/messageBus";
import MessageItem from "./message-item";

export default {
  components: { MessageItem },
  props: {
    messages: {
      type: Array,
      validator: messages => messages.every(validateMessage),
      required: true
    }
  },
  name: "messageList"
};
</script>

<style lang="scss" scoped>
@import "../styles/adaptive";

@include adaptive("phone") {
  .messages {
    &__item {
      margin-bottom: 5px;
    }
  }
}

@include adaptive("tablet") {
  .messages {
    &__item {
      margin-bottom: 7px;
    }
  }
}

@include adaptive("desktop") {
  .messages {
    &__item {
      margin-bottom: 10px;
    }
  }
}
</style>
