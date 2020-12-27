<template>
  <div id="app">
    <block-expansion header="test" expanded>
      <template v-slot:default="{ isExpanded }">
        {{ isExpanded }}
      </template>
    </block-expansion>
    <field-counter v-model="counter" />
    <grid :items="[1, 2, 3, 4, 5]">
      <template v-slot:columns="{ columns }">
        <grid-column v-for="{ id, items } in columns" :key="id">
          {{ items }}
        </grid-column>
      </template>
    </grid>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "styles/global";
</style>

<script>
import Grid from "./components/grid";
import GridColumn from "./components/grid-column";
import FieldCounter from "./components/field-counter";
import BlockExpansion from "./components/block-expansion";
export default {
  components: { BlockExpansion, FieldCounter, GridColumn, Grid },
  data() {
    return {
      counter: 1
    };
  }
};
</script>
