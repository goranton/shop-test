<template>
  <div id="app">
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
export default {
  components: { FieldCounter, GridColumn, Grid },
  data() {
    return {
      counter: 1
    };
  }
};
</script>
