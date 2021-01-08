<template>
  <div>
    <groups-grid
      :groups="groups"
      :get-items="getItems"
      @push-basket="pushToBasket"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { GETTERS } from "../store/constants";
import GroupsGrid from "../components/groups/GroupsGrid";
import { MUTATIONS } from "../../basket/store";

export default {
  name: "GoodsIndexPage",
  components: { GroupsGrid },
  computed: mapGetters("goods", {
    groups: GETTERS.GET_GROUPS,
    getItems: GETTERS.GET_ITEMS_FOR_GROUP
  }),
  methods: {
    ...mapMutations("basket", {
      _pushToBasket: MUTATIONS.PUSH
    }),
    pushToBasket({ id, total }) {
      this._pushToBasket({
        goodId: id,
        count: 1,
        total
      });
    }
  }
};
</script>

<style scoped></style>
