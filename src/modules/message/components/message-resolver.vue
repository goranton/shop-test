<template>
  <div class="message"></div>
</template>

<script>
import { validateType } from "../../../core/messageBus";

export default {
  props: {
    payload: {
      type: [Object, String],
      required: true
    },
    type: {
      type: String,
      validator: validateType,
      required: true
    }
  },
  name: "MessageResolver"
};
</script>

<style scoped></style>
