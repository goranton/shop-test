<template>
  <nav class="navigation">
    <div class="navigation__wrapper">
      <navigation-item
        v-for="item in items"
        :key="item.id"
        :label="item.label"
        :route-name="item.routeName"
        :route-params="item.routeParams"
      />
    </div>
  </nav>
</template>

<script>
import NavigationItem from "./navigation-item";
export default {
  name: "navigation",
  components: { NavigationItem },
  props: {
    items: {
      type: Array,
      validator(items) {
        return items.every(item => {
          return "id" in item && "routeName" in item && "label" in item;
        });
      },
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  &__wrapper {
    display: flex;

    & > div {
      margin-right: 10px;
    }
  }
}
</style>
