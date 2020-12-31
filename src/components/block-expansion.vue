<template>
  <div class="block-expansion">
    <div class="block-expansion__header">
      <slot class="block-expansion__title" name="title">{{ header }}</slot>
      <button-expansion
        class="block-expansion__button"
        v-model="isExpanded"
        false-symbol="Open"
        true-symbol="Close"
      />
    </div>
    <transition name="slide">
      <div
        class="block-expansion__content"
        :class="{
          'block-expansion__content--active': isExpanded
        }"
        v-if="isExpanded"
      >
        <slot v-bind="{ isExpanded }" />
      </div>
    </transition>
  </div>
</template>

<script>
import ButtonExpansion from "./button-expansion";
export default {
  components: { ButtonExpansion },
  props: {
    header: String,
    expanded: Boolean
  },
  name: "blockExpansion",
  data() {
    return {
      isExpanded: this.expanded
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/keyframes";

$header-background: #40739e;
$header-color: darken($header-background, 40%);
$header-btn-background: lighten($header-background, 10%);
$header-btn-color: darken($header-btn-background, 40%);

$content-background: #487eb0;

.block-expansion {
  width: 100%;
  height: 100%;
  max-width: 300px;

  &__header,
  &__content {
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: $header-color;
    background-color: $header-background;
    padding: 10px;
    border-radius: 5px 5px 0 0;
  }

  &__content {
    padding: 10px;
    background-color: $content-background;
  }

  &__button {
    border: none;
    padding: 5px;
    background-color: $header-btn-background;
    border-radius: 5px;
    cursor: pointer;
    color: $header-btn-color;
    outline: none;
  }
}
</style>
