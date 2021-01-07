<template>
  <div class="good-inline">
    <div class="good-inline__title">{{ title }}</div>
    <div class="good-inline__price">{{ price }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
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
}
</style>
