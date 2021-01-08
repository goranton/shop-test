<template>
  <div class="good-inline">
    <div class="good-inline__title">{{ title }}</div>
    <div
      class="good-inline__price"
      :class="{ [`good-inline__price--${status}`]: true }"
    >
      {{ price }}
    </div>
  </div>
</template>

<script>
import { PRICE_DOWN, PRICE_NORMAL, PRICE_UP } from "../../store/constants";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      validator: status =>
        [PRICE_NORMAL, PRICE_DOWN, PRICE_UP].includes(status),
      required: true
    }
  },
  name: "GoodInline"
};
</script>

<style lang="scss" scoped>
$background-color: transparentize(white, 0.95);
$background-color-hover: transparentize(white, 0.9);

.good-inline {
  text-align: left;
  background-color: $background-color;
  padding: 5px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: $background-color-hover;
  }

  &__price {
    &--up {
      background-color: red;
    }
    &--down {
      background-color: green;
    }
  }
}
</style>
