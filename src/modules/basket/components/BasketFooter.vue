<template>
  <footer class="basket__footer">
    <div class="basket__total">{{ totalCount }} шт.</div>
    <div class="basket__price">{{ totalPrice }}</div>
  </footer>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: () => 0
    },
    totalPrice: {
      type: Number,
      default: () => 0
    }
  },
  name: "BasketFooter"
};
</script>

<style scoped></style>
