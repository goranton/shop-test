<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "styles/global";
</style>

<script>
import { mapActions, mapMutations } from "vuex";
import { MUTATIONS } from "./modules/basket/store";
import { ACTIONS } from "./modules/goods/store/constants";

export default {
  name: "Application",
  methods: {
    ...mapActions("goods", {
      loadItems: ACTIONS.LOAD_ITEMS
    }),
    ...mapMutations("basket", {
      restoreBasket: MUTATIONS.RESTORE
    }),
    messageListener(payload) {
      console.log(payload);
    }
  },
  mounted() {
    const [{ add }] = this.$message;
    add(this.messageListener);
  },
  beforeDestroy() {
    const [{ remove }] = this.$message;
    remove(this.messageListener);
  },
  async created() {
    await this.loadItems();
    this.restoreBasket();
  }
};
</script>
