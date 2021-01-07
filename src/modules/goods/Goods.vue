<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ACTIONS } from "./store/constants";

export default {
  name: "Goods",
  methods: mapActions("goods", {
    loadItems: ACTIONS.LOAD_ITEMS
  }),
  mounted() {
    this.loadItems();
  }
};
</script>

<style scoped></style>
