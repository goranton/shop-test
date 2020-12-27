<template>
  <div class="navigation-item">
    <router-link
      class="navigation-item__link"
      active-class="navigation-item__link--active"
      :to="computedNavigation"
    >
      {{ label }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    routeParams: {
      type: Object,
      default: () => ({})
    }
  },
  name: "navigationItem",
  computed: {
    computedNavigation() {
      return {
        name: this.routeName,
        ...this.routeParams
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$background: #e4e4e4;
$background-hover: darken($background, 10%);
$background-active: darken($background, 12%);
$text-color: #5c5c5c;
$text-color-active: darken($text-color, 5%);

.navigation-item {
  &__link {
    display: block;
    padding: 10px;
    color: $text-color;
    text-decoration: none;
    border-radius: 5px;
    background-color: $background;
    transition: 250ms background-color;
    cursor: pointer;

    &:hover {
      background-color: $background-hover;
    }

    &:active,
    &--active {
      color: $text-color-active;
      background-color: $background-active;
    }
  }
}
</style>
