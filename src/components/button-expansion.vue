<template>
  <button class="button-expansion" @click.stop="toggleValue">
    <slot name="close" v-if="this.value">{{ trueSymbol }}</slot>
    <slot name="open" v-else>{{ falseSymbol }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    trueSymbol: String,
    falseSymbol: String,
    value: Boolean
  },
  name: "button-expansion",
  methods: {
    toggleValue() {
      this.$emit("input", !this.value);
    }
  }
};
</script>

<style scoped></style>
